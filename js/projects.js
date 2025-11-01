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

    async loadProjects() {
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
                html: "<div id='portfolio-app'><h1>Personal Portfolio</h1><p>A responsive profile page using HTML/CSS with modern design principles.</p></div>",
                css: "#portfolio-app { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; } #portfolio-app h1 { color: #333; }",
                js: "// Portfolio app loaded"
            },
            {
                id: 2,
                title: "Simple Calculator",
                category: "Beginner",
                description: "A basic calculator with math functions using HTML, CSS, and JavaScript.",
                image: "assets/images/calculator.png",
                tags: ["HTML", "CSS", "JavaScript"],
                difficulty: "Beginner",
                html: "<div id='calculator-app'><h1>Simple Calculator</h1><p>A basic calculator with math functions.</p></div>",
                css: "#calculator-app { font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; }",
                js: "// Calculator app loaded"
            },
            {
                id: 3,
                title: "To-Do List App",
                category: "Intermediate",
                description: "A CRUD-style app with localStorage for persistent task management.",
                image: "assets/images/todo-app.png",
                tags: ["HTML", "CSS", "JavaScript", "LocalStorage"],
                difficulty: "Intermediate",
                html: "<div id='todo-app'><h1>To-Do List App</h1><p>A CRUD-style app with localStorage for persistent task management.</p></div>",
                css: "#todo-app { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }",
                js: "// To-Do app loaded"
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

        projectsGrid.innerHTML = this.filteredProjects.map(project => `
            <div class="project-card" data-project-id="${project.id}">
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
                        <button class="btn btn-primary try-project" data-project-id="${project.id}">Try Project</button>
                        <button class="btn btn-secondary view-code" data-project-id="${project.id}">View Code</button>
                    </div>
                </div>
            </div>
        `).join('');
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
                } else if (e.target.classList.contains('view-code')) {
                    const projectId = parseInt(e.target.dataset.projectId);
                    this.openCodeViewer(projectId);
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
            
            // Set the iframe content
            const iframe = document.getElementById('projectPreviewFrame');
            if (iframe) {
                const fullHtml = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${project.title}</title>
                        <style>
                            ${project.css}
                            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                        </style>
                    </head>
                    <body>
                        ${project.html}
                        <script>
                            ${project.js}
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

        // Update code content
        const htmlCode = modal.querySelector('#htmlCode');
        const cssCode = modal.querySelector('#cssCode');
        const jsCode = modal.querySelector('#jsCode');
        
        if (htmlCode) htmlCode.textContent = project.html;
        if (cssCode) cssCode.textContent = project.css;
        if (jsCode) jsCode.textContent = project.js;

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
        const tabs = button.parentElement.querySelectorAll('.tab-button');
        tabs.forEach(tab => tab.classList.remove('active'));
        
        // Add active class to clicked tab
        button.classList.add('active');
        
        // Hide all code panels
        const panels = document.querySelectorAll('.code-panel');
        panels.forEach(panel => panel.style.display = 'none');
        
        // Show the selected panel
        const targetPanel = document.getElementById(button.dataset.tab);
        if (targetPanel) {
            targetPanel.style.display = 'block';
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
            navigator.clipboard.writeText(code).then(() => {
                // Show feedback
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);
            }).catch(() => {
                this.showNotification('Failed to copy code', 'error');
            });
        }
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
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 10);
        
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