// data.js - Course data management
class CourseData {
    constructor() {
        this.courses = {
            html: null,
            css: null,
            javascript: null,
            python: null,
            react: null,
            git: null,
            bootstrap: null,
            webdesign: null
        };
        this.init();
    }

    async init() {
        try {
            // Load course data from JSON files
            const htmlResponse = await fetch('./data/html.json');
            this.courses.html = await htmlResponse.json();

            const cssResponse = await fetch('./data/css.json');
            this.courses.css = await cssResponse.json();

            const jsResponse = await fetch('./data/javascript.json');
            this.courses.javascript = await jsResponse.json();

            const pythonResponse = await fetch('./data/python.json');
            this.courses.python = await pythonResponse.json();

            const reactResponse = await fetch('./data/react.json');
            this.courses.react = await reactResponse.json();

            const gitResponse = await fetch('./data/git.json');
            this.courses.git = await gitResponse.json();

            const bootstrapResponse = await fetch('./data/bootstrap.json');
            this.courses.bootstrap = await bootstrapResponse.json();

            const webdesignResponse = await fetch('./data/webdesign.json');
            this.courses.webdesign = await webdesignResponse.json();
        } catch (error) {
            // Fallback to static data if JSON files fail to load
            this.loadFallbackData();
        }
    }

    loadFallbackData() {
        // Fallback data in case JSON files are not accessible
        this.courses.html = {
            course: "HTML",
            description: "Learn the fundamentals of HTML, the backbone of web development.",
            lessons: [
                { id: 1, title: "Introduction to HTML" },
                { id: 2, title: "HTML Page Structure" },
                { id: 3, title: "Text Formatting & Headings" },
                { id: 4, title: "Links and Images" },
                { id: 5, title: "Lists and Tables" },
                { id: 6, title: "Forms and Inputs" },
                { id: 7, title: "Semantic Tags" },
                { id: 8, title: "Audio & Video Embedding" },
                { id: 9, title: "Iframes and Embedding" },
                { id: 10, title: "HTML5 APIs" },
                { id: 11, title: "Interactive Elements" },
                { id: 12, title: "Mini Project: Portfolio Page" },
                { id: 13, title: "Meta Tags and SEO Basics" },
                { id: 14, title: "Accessibility (ARIA, alt text, semantics)" },
                { id: 15, title: "Forms with Validation Attributes" },
                { id: 16, title: "Custom Data Attributes (data-*)" },
                { id: 17, title: "HTML5 APIs (Canvas, Web Storage, Drag & Drop, Geolocation)" },
                { id: 18, title: "SVG Graphics and Embedding" },
                { id: 19, title: "Responsive Images (<picture>, srcset)" },
                { id: 20, title: "Creating Templates and Layout Structures" },
                { id: 21, title: "Using Iframes and Embedded Media Safely" },
                { id: 22, title: "Mini Project: Build a Blog Article Page" }
            ]
        };

        this.courses.css = {
            course: "CSS",
            description: "Master CSS to style and layout your web pages beautifully.",
            lessons: [
                { id: 1, title: "CSS Syntax and Selectors" },
                { id: 2, title: "Colors, Fonts, and Text" },
                { id: 3, title: "Box Model and Spacing" },
                { id: 4, title: "Flexbox Layout" },
                { id: 5, title: "Grid Layout" },
                { id: 6, title: "Backgrounds and Borders" },
                { id: 7, title: "Transitions and Animations" },
                { id: 8, title: "Pseudo-classes and Elements" },
                { id: 9, title: "Responsive Design" },
                { id: 10, title: "CSS Variables" },
                { id: 11, title: "CSS Frameworks" },
                { id: 12, title: "Mini Project: Landing Page" },
                { id: 13, title: "Advanced Selectors and Specificity" },
                { id: 14, title: "Positioning (absolute, relative, sticky, fixed)" },
                { id: 15, title: "CSS Grid Projects" },
                { id: 16, title: "Flexbox Deep Dive" },
                { id: 17, title: "Responsive Web Design (Fluid Layouts)" },
                { id: 18, title: "CSS Variables and Custom Properties" },
                { id: 19, title: "Animations and Keyframes" },
                { id: 20, title: "Transitions and Hover Effects" },
                { id: 21, title: "Pseudo-elements & Pseudo-classes" },
                { id: 22, title: "Mini Project: Animated Landing Page" }
            ]
        };

        this.courses.javascript = {
            course: "JavaScript",
            description: "Bring your websites to life with interactive JavaScript programming.",
            lessons: [
                { id: 1, title: "Introduction to JavaScript" },
                { id: 2, title: "Variables and Data Types" },
                { id: 3, title: "Functions, Loops, and Conditionals" },
                { id: 4, title: "Arrays and Objects" },
                { id: 5, title: "DOM Manipulation" },
                { id: 6, title: "Events and Event Handling" },
                { id: 7, title: "Form Validation" },
                { id: 8, title: "ES6 Features" },
                { id: 9, title: "LocalStorage and JSON" },
                { id: 10, title: "Fetch API and Async" },
                { id: 11, title: "Error Handling and Debugging" },
                { id: 12, title: "Mini Project: Quiz App" },
                { id: 13, title: "ES6+ Features (Destructuring, Spread, Modules)" },
                { id: 14, title: "DOM Traversal & Event Delegation" },
                { id: 15, title: "LocalStorage, SessionStorage, Cookies" },
                { id: 16, title: "API Calls with Fetch and Async/Await" },
                { id: 17, title: "JSON Parsing and Manipulation" },
                { id: 18, title: "Classes and Object-Oriented JS" },
                { id: 19, title: "JavaScript Modules and Imports" },
                { id: 20, title: "Error Handling and Debugging" },
                { id: 21, title: "Regular Expressions (RegEx)" },
                { id: 22, title: "Mini Project: To-Do App" },
                { id: 23, title: "Mini Project: Calculator" },
                { id: 24, title: "Mini Project: Quiz App" },
                { id: 25, title: "Mini Project: Weather App (Fetch API demo)" }
            ]
        };

        this.courses.python = {
            course: "Python",
            description: "Learn Python programming concepts through interactive examples.",
            lessons: [
                { id: 1, title: "Introduction to Python" },
                { id: 2, title: "Python Syntax and Variables" },
                { id: 3, title: "Data Types and Operators" },
                { id: 4, title: "Control Flow" },
                { id: 5, title: "Loops" },
                { id: 6, title: "Functions and Modules" },
                { id: 7, title: "Data Structures" },
                { id: 8, title: "File Handling" },
                { id: 9, title: "Exception Handling" },
                { id: 10, title: "Object-Oriented Programming" },
                { id: 11, title: "Python Libraries" },
                { id: 12, title: "Mini Project: Guessing Game" },
                { id: 13, title: "List Comprehensions" },
                { id: 14, title: "File I/O and Exception Handling" },
                { id: 15, title: "Functions, Arguments, and Lambda" },
                { id: 16, title: "OOP (Classes, Objects, Inheritance)" },
                { id: 17, title: "Working with Modules and Packages" },
                { id: 18, title: "Dictionaries and Sets Deep Dive" },
                { id: 19, title: "Virtual Environments (concept only)" },
                { id: 20, title: "Data Visualization (basic overview)" },
                { id: 21, title: "Mini Project: Password Generator" },
                { id: 22, title: "Mini Project: Guess the Number Game" },
                { id: 23, title: "Mini Project: Expense Tracker" }
            ]
        };

        this.courses.react = {
            course: "React",
            description: "Learn React concepts and build modern user interfaces with this popular JavaScript library.",
            lessons: [
                { id: 1, title: "Introduction to React" },
                { id: 2, title: "Components and Props" },
                { id: 3, title: "State and Events" },
                { id: 4, title: "Conditional Rendering" },
                { id: 5, title: "Lists and Keys" },
                { id: 6, title: "Simple JSX Examples" },
                { id: 7, title: "Virtual DOM Explanation" },
                { id: 8, title: "Mini Project: Counter App" }
            ]
        };

        this.courses.git = {
            course: "Git",
            description: "Master Git and GitHub for version control and collaboration.",
            lessons: [
                { id: 1, title: "What is Git?" },
                { id: 2, title: "Git Installation & Setup" },
                { id: 3, title: "Basic Commands (init, add, commit, push, clone)" },
                { id: 4, title: "Branching and Merging" },
                { id: 5, title: "Working with GitHub Repositories" },
                { id: 6, title: "Version Control Best Practices" },
                { id: 7, title: "Mini Project: Manage a Demo Repo" }
            ]
        };

        this.courses.bootstrap = {
            course: "Bootstrap",
            description: "Learn Bootstrap to quickly build responsive websites with pre-designed components.",
            lessons: [
                { id: 1, title: "Introduction to Bootstrap" },
                { id: 2, title: "Grid System" },
                { id: 3, title: "Components" },
                { id: 4, title: "Utilities" },
                { id: 5, title: "Customization" },
                { id: 6, title: "Responsive Design" },
                { id: 7, title: "JavaScript Components" },
                { id: 8, title: "Mini Project: Responsive Portfolio" }
            ]
        };

        this.courses.webdesign = {
            course: "Web Design",
            description: "Master the principles of web design including typography, color theory, layout, and user experience.",
            lessons: [
                { id: 1, title: "Introduction to Web Design" },
                { id: 2, title: "Typography Principles" },
                { id: 3, title: "Color Theory for Web" },
                { id: 4, title: "Layout Patterns" },
                { id: 5, title: "Spacing and White Space" },
                { id: 6, title: "Wireframing and Prototyping" },
                { id: 7, title: "Accessibility and Inclusive Design" },
                { id: 8, title: "Mini Project: Landing Page Wireframe" }
            ]
        };
    }

    getCourseData(course) {
        return this.courses[course] || null;
    }

    getCourseLessons(course) {
        const courseData = this.courses[course];
        return courseData ? courseData.lessons : [];
    }

    getCourseDescription(course) {
        const courseData = this.courses[course];
        return courseData ? courseData.description : "";
    }
}

// Initialize course data manager
const courseDataManager = new CourseData();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CourseData;
}