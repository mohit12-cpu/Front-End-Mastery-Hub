// projects.js - Handle project loading and display functionality
class ProjectManager {
    constructor() {
        this.projects = [];
        this.filteredProjects = [];
        this.currentProject = null;
        this.isLoading = false;
        this.init();
    }

    async init() {
        await this.loadProjects();
        this.renderProjects();
        this.setupEventListeners();
    }

    async loadProjects(retryCount = 0) {
        if (this.isLoading) return;
        
        this.isLoading = true;
        const projectsGrid = document.getElementById('projectsGrid');
        
        if (projectsGrid) {
            projectsGrid.innerHTML = '<div class="no-projects">Loading projects...</div>';
        }

        try {
            const response = await fetch('./data/projects.json');
            if (!response.ok) {
                throw new Error(`Failed to load projects: ${response.status}`);
            }
            this.projects = await response.json();
            this.filteredProjects = [...this.projects];
        } catch (error) {
            console.warn('Failed to load projects.json, using fallback data:', error);
            // Retry once before using fallback
            if (retryCount < 1) {
                console.log('Retrying project loading...');
                this.isLoading = false;
                await this.loadProjects(retryCount + 1);
                return;
            }
            // Fallback to static data if JSON file fails to load
            this.loadFallbackProjects();
        } finally {
            this.isLoading = false;
        }
    }

    loadFallbackProjects() {
        this.projects = [
            {
                id: 1,
                title: "Personal Portfolio",
                category: "Beginner",
                description: "A responsive profile page using HTML/CSS with modern design principles.",
                image: "assets/images/portfolio.png",
                tags: ["HTML", "CSS", "Responsive"],
                difficulty: "Beginner",
                html: `<!DOCTYPE html>
<html>
<head>
    <title>Personal Portfolio</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <header>
        <h1>John Doe</h1>
        <p>Web Developer</p>
    </header>
    <main>
        <section>
            <h2>About Me</h2>
            <p>I'm a passionate web developer with experience in HTML, CSS, and JavaScript.</p>
        </section>
        <section>
            <h2>Projects</h2>
            <ul>
                <li>Project 1</li>
                <li>Project 2</li>
            </ul>
        </section>
    </main>
</body>
</html>`,
                css: `body {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
}

header {
    text-align: center;
    background-color: #333;
    color: white;
    padding: 2rem;
    border-radius: 8px;
}

main {
    margin-top: 2rem;
}

section {
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 1rem;
}

h1, h2 {
    margin-top: 0;
}

ul {
    padding-left: 1.5rem;
}`,
                js: `// Portfolio app loaded
console.log('Portfolio app initialized');

// Add any interactive features here
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
});`
            },
            {
                id: 2,
                title: "Simple Calculator",
                category: "Beginner",
                description: "A basic calculator with math functions using HTML, CSS, and JavaScript.",
                image: "assets/images/calculator.png",
                tags: ["HTML", "CSS", "JavaScript"],
                difficulty: "Beginner",
                html: `<!DOCTYPE html>
<html>
<head>
    <title>Simple Calculator</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <div class="calculator">
        <input type="text" id="display" readonly>
        <div class="buttons">
            <button onclick="clearDisplay()">C</button>
            <button onclick="appendToDisplay('/')">/</button>
            <button onclick="appendToDisplay('*')">*</button>
            <button onclick="appendToDisplay('7')">7</button>
            <button onclick="appendToDisplay('8')">8</button>
            <button onclick="appendToDisplay('9')">9</button>
            <button onclick="appendToDisplay('-')">-</button>
            <button onclick="appendToDisplay('4')">4</button>
            <button onclick="appendToDisplay('5')">5</button>
            <button onclick="appendToDisplay('6')">6</button>
            <button onclick="appendToDisplay('+')">+</button>
            <button onclick="appendToDisplay('1')">1</button>
            <button onclick="appendToDisplay('2')">2</button>
            <button onclick="appendToDisplay('3')">3</button>
            <button onclick="calculateResult()">=</button>
            <button onclick="appendToDisplay('0')" class="zero">0</button>
            <button onclick="appendToDisplay('.')">.</button>
        </div>
    </div>
</body>
</html>`,
                css: `.calculator {
    max-width: 300px;
    margin: 50px auto;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    background-color: #f9f9f9;
}

#display {
    width: 100%;
    height: 50px;
    font-size: 24px;
    text-align: right;
    padding: 0 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
}

button {
    height: 50px;
    font-size: 18px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
}

button:hover {
    background-color: #e0e0e0;
}

.zero {
    grid-column: span 2;
}`,
                js: `function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculateResult() {
    try {
        const result = eval(document.getElementById('display').value);
        document.getElementById('display').value = result;
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}`
            },
            {
                id: 3,
                title: "To-Do List App",
                category: "Intermediate",
                description: "A CRUD-style app with localStorage for persistent task management.",
                image: "assets/images/todo-app.png",
                tags: ["HTML", "CSS", "JavaScript", "LocalStorage"],
                difficulty: "Intermediate",
                html: `<!DOCTYPE html>
<html>
<head>
    <title>To-Do List App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <div class="todo-app">
        <h1>To-Do List</h1>
        <div class="input-area">
            <input type="text" id="taskInput" placeholder="Enter a new task...">
            <button onclick="addTask()">Add</button>
        </div>
        <ul id="taskList"></ul>
    </div>
</body>
</html>`,
                css: `.todo-app {
    max-width: 500px;
    margin: 50px auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.input-area {
    display: flex;
    margin-bottom: 20px;
}

#taskInput {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px 0 0 4px;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
}

li:last-child {
    border-bottom: none;
}

.delete-btn {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}

.delete-btn:hover {
    background-color: #c82333;
}`,
                js: `let tasks = [];

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText) {
        tasks.push({
            id: Date.now(),
            text: taskText,
            completed: false
        });
        
        input.value = '';
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = \`
            <span>\${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(\${task.id})">Delete</button>
        \`;
        taskList.appendChild(li);
    });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    renderTasks();
    
    // Add task when Enter is pressed
    document.getElementById('taskInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});`
            }
        ];
        this.filteredProjects = [...this.projects];
    }

    renderProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid) return;

        if (this.filteredProjects.length === 0) {
            projectsGrid.innerHTML = '<div class="no-projects">No projects found. Try different filters.</div>';
            return;
        }

        projectsGrid.innerHTML = this.filteredProjects.map(project => {
            const isCompleted = this.isProjectCompleted(project.id);
            return `
            <div class="project-card" data-project-id="${project.id}" role="article" aria-label="${project.title}">
                <div class="project-image">
                    <img src="${project.image || 'assets/images/placeholder.png'}" alt="${project.title}">
                </div>
                <div class="project-content">
                    <div class="project-header">
                        <h3>${project.title}</h3>
                        <span class="project-difficulty difficulty-${project.difficulty.toLowerCase()}">${project.difficulty}</span>
                    </div>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-actions">
                        <button class="btn btn-primary try-project" data-project-id="${project.id}" aria-label="Try ${project.title} project">Try Project</button>
                        <button class="btn btn-secondary view-code" data-project-id="${project.id}" aria-label="View code for ${project.title}">View Code</button>
                        ${isCompleted ? '<span class="completion-badge" aria-label="Completed">✓</span>' : ''}
                    </div>
                </div>
            </div>
        `}).join('');
    }

    setupEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                this.filterProjects(e.target.dataset.category);
            });
        });

        // Search input
        const searchInput = document.getElementById('searchProjects');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchProjects(e.target.value);
            });
        }

        // Project action buttons (delegated)
        const projectsContainer = document.getElementById('projectsGrid');
        if (projectsContainer) {
            projectsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('try-project')) {
                    const projectId = parseInt(e.target.dataset.projectId);
                    this.openProjectPreview(projectId);
                    // Mark as completed after viewing
                    setTimeout(() => {
                        this.markProjectAsCompleted(projectId);
                    }, 5000); // Mark as completed after 5 seconds of viewing
                } else if (e.target.classList.contains('view-code')) {
                    const projectId = parseInt(e.target.dataset.projectId);
                    this.openCodeViewer(projectId);
                    // Mark as completed after viewing code
                    setTimeout(() => {
                        this.markProjectAsCompleted(projectId);
                    }, 3000); // Mark as completed after 3 seconds of viewing code
                }
            });
        }

        // Modal close buttons
        const closeButtons = document.querySelectorAll('.modal .close');
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.closeModal();
            });
        });

        // Close modal when clicking outside
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        });

        // Copy code buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-code')) {
                this.copyCodeToClipboard(e.target);
            }
        });

        // Tab switching in code viewer
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-button')) {
                this.switchCodeTab(e.target);
            }
        });
    }

    filterProjects(category) {
        if (category === 'all') {
            this.filteredProjects = [...this.projects];
        } else {
            // Fix case sensitivity issue
            this.filteredProjects = this.projects.filter(project => 
                project.category.toLowerCase() === category.toLowerCase()
            );
        }
        this.renderProjects();
    }

    searchProjects(query) {
        if (!query) {
            this.filteredProjects = [...this.projects];
        } else {
            const searchTerm = query.toLowerCase();
            this.filteredProjects = this.projects.filter(project => 
                project.title.toLowerCase().includes(searchTerm) ||
                project.description.toLowerCase().includes(searchTerm) ||
                project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }
        this.renderProjects();
    }

    findProjectById(id) {
        return this.projects.find(project => project.id === id);
    }

    openProjectPreview(projectId) {
        const project = this.findProjectById(projectId);
        if (!project) {
            this.showNotification('Project not found', 'error');
            return;
        }

        this.currentProject = project;
        
        const modal = document.getElementById('projectPreviewModal');
        if (!modal) return;

        const previewContent = modal.querySelector('.preview-content');
        if (previewContent) {
            // Create a complete HTML document for the preview
            previewContent.innerHTML = `
                <div class="preview-container">
                    <iframe id="projectPreviewFrame" srcdoc="" title="${project.title} preview"></iframe>
                </div>
            `;
            
            // Set the iframe content with proper HTML structure
            const iframe = document.getElementById('projectPreviewFrame');
            if (iframe) {
                // Escape HTML entities to prevent issues in srcdoc
                const escapeHtml = (unsafe) => {
                    return unsafe
                        .replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/"/g, "&quot;")
                        .replace(/'/g, "&#039;");
                };
                
                const fullHtml = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${escapeHtml(project.title)}</title>
                        <style>
                            ${project.css}
                            body { 
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; 
                                margin: 0; 
                                padding: 20px; 
                                background-color: #f5f5f5;
                            }
                            * {
                                box-sizing: border-box;
                            }
                        </style>
                    </head>
                    <body>
                        ${project.html}
                        <script>
                            ${project.js}
                            // Handle any errors in the project code
                            window.addEventListener('error', function(e) {
                                console.error('Project error:', e.error);
                            });
                        </script>
                    </body>
                    </html>
                `;
                
                // Set the iframe content
                iframe.srcdoc = fullHtml;
            }
        }

        // Update modal title
        const modalTitle = modal.querySelector('.modal-title');
        if (modalTitle) {
            modalTitle.textContent = project.title;
        }

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    openCodeViewer(projectId) {
        const project = this.findProjectById(projectId);
        if (!project) {
            this.showNotification('Project not found', 'error');
            return;
        }

        this.currentProject = project;
        
        const modal = document.getElementById('codeViewerModal');
        if (!modal) return;

        // Update modal title
        const modalTitle = modal.querySelector('.modal-title');
        if (modalTitle) {
            modalTitle.textContent = project.title;
        }

        // Update code content with syntax highlighting simulation
        const htmlCode = modal.querySelector('#htmlCode');
        const cssCode = modal.querySelector('#cssCode');
        const jsCode = modal.querySelector('#jsCode');
        
        if (htmlCode) {
            htmlCode.textContent = project.html;
            // Add basic syntax highlighting classes
            htmlCode.className = 'code-content html';
        }
        if (cssCode) {
            cssCode.textContent = project.css;
            cssCode.className = 'code-content css';
        }
        if (jsCode) {
            jsCode.textContent = project.js;
            jsCode.className = 'code-content javascript';
        }

        // Show the first tab by default
        this.switchCodeTab(modal.querySelector('.tab-button'));

        // Show the modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }

    switchCodeTab(button) {
        // Remove active class from all tabs
        const tabs = button ? button.parentElement.querySelectorAll('.tab-button') : 
                  document.querySelectorAll('.tab-button');
        tabs.forEach(tab => tab.classList.remove('active'));
        
        // Add active class to clicked tab or first tab
        const activeTab = button || tabs[0];
        if (activeTab) {
            activeTab.classList.add('active');
            
            // Hide all code panels
            const panels = document.querySelectorAll('.code-panel');
            panels.forEach(panel => panel.style.display = 'none');
            
            // Show the selected panel
            const targetPanel = document.getElementById(activeTab.dataset.tab);
            if (targetPanel) {
                targetPanel.style.display = 'block';
            }
        }
    }

    copyCodeToClipboard(button) {
        const codeType = button.dataset.code;
        const project = this.currentProject;
        
        if (!project) return;
        
        let code = '';
        switch (codeType) {
            case 'html':
                code = project.html;
                break;
            case 'css':
                code = project.css;
                break;
            case 'js':
                code = project.js;
                break;
            default:
                return;
        }
        
        if (code) {
            // Try to use the Clipboard API first
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(code).then(() => {
                    this.showSuccessFeedback(button);
                }).catch(() => {
                    this.fallbackCopyTextToClipboard(code, button);
                });
            } else {
                // Fallback for older browsers or non-secure contexts
                this.fallbackCopyTextToClipboard(code, button);
            }
        }
    }

    fallbackCopyTextToClipboard(text, button) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                this.showSuccessFeedback(button);
            } else {
                this.showNotification('Failed to copy code', 'error');
            }
        } catch (err) {
            this.showNotification('Failed to copy code', 'error');
        }
        
        document.body.removeChild(textArea);
    }

    showSuccessFeedback(button) {
        // Show feedback
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.backgroundColor = '#22c55e'; // green
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = ''; // reset to original
        }, 2000);
    }

    // Show notification to user
    showNotification(message, type = 'info') {
        // Remove any existing notifications
        const existingNotification = document.getElementById('project-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.id = 'project-notification';
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '4px';
        notification.style.zIndex = '10000';
        notification.style.fontWeight = '500';
        notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        notification.style.transition = 'all 0.3s ease';
        notification.style.maxWidth = '300px';
        notification.style.wordWrap = 'break-word';
        
        // Set style based on type
        switch (type) {
            case 'error':
                notification.style.backgroundColor = '#ef4444';
                notification.style.color = 'white';
                break;
            case 'success':
                notification.style.backgroundColor = '#22c55e';
                notification.style.color = 'white';
                break;
            default:
                notification.style.backgroundColor = '#3b82f6';
                notification.style.color = 'white';
        }
        
        document.body.appendChild(notification);
        
        // Force reflow to ensure the animation works
        notification.offsetHeight;
        
        // Animate in
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Track project completion in localStorage
    markProjectAsCompleted(projectId) {
        let completedProjects = JSON.parse(localStorage.getItem('completedProjects')) || [];
        if (!completedProjects.includes(projectId)) {
            completedProjects.push(projectId);
            localStorage.setItem('completedProjects', JSON.stringify(completedProjects));
            this.showNotification('Project marked as completed!', 'success');
            // Re-render to show completion badge
            this.renderProjects();
        }
    }

    isProjectCompleted(projectId) {
        const completedProjects = JSON.parse(localStorage.getItem('completedProjects')) || [];
        return completedProjects.includes(projectId);
    }
}

// Initialize the project manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.projectManager = new ProjectManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectManager;
}