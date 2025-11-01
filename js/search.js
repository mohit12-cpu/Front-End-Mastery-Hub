// Search functionality for the learning platform

// Course data for search
const courseData = {
    html: {
        title: "HTML Course",
        lessons: [
            "Introduction to HTML",
            "HTML Page Structure",
            "Text Formatting & Headings",
            "Links and Images",
            "Lists and Tables",
            "Forms and Inputs",
            "Semantic Tags",
            "Audio & Video Embedding",
            "Iframes and Embedding",
            "HTML5 APIs",
            "Interactive Elements",
            "Mini Project: Portfolio Page",
            "Meta Tags and SEO Basics",
            "Accessibility (ARIA, alt text, semantics)",
            "Forms with Validation Attributes",
            "Custom Data Attributes (data-*)",
            "HTML5 APIs (Canvas, Web Storage, Drag & Drop, Geolocation)",
            "SVG Graphics and Embedding",
            "Responsive Images (<picture>, srcset)",
            "Creating Templates and Layout Structures",
            "Using Iframes and Embedded Media Safely",
            "Mini Project: Build a Blog Article Page"
        ],
        description: "Learn the fundamentals of HTML, the backbone of web development."
    },
    css: {
        title: "CSS Course",
        lessons: [
            "CSS Syntax and Selectors",
            "Colors, Fonts, and Text",
            "Box Model and Spacing",
            "Flexbox Layout",
            "Grid Layout",
            "Backgrounds and Borders",
            "Transitions and Animations",
            "Pseudo-classes and Elements",
            "Responsive Design",
            "CSS Variables",
            "CSS Frameworks",
            "Mini Project: Landing Page",
            "Advanced Selectors and Specificity",
            "Positioning (absolute, relative, sticky, fixed)",
            "CSS Grid Projects",
            "Flexbox Deep Dive",
            "Responsive Web Design (Fluid Layouts)",
            "CSS Variables and Custom Properties",
            "Animations and Keyframes",
            "Transitions and Hover Effects",
            "Pseudo-elements & Pseudo-classes",
            "Mini Project: Animated Landing Page"
        ],
        description: "Master CSS to style and layout your web pages beautifully."
    },
    javascript: {
        title: "JavaScript Course",
        lessons: [
            "Introduction to JavaScript",
            "Variables and Data Types",
            "Functions, Loops, and Conditionals",
            "Arrays and Objects",
            "DOM Manipulation",
            "Events and Event Handling",
            "Form Validation",
            "ES6 Features",
            "LocalStorage and JSON",
            "Fetch API and Async",
            "Error Handling and Debugging",
            "Mini Project: Quiz App",
            "ES6+ Features (Destructuring, Spread, Modules)",
            "DOM Traversal & Event Delegation",
            "LocalStorage, SessionStorage, Cookies",
            "API Calls with Fetch and Async/Await",
            "JSON Parsing and Manipulation",
            "Classes and Object-Oriented JS",
            "JavaScript Modules and Imports",
            "Error Handling and Debugging",
            "Regular Expressions (RegEx)",
            "Mini Project: To-Do App",
            "Mini Project: Calculator",
            "Mini Project: Quiz App",
            "Mini Project: Weather App (Fetch API demo)"
        ],
        description: "Bring your websites to life with interactive JavaScript programming."
    },
    python: {
        title: "Python Course",
        lessons: [
            "Introduction to Python",
            "Python Syntax and Variables",
            "Data Types and Operators",
            "Control Flow",
            "Loops",
            "Functions and Modules",
            "Data Structures",
            "File Handling",
            "Exception Handling",
            "Object-Oriented Programming",
            "Python Libraries",
            "Mini Project: Guessing Game",
            "List Comprehensions",
            "File I/O and Exception Handling",
            "Functions, Arguments, and Lambda",
            "OOP (Classes, Objects, Inheritance)",
            "Working with Modules and Packages",
            "Dictionaries and Sets Deep Dive",
            "Virtual Environments (concept only)",
            "Data Visualization (basic overview)",
            "Mini Project: Password Generator",
            "Mini Project: Guess the Number Game",
            "Mini Project: Expense Tracker"
        ],
        description: "Learn Python programming concepts through interactive examples."
    },
    react: {
        title: "React Course",
        lessons: [
            "Introduction to React",
            "Components and Props",
            "State and Events",
            "Conditional Rendering",
            "Lists and Keys",
            "Simple JSX Examples",
            "Virtual DOM Explanation",
            "Mini Project: Counter App"
        ],
        description: "Learn React concepts and build modern user interfaces with this popular JavaScript library."
    },
    git: {
        title: "Git Course",
        lessons: [
            "What is Git?",
            "Git Installation & Setup",
            "Basic Commands (init, add, commit, push, clone)",
            "Branching and Merging",
            "Working with GitHub Repositories",
            "Version Control Best Practices",
            "Mini Project: Manage a Demo Repo"
        ],
        description: "Master Git and GitHub for version control and collaboration."
    },
    bootstrap: {
        title: "Bootstrap Course",
        lessons: [
            "Introduction to Bootstrap",
            "Grid System",
            "Components",
            "Utilities",
            "Customization",
            "Responsive Design",
            "JavaScript Components",
            "Mini Project: Responsive Portfolio"
        ],
        description: "Learn Bootstrap to quickly build responsive websites with pre-designed components."
    },
    webdesign: {
        title: "Web Design Course",
        lessons: [
            "Introduction to Web Design",
            "Typography Principles",
            "Color Theory for Web",
            "Layout Patterns",
            "Spacing and White Space",
            "Wireframing and Prototyping",
            "Accessibility and Inclusive Design",
            "Mini Project: Landing Page Wireframe"
        ],
        description: "Master the principles of web design including typography, color theory, layout, and user experience."
    }
};

// Search function
function searchCourses(query) {
    const results = [];
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) return results;
    
    // Search through courses
    for (const courseKey in courseData) {
        const course = courseData[courseKey];
        
        // Check course title
        if (course.title.toLowerCase().includes(searchTerm)) {
            results.push({
                type: "course",
                course: courseKey,
                title: course.title,
                description: course.description,
                url: `courses/${courseKey}.html`
            });
        }
        
        // Check course description
        if (course.description.toLowerCase().includes(searchTerm)) {
            // Avoid duplicates
            if (!results.some(result => result.course === courseKey && result.type === "course")) {
                results.push({
                    type: "course",
                    course: courseKey,
                    title: course.title,
                    description: course.description,
                    url: `courses/${courseKey}.html`
                });
            }
        }
        
        // Search through lessons
        course.lessons.forEach((lesson, index) => {
            if (lesson.toLowerCase().includes(searchTerm)) {
                results.push({
                    type: "lesson",
                    course: courseKey,
                    title: lesson,
                    description: `Lesson in ${course.title}`,
                    url: `courses/${courseKey}.html#${courseKey}-lesson-${index + 1}`
                });
            }
        });
    }
    
    return results;
}

// Display search results
function displaySearchResults(results, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (results.length === 0) {
        container.innerHTML = '<p class="no-results">No results found.</p>';
        return;
    }
    
    let html = '<div class="search-results">';
    
    results.forEach(result => {
        html += `
            <div class="search-result">
                <h3><a href="${result.url}">${result.title}</a></h3>
                <p>${result.description}</p>
                <span class="result-type">${result.type}</span>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', () => {
    // Search input handler
    const searchInputs = document.querySelectorAll('#search-input, #course-search');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const query = this.value;
            const results = searchCourses(query);
            
            // Display results in a dropdown or results container
            const resultsContainer = document.getElementById('search-results');
            if (resultsContainer) {
                displaySearchResults(results, 'search-results');
            }
        });
        
        // Handle Enter key
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    // Redirect to search results page or show results
                    const results = searchCourses(query);
                    const resultsContainer = document.getElementById('search-results');
                    if (resultsContainer) {
                        displaySearchResults(results, 'search-results');
                    } else {
                        // For now, just show an alert with results count
                        alert(`Found ${results.length} results for "${query}"`);
                    }
                }
            }
        });
    });
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { searchCourses, displaySearchResults };
}