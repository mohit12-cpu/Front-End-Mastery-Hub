// course.js - Unified course functionality for all courses

class CourseManager {
    constructor() {
        this.currentLesson = 0;
        this.courseId = this.getCourseId();
        this.lessons = [];
        this.completedLessons = [];
        this.courseDataCache = {};
        this.init();
    }

    init() {
        // Wait for DOM to be loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeCourse());
        } else {
            this.initializeCourse();
        }
    }

    getCourseId() {
        // Extract course ID from the current page URL
        const path = window.location.pathname;
        const fileName = path.substring(path.lastIndexOf('/') + 1);
        return fileName.replace('.html', '');
    }

    async initializeCourse() {
        try {
            // Load course data
            await this.loadCourseData();
            
            // Initialize UI components
            this.initializeUI();
            
            // Load progress
            this.loadProgress();
            
            // Initialize progress tracking
            if (typeof initializeProgressTracking === 'function') {
                initializeProgressTracking(this.courseId);
            }
            
            // Show first lesson
            this.showLesson(0);
            
            // Set up event listeners
            this.setupEventListeners();
        } catch (error) {
            console.error('Error initializing course:', error);
        }
    }

    async loadCourseData() {
        // Check if we have cached data
        if (this.courseDataCache[this.courseId]) {
            this.lessons = this.courseDataCache[this.courseId].lessons || [];
            return;
        }
        
        try {
            const response = await fetch(`../data/${this.courseId}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const courseData = await response.json();
            
            // Cache the data
            this.courseDataCache[this.courseId] = courseData;
            
            this.lessons = courseData.lessons || [];
        } catch (error) {
            console.error('Error loading course data:', error);
            // Fallback to static data if JSON fails to load
            this.lessons = this.getFallbackLessons();
        }
    }

    getFallbackLessons() {
        // Provide fallback lessons based on course ID
        const fallbackData = {
            html: [
                { id: 1, title: "Introduction to HTML", content: "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser." },
                { id: 2, title: "HTML Page Structure", content: "Every HTML document has a specific structure including DOCTYPE, html, head, and body elements." },
                { id: 3, title: "Text Formatting & Headings", content: "Learn how to format text and create headings using HTML tags." },
                { id: 4, title: "Links and Images", content: "Discover how to add hyperlinks and images to your web pages." },
                { id: 5, title: "Lists and Tables", content: "Create ordered, unordered lists and tables to organize content." },
                { id: 6, title: "Forms and Inputs", content: "Build interactive forms with various input types for user data collection." },
                { id: 7, title: "Semantic Tags", content: "Use semantic HTML tags to improve accessibility and SEO." },
                { id: 8, title: "Audio & Video Embedding", content: "Embed multimedia content directly into your web pages." },
                { id: 9, title: "Iframes and Embedding", content: "Embed external content using iframes and other embedding techniques." },
                { id: 10, title: "HTML5 APIs", content: "Explore modern HTML5 features like Canvas, Geolocation, and Web Storage." },
                { id: 11, title: "Interactive Elements", content: "Create interactive web elements using HTML5 features." },
                { id: 12, title: "Mini Project: Portfolio Page", content: "Build a complete personal portfolio page using all HTML concepts learned." }
            ],
            css: [
                { id: 1, title: "CSS Syntax", content: "CSS syntax" },
                { id: 2, title: "Selectors", content: "Selectors" },
                { id: 3, title: "Colors and Fonts", content: "Colors and fonts" },
                { id: 4, title: "Box Model", content: "Box model" },
                { id: 5, title: "Flexbox", content: "Flexbox" },
                { id: 6, title: "Grid", content: "Grid" },
                { id: 7, title: "Backgrounds", content: "Backgrounds" },
                { id: 8, title: "Transitions", content: "Transitions" },
                { id: 9, title: "Animations", content: "Animations" },
                { id: 10, title: "Responsive Design", content: "Responsive design" },
                { id: 11, title: "Pseudo-classes", content: "Pseudo-classes" },
                { id: 12, title: "Mini Project", content: "Mini project" }
            ],
            javascript: [
                { id: 1, title: "Introduction", content: "JavaScript introduction" },
                { id: 2, title: "Variables", content: "Variables" },
                { id: 3, title: "Functions", content: "Functions" },
                { id: 4, title: "Arrays", content: "Arrays" },
                { id: 5, title: "DOM", content: "DOM manipulation" },
                { id: 6, title: "Events", content: "Events" },
                { id: 7, title: "Forms", content: "Form validation" },
                { id: 8, title: "ES6", content: "ES6 features" },
                { id: 9, title: "LocalStorage", content: "LocalStorage" },
                { id: 10, title: "API", content: "API calls" },
                { id: 11, title: "Debugging", content: "Debugging" },
                { id: 12, title: "Mini Project", content: "Mini project" }
            ],
            python: [
                { id: 1, title: "Introduction", content: "Python introduction" },
                { id: 2, title: "Syntax", content: "Python syntax" },
                { id: 3, title: "Data Types", content: "Data types" },
                { id: 4, title: "Control Flow", content: "Control flow" },
                { id: 5, title: "Loops", content: "Loops" },
                { id: 6, title: "Functions", content: "Functions" },
                { id: 7, title: "Data Structures", content: "Data structures" },
                { id: 8, title: "File Handling", content: "File handling" },
                { id: 9, title: "Exceptions", content: "Exception handling" },
                { id: 10, title: "OOP", content: "Object-oriented programming" },
                { id: 11, title: "Libraries", content: "Libraries" },
                { id: 12, title: "Mini Project", content: "Mini project" }
            ]
        };
        
        return fallbackData[this.courseId] || [];
    }

    initializeUI() {
        // Update sidebar with lessons
        this.updateSidebar();
        
        // Update progress bar
        this.updateProgressUI();
    }

    updateSidebar() {
        const lessonsList = document.querySelector('.lessons-list');
        if (!lessonsList) return;
        
        // Build HTML string for better performance
        let lessonsHTML = '';
        
        // Add lessons to sidebar
        this.lessons.forEach((lesson, index) => {
            lessonsHTML += `
                <li class="lesson-item">
                    <a href="#lesson-${index}" aria-label="Go to lesson ${index + 1}: ${lesson.title}">
                        <span class="lesson-number">${index + 1}</span>
                        <span class="lesson-title">${lesson.title}</span>
                    </a>
                </li>
            `;
        });
        
        // Add quiz link
        lessonsHTML += `
            <li class="lesson-item">
                <a href="${this.courseId}-quiz.html" aria-label="Go to final quiz">
                    <span class="lesson-number">${this.lessons.length + 1}</span>
                    <span class="lesson-title">Final Quiz</span>
                </a>
            </li>
        `;
        
        // Update DOM once for better performance
        lessonsList.innerHTML = lessonsHTML;
    }

    setupEventListeners() {
        // Use event delegation for better performance
        document.addEventListener('click', (e) => {
            // Lesson navigation buttons
            if (e.target.closest('.lesson-navigation .btn-secondary')) {
                e.preventDefault();
                this.previousLesson();
            }
            
            if (e.target.closest('.lesson-navigation .btn-primary')) {
                e.preventDefault();
                this.nextLesson();
            }
            
            // Mark as complete button
            if (e.target.id === 'mark-complete') {
                e.preventDefault();
                this.markLessonComplete();
            }
            
            // Lesson item clicks (use event delegation)
            if (e.target.closest('.lesson-item a')) {
                const link = e.target.closest('.lesson-item a');
                
                // Get the lesson index from the href attribute
                const href = link.getAttribute('href');
                if (href && href.startsWith('#lesson-')) {
                    const index = parseInt(href.replace('#lesson-', ''), 10);
                    if (!isNaN(index) && index >= 0 && index < this.lessons.length) {
                        e.preventDefault();
                        this.showLesson(index);
                    }
                } else if (href && href.includes('-quiz.html')) {
                    // This is the quiz link, let it navigate normally
                    return;
                }
            }
            
            // Run code buttons with data-run-code attribute
            if (e.target.closest('[data-run-code]')) {
                const button = e.target.closest('[data-run-code]');
                const lessonId = button.getAttribute('data-run-code');
                e.preventDefault();
                this.runCode(lessonId);
            }
        });
    }

    showLesson(index) {
        // Validate index
        if (index < 0 || index >= this.lessons.length) return;
        
        // Save progress for current lesson before navigating away
        if (this.currentLesson !== undefined) {
            this.saveProgress();
        }
        
        // Update current lesson
        this.currentLesson = index;
        
        // Update UI to show current lesson
        this.updateLessonDisplay();
        
        // Update navigation buttons
        this.updateNavigationButtons();
        
        // Update progress
        this.updateProgressUI();
    }

    updateLessonDisplay() {
        // Create lesson content dynamically
        this.createLessonContent();
        
        // Update active lesson in sidebar
        const lessonItems = document.querySelectorAll('.lesson-item');
        lessonItems.forEach((item, index) => {
            if (index === this.currentLesson) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    createLessonContent() {
        const lessonBody = document.querySelector('.lesson-body');
        if (!lessonBody) return;
        
        // Clear existing content
        lessonBody.innerHTML = '';
        
        // Get current lesson
        const lesson = this.lessons[this.currentLesson];
        if (!lesson) return;
        
        // Create lesson section
        const lessonSection = document.createElement('section');
        lessonSection.id = `lesson-${this.currentLesson}`;
        lessonSection.className = 'lesson-section';
        
        // Add lesson content based on course type
        if (this.courseId === 'html') {
            lessonSection.innerHTML = this.createHTMLLessonContent(lesson);
        } else if (this.courseId === 'css') {
            lessonSection.innerHTML = this.createCSSLessonContent(lesson);
        } else if (this.courseId === 'javascript') {
            lessonSection.innerHTML = this.createJSLessonContent(lesson);
        } else if (this.courseId === 'python') {
            lessonSection.innerHTML = this.createPythonLessonContent(lesson);
        } else {
            // Default content
            lessonSection.innerHTML = `
                <h2>${this.currentLesson + 1}. ${lesson.title}</h2>
                <p>${lesson.content || 'Content will be loaded dynamically.'}</p>
                
                <h3>Try It Yourself</h3>
                <div class="editor-container">
                    <div class="editor-header">
                        <div class="editor-tabs">
                            <button class="tab active" data-tab="code">Code</button>
                        </div>
                        <button class="btn btn-run" data-run-code="${this.currentLesson}" aria-label="Run code">Run Code <i class="fas fa-play"></i></button>
                    </div>
                    <div class="editor-body">
                        <div class="editor-panel active" id="editor-code-${this.currentLesson}">
                            <textarea id="code-${this.currentLesson}"></textarea>
                        </div>
                    </div>
                </div>
                <div class="preview-container">
                    <div class="preview-header">
                        <h3>Output Preview</h3>
                    </div>
                    <iframe id="preview-frame-${this.currentLesson}" title="Preview"></iframe>
                </div>
            `;
        }
        
        lessonBody.appendChild(lessonSection);
        
        // Reinitialize Prism syntax highlighting
        if (typeof Prism !== 'undefined') {
            // Use requestAnimationFrame for better performance
            requestAnimationFrame(() => {
                Prism.highlightAll();
            });
        }
        
        // Set up editor tabs with a small delay to ensure DOM is ready
        setTimeout(() => {
            this.setupEditorTabs();
        }, 0);
    }
    
    setupEditorTabs() {
        // Use event delegation for better performance
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab')) {
                const tab = e.target;
                const tabName = tab.dataset.tab;
                const parent = tab.closest('.editor-container');
                
                if (parent) {
                    // Remove active class from all tabs and panels in this container
                    parent.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                    parent.querySelectorAll('.editor-panel').forEach(p => p.classList.remove('active'));
                    
                    // Add active class to clicked tab and corresponding panel
                    tab.classList.add('active');
                    const panel = parent.querySelector(`#editor-${tabName}-${this.currentLesson}`);
                    if (panel) {
                        panel.classList.add('active');
                    }
                }
            }
        });
    }
    
    createHTMLLessonContent(lesson) {
        return `
            <h2>${this.currentLesson + 1}. ${lesson.title}</h2>
            <p>${lesson.content || 'Content will be loaded dynamically.'}</p>
            
            <h3>Try It Yourself</h3>
            <div class="editor-container">
                <div class="editor-header">
                    <div class="editor-tabs">
                        <button class="tab active" data-tab="html">HTML</button>
                    </div>
                    <button class="btn btn-run" data-run-code="${this.currentLesson}" aria-label="Run code">Run Code <i class="fas fa-play"></i></button>
                </div>
                <div class="editor-body">
                    <div class="editor-panel active" id="editor-html-${this.currentLesson}">
                        <textarea id="html-code-${this.currentLesson}"></textarea>
                    </div>
                </div>
            </div>
            <div class="preview-container">
                <div class="preview-header">
                    <h3>Output Preview</h3>
                </div>
                <iframe id="preview-frame-${this.currentLesson}" title="Preview"></iframe>
            </div>
        `;
    }
    
    createCSSLessonContent(lesson) {
        return `
            <h2>${this.currentLesson + 1}. ${lesson.title}</h2>
            <p>${lesson.content || 'Content will be loaded dynamically.'}</p>
            
            <h3>Try It Yourself</h3>
            <div class="editor-container">
                <div class="editor-header">
                    <div class="editor-tabs">
                        <button class="tab active" data-tab="css">CSS</button>
                    </div>
                    <button class="btn btn-run" data-run-code="${this.currentLesson}" aria-label="Run code">Run Code <i class="fas fa-play"></i></button>
                </div>
                <div class="editor-body">
                    <div class="editor-panel active" id="editor-css-${this.currentLesson}">
                        <textarea id="css-code-${this.currentLesson}"></textarea>
                    </div>
                </div>
            </div>
            <div class="preview-container">
                <div class="preview-header">
                    <h3>Output Preview</h3>
                </div>
                <iframe id="preview-frame-${this.currentLesson}" title="Preview"></iframe>
            </div>
        `;
    }
    
    createJSLessonContent(lesson) {
        return `
            <h2>${this.currentLesson + 1}. ${lesson.title}</h2>
            <p>${lesson.content || 'Content will be loaded dynamically.'}</p>
            
            <h3>Try It Yourself</h3>
            <div class="editor-container">
                <div class="editor-header">
                    <div class="editor-tabs">
                        <button class="tab active" data-tab="js">JavaScript</button>
                    </div>
                    <button class="btn btn-run" data-run-code="${this.currentLesson}" aria-label="Run code">Run Code <i class="fas fa-play"></i></button>
                </div>
                <div class="editor-body">
                    <div class="editor-panel active" id="editor-js-${this.currentLesson}">
                        <textarea id="js-code-${this.currentLesson}"></textarea>
                    </div>
                </div>
            </div>
            <div class="preview-container">
                <div class="preview-header">
                    <h3>Output Preview</h3>
                </div>
                <iframe id="preview-frame-${this.currentLesson}" title="Preview"></iframe>
            </div>
        `;
    }
    
    createPythonLessonContent(lesson) {
        return `
            <h2>${this.currentLesson + 1}. ${lesson.title}</h2>
            <p>${lesson.content || 'Content will be loaded dynamically.'}</p>
            
            <h3>Try It Yourself</h3>
            <div class="editor-container">
                <div class="editor-header">
                    <div class="editor-tabs">
                        <button class="tab active" data-tab="python">Python</button>
                    </div>
                    <button class="btn btn-run" data-run-code="${this.currentLesson}" aria-label="Run code">Run Code <i class="fas fa-play"></i></button>
                </div>
                <div class="editor-body">
                    <div class="editor-panel active" id="editor-python-${this.currentLesson}">
                        <textarea id="python-code-${this.currentLesson}"></textarea>
                    </div>
                </div>
            </div>
            <div class="preview-container">
                <div class="preview-header">
                    <h3>Output Preview</h3>
                </div>
                <iframe id="preview-frame-${this.currentLesson}" title="Preview"></iframe>
            </div>
        `;
    }
    
    updateNavigationButtons() {
        const prevBtn = document.querySelector('.lesson-navigation .btn-secondary');
        const nextBtn = document.querySelector('.lesson-navigation .btn-primary');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentLesson === 0;
        }
        
        if (nextBtn) {
            if (this.currentLesson === this.lessons.length - 1) {
                nextBtn.innerHTML = 'Complete Course <i class="fas fa-check"></i>';
            } else {
                nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
            }
        }
    }

    nextLesson() {
        if (this.currentLesson < this.lessons.length - 1) {
            this.showLesson(this.currentLesson + 1);
        }
    }

    previousLesson() {
        if (this.currentLesson > 0) {
            this.showLesson(this.currentLesson - 1);
        }
    }

    markLessonComplete() {
        // Use the markCurrentLessonCompleted function from progress.js if available
        if (typeof markCurrentLessonCompleted === 'function') {
            markCurrentLessonCompleted(this.courseId, this.currentLesson);
        } else {
            // Fallback implementation
            // Add current lesson to completed lessons if not already there
            if (!this.completedLessons.includes(this.currentLesson)) {
                this.completedLessons.push(this.currentLesson);
            }
            
            // Save progress
            this.saveProgress();
            
            // Update UI
            this.updateProgressUI();
            
            // Show completion message
            this.showCompletionMessage();
        }
    }

    showCompletionMessage() {
        // Check if notification already exists
        if (document.getElementById('completion-notification')) return;
        
        // Create notification element
        const notification = document.createElement('div');
        notification.id = 'completion-notification';
        notification.textContent = 'Lesson marked as complete!';
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#4ade80';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '4px';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        notification.style.pointerEvents = 'none'; // Prevent interaction
        
        document.body.appendChild(notification);
        
        // Fade in
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
        });
        
        // Remove after 2 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }

    getUserId() {
        // Use the getUserId function from progress.js if available
        if (typeof getUserId === 'function') {
            return getUserId();
        }
        
        // Fallback implementation
        // Try to get existing user ID from localStorage
        let userId = localStorage.getItem('userId');
        
        // If no user ID exists, create a new one
        if (!userId) {
            userId = 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
            // Store user ID in localStorage
            localStorage.setItem('userId', userId);
        }
        
        return userId;
    }

    saveProgress() {
        // Use the saveLessonProgress function from progress.js if available
        if (typeof saveLessonProgress === 'function') {
            saveLessonProgress(this.courseId, this.currentLesson);
        } else {
            // Fallback implementation
            const userId = this.getUserId();
            const progressKey = `${userId}_${this.courseId}_progress`;
            
            // Only save if there are changes
            const existingProgress = localStorage.getItem(progressKey);
            const newProgress = JSON.stringify(this.completedLessons);
            
            if (existingProgress !== newProgress) {
                localStorage.setItem(progressKey, newProgress);
            }
        }
    }

    loadProgress() {
        // Use the loadLessonProgress function from progress.js if available
        if (typeof loadLessonProgress === 'function') {
            this.completedLessons = loadLessonProgress(this.courseId);
        } else {
            // Fallback implementation
            const userId = this.getUserId();
            const progressKey = `${userId}_${this.courseId}_progress`;
            const progress = localStorage.getItem(progressKey);
            this.completedLessons = progress ? JSON.parse(progress) : [];
        }
    }

    updateProgressUI() {
        // Use the updateProgressUI function from progress.js if available
        if (typeof window.updateProgressUI === 'function') {
            window.updateProgressUI(this.courseId, this.completedLessons);
        } else {
            // Fallback implementation
            // Update progress bar
            const progressBar = document.querySelector('.progress');
            const progressText = document.querySelector('.progress-text');
            
            if (progressBar && progressText) {
                // Calculate percentage (excluding quiz)
                const totalLessons = this.lessons.length;
                const completedCount = this.completedLessons.length;
                const percentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
                
                // Update UI
                progressBar.style.width = `${percentage}%`;
                progressText.textContent = `${completedCount}/${totalLessons} lessons completed`;
            }
            
            // Mark completed lessons in sidebar using classList.toggle for better performance
            const lessonItems = document.querySelectorAll('.lesson-item');
            lessonItems.forEach((item, index) => {
                if (index < this.lessons.length) { // Only for actual lessons, not quiz
                    // Use toggle for better performance
                    item.classList.toggle('completed', this.completedLessons.includes(index));
                }
            });
        }
    }

    // Run code in editor
    runCode(lessonId) {
        // Get all possible code editors for this lesson
        const htmlCode = document.getElementById(`html-code-${lessonId}`);
        const cssCode = document.getElementById(`css-code-${lessonId}`);
        const jsCode = document.getElementById(`js-code-${lessonId}`);
        const pythonCode = document.getElementById(`python-code-${lessonId}`);
        const previewFrame = document.getElementById(`preview-frame-${lessonId}`);
        
        if (!previewFrame) {
            console.warn(`Preview frame not found for lesson ${lessonId}`);
            return;
        }
        
        const previewDocument = previewFrame.contentDocument || previewFrame.contentWindow.document;
        
        // Handle Python code specially
        if (pythonCode && pythonCode.value) {
            this.runPythonCode(lessonId, pythonCode.value, previewDocument);
            return;
        }
        
        // Handle HTML/CSS/JS code
        try {
            let fullHtml = `<!DOCTYPE html>\n<html>\n<head>`;
            
            if (cssCode && cssCode.value) {
                // Sanitize CSS to prevent XSS
                const sanitizedCss = this.escapeHtml(cssCode.value);
                fullHtml += `<style>${sanitizedCss}</style>`;
            }
            
            fullHtml += `</head>\n<body>`;
            
            if (htmlCode && htmlCode.value) {
                // Sanitize HTML to prevent XSS
                const sanitizedHtml = this.escapeHtml(htmlCode.value);
                fullHtml += sanitizedHtml;
            }
            
            if (jsCode && jsCode.value) {
                // Sanitize JavaScript to prevent XSS
                const sanitizedJs = this.escapeHtml(jsCode.value);
                fullHtml += `<script>${sanitizedJs}<\/script>`;
            }
            
            fullHtml += `</body>\n</html>`;
            
            previewDocument.open();
            previewDocument.write(fullHtml);
            previewDocument.close();
            
            // Reinitialize Prism syntax highlighting if available
            if (typeof Prism !== 'undefined') {
                setTimeout(() => {
                    Prism.highlightAll();
                }, 100);
            }
        } catch (error) {
            console.error('Error running code:', error);
            this.showErrorInPreview(previewDocument, 'Error running code', error.message || 'An unknown error occurred');
        }
    }
    
    // Helper function to show error in preview
    showErrorInPreview(previewDocument, title, message) {
        try {
            previewDocument.open();
            previewDocument.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Error</title>
                    <style>
                        body { 
                            font-family: Arial, sans-serif; 
                            padding: 20px; 
                            color: #333; 
                            background-color: #f8f9fa;
                        }
                        .error { 
                            color: #d32f2f; 
                            background: #ffebee; 
                            padding: 15px; 
                            border-radius: 4px; 
                            border-left: 4px solid #d32f2f;
                        }
                        .error h2 { 
                            margin-top: 0; 
                            color: #d32f2f;
                        }
                    </style>
                </head>
                <body>
                    <div class="error">
                        <h2>${this.escapeHtml(title)}</h2>
                        <p>${this.escapeHtml(message)}</p>
                    </div>
                </body>
                </html>
            `);
            previewDocument.close();
        } catch (error) {
            console.error('Error showing error in preview:', error);
        }
    }

    // Run Python code
    runPythonCode(lessonId, pythonCode, previewDocument) {
        // In a real implementation, this would send the code to a Python interpreter
        // For now, we'll just display the code in the preview
        try {
            previewDocument.open();
            previewDocument.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Python Code Output</title>
                    <style>
                        body { 
                            font-family: 'Courier New', monospace; 
                            padding: 20px; 
                            background: #f5f5f5; 
                            margin: 0;
                        }
                        .header {
                            background: #2c3e50;
                            color: white;
                            padding: 15px;
                            border-radius: 5px 5px 0 0;
                            margin: -20px -20px 20px -20px;
                        }
                        .code-container {
                            background: white;
                            padding: 15px;
                            border-radius: 5px;
                            overflow-x: auto;
                            margin-bottom: 20px;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        }
                        .output-container {
                            background: #e8f5e8;
                            padding: 15px;
                            border-radius: 5px;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        }
                        .output-container h3 {
                            margin-top: 0;
                            color: #2c3e50;
                        }
                        pre {
                            margin: 0;
                            white-space: pre-wrap;
                        }
                        .note {
                            font-style: italic;
                            color: #666;
                            margin: 10px 0;
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h2>Python Code Execution</h2>
                    </div>
                    <div class="code-container">
                        <h3>Code:</h3>
                        <pre>${this.escapeHtml(pythonCode)}</pre>
                    </div>
                    <div class="output-container">
                        <h3>Output:</h3>
                        <p class="note">Note: This is a simulation. In a real environment, this code would be executed by a Python interpreter.</p>
                        <pre>// Python code execution would appear here in a real implementation</pre>
                    </div>
                </body>
                </html>
            `);
            previewDocument.close();
            
            // Reinitialize Prism syntax highlighting if available
            if (typeof Prism !== 'undefined') {
                setTimeout(() => {
                    Prism.highlightAll();
                }, 100);
            }
        } catch (error) {
            console.error('Error running Python code:', error);
            this.showErrorInPreview(previewDocument, 'Error running Python code', error.message || 'An unknown error occurred');
        }
    }

    // Reset code editor
    resetCode(lessonId) {
        const htmlCode = document.getElementById(`html-code-${lessonId}`);
        const cssCode = document.getElementById(`css-code-${lessonId}`);
        const jsCode = document.getElementById(`js-code-${lessonId}`);
        
        if (htmlCode) htmlCode.value = '';
        if (cssCode) cssCode.value = '';
        if (jsCode) jsCode.value = '';
    }

    // Helper function to escape HTML
    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// Initialize course manager when the script loads
const courseManager = new CourseManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CourseManager;
}