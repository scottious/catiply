// Game State Management
class CatstronautsGame {
    constructor() {
        this.currentScreen = 'welcome';
        this.playerData = this.loadPlayerData();
        const gameConfig = getGameConfig();
        this.gameState = {
            currentQuestion: 1,
            totalQuestions: gameConfig.questionsPerRound,
            score: 0,
            correctAnswers: 0,
            startTime: null,
            endTime: null,
            selectedTables: [],
            questions: [],
            currentQuestionIndex: 0
        };
        
        this.initializeEventListeners();
        this.checkFirstTimeUser();
    }

    // LocalStorage Management
    loadPlayerData() {
        const savedData = localStorage.getItem('catstronauts_player_data');
        return savedData ? JSON.parse(savedData) : getDefaultSettings();
    }

    savePlayerData() {
        localStorage.setItem('catstronauts_player_data', JSON.stringify(this.playerData));
    }

    // Screen Management
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
        }
    }

    // First Time User Check
    checkFirstTimeUser() {
        if (this.playerData.isFirstTime) {
            this.showScreen('welcome-screen');
        } else {
            this.showMainMenu();
        }
    }

    showMainMenu() {
        this.showScreen('main-menu');
        this.updateMainMenu();
    }

    updateMainMenu() {
        // Update player name display
        document.getElementById('player-display-name').textContent = this.playerData.name;
        
        // Update stats
        document.getElementById('personal-best-score').textContent = this.playerData.personalBest;
        document.getElementById('llama-count').textContent = this.playerData.llamaCount;
        
        // Display current tables
        this.displayCurrentTables();
    }

    displayCurrentTables() {
        const display = document.getElementById('current-tables-display');
        display.innerHTML = '';
        
        // Prioritize localStorage values over setup script
        const tablesToShow = this.playerData.selectedTables.length > 0 
            ? this.playerData.selectedTables 
            : getUserData(this.playerData.name)?.selectedTables || [];
        
        tablesToShow.forEach(table => {
            const badge = document.createElement('div');
            badge.className = 'table-badge';
            badge.textContent = `${table}×`;
            display.appendChild(badge);
        });
    }

    // Welcome Screen Logic
    initializeWelcomeScreen() {
        const startBtn = document.getElementById('start-game-btn');
        const userOptions = document.querySelectorAll('.user-option');
        let selectedUser = null;
        
        // Handle user selection
        userOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove previous selection
                userOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Add selection to clicked option
                option.classList.add('selected');
                selectedUser = option.dataset.user;
                
                // Enable start button
                startBtn.disabled = false;
            });
        });
        
        // Start game button
        startBtn.addEventListener('click', () => {
            if (selectedUser) {
                this.saveWelcomeData(selectedUser);
                this.showMainMenu();
            }
        });
    }

    saveWelcomeData(selectedUserName) {
        const userData = getUserData(selectedUserName);
        if (userData) {
            this.playerData = { ...userData };
            this.playerData.isFirstTime = false;
            this.savePlayerData();
        }
    }

    // Game Logic
    startGame() {
        // Prioritize localStorage values over setup script
        const selectedTables = this.playerData.selectedTables.length > 0 
            ? this.playerData.selectedTables 
            : getUserData(this.playerData.name)?.selectedTables || [];
        
        if (selectedTables.length === 0) {
            alert('No multiplication tables configured for this user!');
            return;
        }
        
        this.generateQuestions();
        this.gameState.currentQuestionIndex = 0;
        this.gameState.score = 0;
        this.gameState.correctAnswers = 0;
        this.gameState.startTime = Date.now();
        
        this.showScreen('game-screen');
        this.displayQuestion();
        this.startTimer();
        
        // Focus on answer input
        setTimeout(() => {
            document.getElementById('answer-input').focus();
        }, 100);
    }

    generateQuestions() {
        this.gameState.questions = [];
        
        // Prioritize localStorage values over setup script
        const selectedTables = this.playerData.selectedTables.length > 0 
            ? this.playerData.selectedTables 
            : getUserData(this.playerData.name)?.selectedTables || [];
        
        for (let i = 0; i < this.gameState.totalQuestions; i++) {
            const table = selectedTables[Math.floor(Math.random() * selectedTables.length)];
            const multiplier = Math.floor(Math.random() * 12) + 1;
            const answer = table * multiplier;
            
            this.gameState.questions.push({
                table: table,
                multiplier: multiplier,
                answer: answer,
                question: `${table} × ${multiplier} = ?`
            });
        }
    }

    displayQuestion() {
        const currentQ = this.gameState.questions[this.gameState.currentQuestionIndex];
        document.getElementById('question-text').textContent = currentQ.question;
        document.getElementById('question-number').textContent = this.gameState.currentQuestionIndex + 1;
        
        // Clear answer input
        const answerInput = document.getElementById('answer-input');
        answerInput.value = '';
        answerInput.focus();
    }

    submitAnswer() {
        const answerInput = document.getElementById('answer-input');
        const userAnswer = parseInt(answerInput.value);
        
        if (isNaN(userAnswer)) {
            return; // Don't submit if no valid number
        }
        
        const currentQ = this.gameState.questions[this.gameState.currentQuestionIndex];
        const isCorrect = userAnswer === currentQ.answer;
        
        if (isCorrect) {
            this.handleCorrectAnswer();
        } else {
            this.handleIncorrectAnswer(currentQ.answer);
        }
    }

    handleCorrectAnswer() {
        // Calculate score (accuracy first, then speed bonus)
        const gameConfig = getGameConfig();
        const baseScore = gameConfig.baseScore;
        const timeBonus = Math.max(0, gameConfig.maxSpeedBonus - Math.floor((Date.now() - this.gameState.startTime) / 1000));
        const questionScore = baseScore + timeBonus;
        
        this.gameState.score += questionScore;
        this.gameState.correctAnswers++;
        
        // Update UI
        document.getElementById('current-score').textContent = this.gameState.score;
        
        // Animate comet collection
        this.animateCometCollection();
        
        // Play success sound (visual feedback for now)
        this.showSuccessAnimation();
        
        // Check for celebration
        if (this.gameState.correctAnswers === gameConfig.celebrationTrigger) {
            this.showCelebration();
            return;
        }
        
        this.nextQuestion();
    }

    handleIncorrectAnswer(correctAnswer) {
        // Show error modal
        document.getElementById('correct-answer-display').textContent = correctAnswer;
        document.getElementById('error-modal').classList.add('active');
        
        // Pause timer
        this.pauseTimer();
    }

    animateCometCollection() {
        const gameConfig = getGameConfig();
        const cometIndex = this.gameState.correctAnswers;
        if (cometIndex <= gameConfig.maxComets) {
            const comet = document.getElementById(`comet-${cometIndex}`);
            comet.classList.add('collected');
            
            // Animate comet flying to collection
            const questionElement = document.getElementById('question-text');
            const cometElement = document.getElementById(`comet-${cometIndex}`);
            
            // Create flying comet animation
            const flyingComet = document.createElement('div');
            flyingComet.textContent = '☄️';
            flyingComet.style.cssText = `
                position: fixed;
                font-size: 2rem;
                z-index: 1000;
                pointer-events: none;
                transition: all 0.8s ease-out;
            `;
            
            const questionRect = questionElement.getBoundingClientRect();
            const cometRect = cometElement.getBoundingClientRect();
            
            flyingComet.style.left = questionRect.left + questionRect.width / 2 + 'px';
            flyingComet.style.top = questionRect.top + questionRect.height / 2 + 'px';
            
            document.body.appendChild(flyingComet);
            
            setTimeout(() => {
                flyingComet.style.left = cometRect.left + cometRect.width / 2 + 'px';
                flyingComet.style.top = cometRect.top + cometRect.height / 2 + 'px';
                flyingComet.style.transform = 'scale(0.5)';
            }, 50);
            
            setTimeout(() => {
                document.body.removeChild(flyingComet);
            }, 800);
        }
    }

    showSuccessAnimation() {
        // Visual feedback for correct answer
        const questionElement = document.getElementById('question-text');
        questionElement.style.animation = 'none';
        questionElement.offsetHeight; // Trigger reflow
        questionElement.style.animation = 'gradientShift 0.5s ease-in-out';
        
        setTimeout(() => {
            questionElement.style.animation = '';
        }, 500);
    }

    showCelebration() {
        this.showScreen('celebration-screen');
        
        // Continue button
        document.getElementById('continue-game-btn').onclick = () => {
            this.showScreen('game-screen');
            this.nextQuestion();
        };
    }

    nextQuestion() {
        this.gameState.currentQuestionIndex++;
        
        if (this.gameState.currentQuestionIndex >= this.gameState.totalQuestions) {
            this.endGame();
        } else {
            this.displayQuestion();
        }
    }

    endGame() {
        this.gameState.endTime = Date.now();
        this.stopTimer();
        
        // Calculate final stats
        const timeTaken = Math.floor((this.gameState.endTime - this.gameState.startTime) / 1000);
        const accuracy = `${this.gameState.correctAnswers}/${this.gameState.totalQuestions}`;
        
        // Check for new personal best
        const isNewRecord = this.gameState.score > this.playerData.personalBest;
        
        if (isNewRecord) {
            this.playerData.personalBest = this.gameState.score;
            this.playerData.llamaCount++;
            this.savePlayerData();
        }
        
        // Show results
        this.showResults(this.gameState.score, timeTaken, accuracy, isNewRecord);
    }

    showResults(finalScore, timeTaken, accuracy, isNewRecord) {
        // Update results display
        document.getElementById('final-score').textContent = finalScore;
        document.getElementById('final-time').textContent = this.formatTime(timeTaken);
        document.getElementById('final-accuracy').textContent = accuracy;
        document.getElementById('previous-best').textContent = this.playerData.personalBest - (isNewRecord ? finalScore : 0);
        document.getElementById('this-round-score').textContent = finalScore;
        
        // Show new record celebration
        if (isNewRecord) {
            document.getElementById('new-record').classList.remove('hidden');
        } else {
            document.getElementById('new-record').classList.add('hidden');
        }
        
        this.showScreen('results-screen');
    }

    // Timer Management
    startTimer() {
        this.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.gameState.startTime) / 1000);
            document.getElementById('timer').textContent = this.formatTime(elapsed);
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    pauseTimer() {
        this.stopTimer();
    }

    resumeTimer() {
        this.startTimer();
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Event Listeners
    initializeEventListeners() {
        // Welcome screen
        this.initializeWelcomeScreen();
        
        // Main menu
        document.getElementById('play-game-btn').addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('reset-data-btn').addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                localStorage.removeItem('catstronauts_player_data');
                location.reload();
            }
        });
        
        // Game screen
        const answerInput = document.getElementById('answer-input');
        const submitBtn = document.getElementById('submit-answer');
        
        answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitAnswer();
            }
        });
        
        submitBtn.addEventListener('click', () => {
            this.submitAnswer();
        });
        
        // Error modal
        document.getElementById('got-it-btn').addEventListener('click', () => {
            document.getElementById('error-modal').classList.remove('active');
            this.resumeTimer();
            this.nextQuestion();
        });
        
        // Results screen
        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('main-menu-btn').addEventListener('click', () => {
            this.showMainMenu();
        });
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CatstronautsGame();
}); 