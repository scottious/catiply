#!/bin/bash

# Catstronauts Deployment Script
# This script helps deploy the game to various static hosting platforms

echo "🚀 Catstronauts Deployment Script"
echo "================================"

# Check if all required files exist
required_files=("index.html" "styles.css" "script.js" "setup.js" "README.md")
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Error: Missing required file: $file"
        exit 1
    fi
done

echo "✅ All required files found!"

# Create a simple server for testing (if Python is available)
if command -v python3 &> /dev/null; then
    echo ""
    echo "🌐 Starting local server for testing..."
    echo "   Open http://localhost:8000 in your browser"
    echo "   Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo ""
    echo "🌐 Starting local server for testing..."
    echo "   Open http://localhost:8000 in your browser"
    echo "   Press Ctrl+C to stop the server"
    echo ""
    python -m http.server 8000
else
    echo ""
    echo "💡 To test locally, you can:"
    echo "   - Open index.html directly in your browser"
    echo "   - Use any local server (Node.js, PHP, etc.)"
    echo ""
fi

echo ""
echo "📋 Deployment Options:"
echo "====================="
echo ""
echo "1. GitHub Pages:"
echo "   - Push to GitHub repository"
echo "   - Enable GitHub Pages in repository settings"
echo "   - Select source branch (usually main)"
echo ""
echo "2. Netlify:"
echo "   - Drag and drop this folder to netlify.com"
echo "   - Or connect your GitHub repository"
echo ""
echo "3. Vercel:"
echo "   - Install Vercel CLI: npm i -g vercel"
echo "   - Run: vercel"
echo ""
echo "4. Firebase Hosting:"
echo "   - Install Firebase CLI: npm i -g firebase-tools"
echo "   - Run: firebase init hosting"
echo "   - Run: firebase deploy"
echo ""
echo "🎮 Game is ready to deploy!" 