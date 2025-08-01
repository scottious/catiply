# 🐱 Catstronauts - Multiplication Game 🚀

A fun, educational multiplication game designed for children aged 10-12 to master their multiplication tables through engaging space-themed gameplay.

## 🌟 Features

### 🎮 Core Gameplay
- **20 questions per round** - Quick, focused practice sessions
- **Multiple table selection** - Choose which multiplication tables (1-12) to practice
- **Keyboard-first interface** - Type answers and use Enter key for quick play
- **Personal best tracking** - Compete against your own high scores
- **Golden Llama trophies** - Earn llamas for beating personal records

### 🎨 Visual Design
- **Space theme** - Dark space background with colorful kawaii-style elements
- **Animated comets** - Visual rewards for correct answers
- **Celebration animations** - Laser-eyed cats and comet explosions at milestones
- **Responsive design** - Works on desktop, tablet, and mobile devices

### 🏆 Scoring System
- **Accuracy first** - 100 points for correct answers
- **Speed bonus** - Up to 50 additional points for quick responses
- **No penalty for wrong answers** - Encourages learning without pressure
- **Immediate feedback** - Shows correct answers when mistakes are made

### 💾 Data Persistence
- **LocalStorage integration** - Saves player name, selected tables, and progress
- **Pre-configured users** - Arabelle (tables 6,7,8) and Bear (tables 6,7,8,11,12)
- **Fixed table assignments** - Users cannot change their tables to prevent gaming the system
- **Progress tracking** - Personal best scores and llama count
- **Reset option** - Clear all data to start fresh

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required - runs entirely in the browser

### Installation
1. Download or clone this repository
2. Open `index.html` in your web browser
3. Start playing!

### First Time Setup
1. Choose your space cadet (Arabelle or Bear)
2. Each cadet has pre-configured multiplication tables
3. Click "Blast Off!" to begin

## 🎯 How to Play

### Main Menu
- **Welcome back message** - Shows your name and current stats
- **Personal best score** - Your highest score achieved
- **Golden Llama count** - Total llamas earned for new records
- **Current tables display** - Shows which tables you're practicing (cannot be changed)
- **Start Mission** - Begin a new game round

### During Gameplay
- **Question display** - Large, clear multiplication problems
- **Answer input** - Type your answer and press Enter
- **Score tracking** - Real-time score and question counter
- **Timer** - Track how long you've been playing
- **Comet collection** - Visual progress indicator

### Correct Answers
- **Points awarded** - 100 base + speed bonus
- **Comet animation** - Flying comet collects in your collection
- **Success feedback** - Question text glows with celebration

### Incorrect Answers
- **Error modal** - Shows the correct answer
- **Learning pause** - Timer pauses until you acknowledge
- **"Got it!" button** - Continue to next question

### Celebration Screen
- **Milestone celebration** - Triggers after 10 correct answers
- **Animated cats** - Laser-eyed cats fly across screen
- **Comet explosions** - Visual fireworks celebration
- **Continue button** - Resume the game

### Results Screen
- **Final score** - Total points earned
- **Time taken** - How long the round lasted
- **Accuracy** - Correct answers out of total questions
- **Personal best comparison** - Compare to previous record
- **Golden Llama award** - Special celebration for new records

## 🎨 Design Philosophy

### Target Audience
- **Age 10-12 children** - Comfortable with computers and keyboard input
- **Dogman comic fans** - Appreciates modern cartoon humor
- **Goal-oriented learners** - Motivated by clear objectives and rewards

### Visual Style
- **Kawaii aesthetic** - Cute, friendly space theme
- **High contrast** - Bright foreground elements on dark space background
- **Smooth animations** - Engaging but not distracting
- **Responsive layout** - Works on all screen sizes

### Educational Approach
- **Non-competitive** - Focus on personal improvement
- **Encouraging feedback** - Positive reinforcement for learning
- **Immediate correction** - Shows right answers to prevent confusion
- **Fixed difficulty** - Pre-configured tables prevent gaming the system
- **Fair scoring** - All users practice the same difficulty level

## 🛠️ Technical Details

### Built With
- **HTML5** - Semantic structure and accessibility
- **CSS3** - Modern styling with animations and responsive design
- **Vanilla JavaScript** - No frameworks, pure browser functionality
- **LocalStorage API** - Client-side data persistence

### Browser Compatibility
- **Chrome 60+**
- **Firefox 55+**
- **Safari 12+**
- **Edge 79+**

### File Structure
```
catstronauts/
├── index.html      # Main HTML file
├── styles.css      # All styling and animations
├── script.js       # Game logic and functionality
├── setup.js        # User configurations and game settings
├── deploy.sh       # Deployment helper script
└── README.md       # This documentation
```

## 🎮 Game Mechanics

### Question Generation
- Randomly selects from chosen multiplication tables
- Multipliers range from 1-12
- 20 questions per round for optimal engagement

### Scoring Algorithm
```javascript
Base Score = 100 points
Speed Bonus = max(0, 50 - seconds_elapsed)
Total Score = Base Score + Speed Bonus
```

### Data Storage
```javascript
// User configurations (setup.js)
{
  'Arabelle': {
    name: 'Arabelle',
    selectedTables: [6, 7, 8],
    personalBest: 0,
    llamaCount: 0
  },
  'Bear': {
    name: 'Bear', 
    selectedTables: [6, 7, 8, 11, 12],
    personalBest: 0,
    llamaCount: 0
  }
}
```

## 🚀 Deployment

### Static Hosting
This game can be deployed to any static hosting service:

- **GitHub Pages** - Free hosting for public repositories
- **Netlify** - Drag and drop deployment
- **Vercel** - Automatic deployments from Git
- **Firebase Hosting** - Google's static hosting service

### Local Development
1. Clone the repository
2. Open `index.html` in a web browser
3. No build process required!

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Make your changes
3. Test thoroughly in multiple browsers
4. Submit a pull request

### Code Style
- **HTML** - Semantic, accessible markup
- **CSS** - BEM methodology, responsive design
- **JavaScript** - ES6+ features, clear variable names

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Future Enhancements

### Potential Features
- **Sound effects** - Audio feedback for interactions
- **Background music** - Optional space-themed soundtrack
- **Difficulty levels** - Easy, medium, hard modes
- **Multiplayer mode** - Compare scores with friends
- **Achievement system** - Badges for milestones
- **Export progress** - Share results with teachers/parents

### Technical Improvements
- **Service Worker** - Offline functionality
- **PWA features** - Install as app on mobile devices
- **Analytics** - Track learning progress (privacy-focused)
- **Accessibility** - Screen reader support and keyboard navigation

## 🐛 Known Issues

- **Mobile keyboards** - May cover input field on small screens
- **Browser autocomplete** - Can interfere with answer input
- **High DPI displays** - Some animations may appear choppy

## 📞 Support

For questions, suggestions, or bug reports, please open an issue on the GitHub repository.

---

**Made with ❤️ for young mathematicians everywhere!** 🚀🐱 