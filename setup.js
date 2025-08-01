// Catstronauts Setup Configuration
// This file contains initial user setups and game configurations

const GAME_SETUP = {
    // Initial user configurations
    users: {
        'Arabelle': {
            name: 'Arabelle',
            selectedTables: [6, 7, 8],
            personalBest: 0,
            llamaCount: 0,
            isFirstTime: false
        },
        'Bear': {
            name: 'Bear',
            selectedTables: [6, 7, 8, 11, 12],
            personalBest: 0,
            llamaCount: 0,
            isFirstTime: false
        }
    },
    
    // Game configuration
    gameConfig: {
        questionsPerRound: 20,
        baseScore: 100,
        maxSpeedBonus: 50,
        celebrationTrigger: 10, // Show celebration after this many correct answers
        maxComets: 5 // Maximum number of comets to collect
    },
    
    // Default settings for new users
    defaultSettings: {
        selectedTables: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // All tables
        personalBest: 0,
        llamaCount: 0,
        isFirstTime: true
    }
};

// Function to get user data by name
function getUserData(userName) {
    return GAME_SETUP.users[userName] || null;
}

// Function to get all available users
function getAvailableUsers() {
    return Object.keys(GAME_SETUP.users);
}

// Function to get game configuration
function getGameConfig() {
    return GAME_SETUP.gameConfig;
}

// Function to get default settings
function getDefaultSettings() {
    return GAME_SETUP.defaultSettings;
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GAME_SETUP,
        getUserData,
        getAvailableUsers,
        getGameConfig,
        getDefaultSettings
    };
} 