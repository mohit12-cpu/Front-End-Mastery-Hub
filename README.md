# Front-End Mastery Hub

Welcome to the Front-End Mastery Hub - a comprehensive learning platform for front-end web development!

## Overview

This platform provides interactive tutorials and hands-on projects for learning:
- HTML
- CSS
- JavaScript
- Python
- React
- Git
- Bootstrap
- Web Design Principles

## Features

- **Interactive Code Playgrounds**: Experiment with code in real-time editors
- **Expandable Topics**: Dynamically load detailed content for each topic
- **Progress Tracking**: Save your learning progress using localStorage
- **Mini Projects**: Build complete applications as you learn
- **Quizzes**: Test your knowledge with course-specific quizzes
- **Search Functionality**: Find content across all courses
- **Responsive Design**: Works on all device sizes

## Course Structure

Each course includes:
- Multiple lessons with detailed explanations
- Interactive code examples
- Practice exercises
- Mini projects
- Final quizzes

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap
- Prism.js for syntax highlighting
- localStorage for progress tracking

## Getting Started

1. Open `index.html` in your browser
2. Browse courses through the navigation
3. Start with any course that interests you
4. Track your progress as you complete lessons
5. Build mini projects to apply your knowledge

## Project Structure

```
├── index.html          # Home page
├── courses.html        # Course listings
├── tutorial.html       # Interactive code editor
├── quiz.html           # General quiz page
├── dashboard.html      # User dashboard
├── settings.html       # User settings
├── help.html           # Help and documentation
├── about.html          # About page
├── blog.html           # Blog page
├── 404.html            # 404 error page
├── courses/            # Individual course pages
│   ├── html.html       # HTML course
│   ├── css.html        # CSS course
│   ├── javascript.html # JavaScript course
│   ├── python.html     # Python course
│   ├── react.html      # React course
│   ├── git.html        # Git course
│   ├── bootstrap.html  # Bootstrap course
│   ├── webdesign.html  # Web Design course
│   ├── projects.html   # Projects showcase
│   └── *-quiz.html     # Course-specific quizzes
├── css/                # Stylesheets
│   ├── style.css       # Main stylesheet
│   └── courses.css     # Course-specific styles
├── js/                 # JavaScript files
│   ├── main.js         # Main application logic
│   ├── editor.js       # Code editor functionality
│   ├── progress.js     # Progress tracking
│   ├── achievements.js # Achievement system
│   ├── quiz.js         # Quiz functionality
│   ├── data.js         # Course data management
│   ├── search.js       # Search functionality
│   └── projects.js     # Projects showcase
├── data/               # Course content data
│   ├── html.json       # HTML course content
│   ├── css.json        # CSS course content
│   ├── javascript.json # JavaScript course content
│   ├── python.json     # Python course content
│   ├── react.json      # React course content
│   ├── git.json        # Git course content
│   ├── bootstrap.json  # Bootstrap course content
│   └── webdesign.json  # Web Design course content
└── assets/             # Images and other assets
    ├── images/         # Project images
    └── favicon.ico     # Website favicon
```

## Development

To run the development server:
```bash
python server.py
```

Or on Windows:
```cmd
start-server.bat
```

The server will start on http://localhost:8000

## Contributing

This is an educational project designed for learning front-end web development. Feel free to explore the code and use it as a reference for your own projects.

## License

This project is for educational purposes only.

# CodeMaster - Interactive Coding Learning Platform

A fully responsive, modern front-end learning website built with HTML, CSS, and JavaScript (no backend) that teaches coding languages with interactive tutorials, quizzes, and a live code editor.

## 🧱 Folder Structure

```
learning-website/
│
├── index.html
├── about.html
├── courses.html
│
├── /courses/
│   ├── html.html
│   ├── css.html
│   ├── javascript.html
│   ├── python.html
│
├── /css/
│   └── style.css
│   └── courses.css
│
├── /js/
│   ├── main.js
│   ├── quiz.js
│   ├── editor.js
│   ├── data.js
│   ├── progress.js
│   ├── search.js
│   └── achievements.js
│
├── /data/
│   ├── html.json
│   ├── css.json
│   ├── javascript.json
│   └── python.json
│
└── /assets/
    ├── /images
    └── /icons
```

## 🚀 Getting Started

### Prerequisites
- Python 3.x (for running the local server)

### Running the Application

1. **Using the start script (Windows):**
   ```
   start-server.bat
   ```

2. **Using Python directly:**
   ```
   python server.py
   ```

3. **Manual server setup:**
   ```bash
   # Navigate to the project directory
   cd Front-End-Mastery-Hub
   
   # Start Python's built-in HTTP server
   python -m http.server 8080
   ```

The application will be available at: http://localhost:8080

## 🏠 Home Page Features

- Hero section with intro text and "Start Learning" button
- Search bar for tutorials
- Category cards for HTML, CSS, JS, Python
- Animated gradient background
- Responsive header + footer
- Dark/light mode toggle (JS-controlled)

## 📘 Courses Page Features

- Display all available courses as cards
- Title, description, and progress bar for each course
- "Start Course" button that navigates to course page
- Hover animations (3D tilt or fade-in)
- Filter or search by name

## 📚 Individual Course Pages

Each course (HTML, CSS, JS, Python) includes:

- Left sidebar with chapters/topics
- Right content area with tutorials and code examples
- Code syntax highlighting (Prism.js)
- "Try It Yourself" code editor (HTML/CSS/JS iframe output)
- Quiz or challenge at the bottom of each topic

## 🧩 Interactive Features

- **Live Editor**: Editable HTML/CSS/JS code that renders in iframe
- **Quizzes**: Multiple-choice questions using JS arrays or JSON
- **Score Tracker**: Store results in localStorage
- **Progress Tracking**: Save lesson completion in localStorage
- **Dark/Light Mode**: Theme toggle saves state
- **Animations**: Smooth fade-in, scroll effects

## 🎮 Bonus Features

- "Achievements" modal after quiz completion
- Floating navigation ("Next Lesson / Previous Lesson")
- Auto-scroll highlight for current lesson in sidebar
- Simple preloader animation
- Search bar for tutorials and code examples

## 🎨 Design Guidelines

- Responsive grid/flex layout
- Gradient backgrounds (purple-blue theme)
- Modern font (Poppins)
- Buttons with hover effects and subtle shadows
- 3D interactive cards using transform + perspective
- Consistent icons (FontAwesome)

## 🧰 JS Logic Overview

- **main.js**: Navigation, theme toggle, interactivity
- **quiz.js**: Quiz question logic, scoring, UI feedback
- **editor.js**: Code execution via iframe
- **data.js**: Course content and quiz data management
- **progress.js**: Track user progress and completion
- **search.js**: Search functionality across courses
- **achievements.js**: Achievement system and notifications
- **localStorage**: Save user progress and preferences

## 🎯 Final Goal

A complete, front-end-only coding learning platform with:

- Full tutorials for HTML, CSS, JS, and Python
- Live coding environments and interactive learning
- Built-in quizzes and progress tracking
- Responsive, modern UI that feels gamified and fun

## 📝 Course Content Outline

### 🟠 HTML Course
1. Introduction to HTML
2. Tags and Structure
3. Links, Images, Lists, Tables
4. Forms and Input
5. Semantic HTML
6. Multimedia
7. HTML5 APIs (Canvas, LocalStorage demo)
8. Interactive Elements
9. Mini Project: Portfolio Page

### 🔵 CSS Course
1. Syntax, Selectors, and Colors
2. Fonts and Text Styles
3. Box Model
4. Flexbox and Grid
5. Animations and Transitions
6. Media Queries (Responsive Design)
7. CSS Variables and Frameworks intro
8. Mini Project: Landing Page

### 🟡 JavaScript Course
1. Variables, Functions, and Loops
2. Arrays and Objects
3. DOM Manipulation and Events
4. LocalStorage
5. Fetch API
6. ES6 Features
7. Mini Projects: To-Do App, Quiz App

### 🐍 Python Course
1. Syntax, Variables, and Data Types
2. Loops, Functions, and Conditionals
3. Lists, Tuples, Dictionaries
4. File Handling (theory only)
5. OOP Basics
6. Mini Projects: Guessing Game, Calculator

## 🛠️ Development

To modify the website:

1. Edit HTML files for content changes
2. Modify CSS files for styling
3. Update JS files for functionality
4. Add new courses by creating new HTML files in the courses directory
5. Update JSON files in the data directory for course content

## 📚 Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Prism.js (Syntax highlighting)
- FontAwesome (Icons)
- localStorage (Data persistence)

## 📄 License

This project is for educational purposes. Feel free to use and modify for your own learning.