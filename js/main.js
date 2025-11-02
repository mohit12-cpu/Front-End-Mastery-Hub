// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or respect OS setting
const savedTheme = localStorage.getItem('theme');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    body.classList.add('dark-mode');
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
} else if (themeToggle) {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Toggle theme when button is clicked
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Save theme preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.createElement('button');
    mobileToggle.classList.add('mobile-toggle');
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileToggle.setAttribute('aria-label', 'Toggle navigation');

    const headerContainer = document.querySelector('.header .container');
    if (headerContainer) {
        headerContainer.appendChild(mobileToggle);
        
        const nav = document.querySelector('.nav');
        if (nav) {
            mobileToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
            });
        }
    }
});

// Search Functionality
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                // In a real app, this would redirect to search results page
                alert(`Searching for: ${query}`);
                searchInput.value = '';
            }
        }
    });
}

// Progress Tracking with localStorage
document.addEventListener('DOMContentLoaded', () => {
    // Initialize progress tracking if on tutorial page
    const lessonItems = document.querySelectorAll('.lesson-item');
    if (lessonItems.length > 0) {
        // Load saved progress
        const savedProgress = JSON.parse(localStorage.getItem('tutorialProgress')) || {};
        const currentCourse = getCurrentCourse();
        
        if (savedProgress[currentCourse]) {
            // Update UI with saved progress
            updateProgressUI(savedProgress[currentCourse]);
        }
        
        // Add click event to lesson items
        lessonItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                markLessonAsCompleted(index, currentCourse);
            });
        });
    }
});

// Get current course from URL
function getCurrentCourse() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('course') || 'html';
}

// Mark lesson as completed
function markLessonAsCompleted(lessonIndex, course) {
    // Get saved progress or initialize empty object
    const savedProgress = JSON.parse(localStorage.getItem('tutorialProgress')) || {};
    
    // Initialize course progress if not exists
    if (!savedProgress[course]) {
        savedProgress[course] = [];
    }
    
    // Mark lesson as completed
    if (!savedProgress[course].includes(lessonIndex)) {
        savedProgress[course].push(lessonIndex);
    }
    
    // Save progress
    localStorage.setItem('tutorialProgress', JSON.stringify(savedProgress));
    
    // Update UI
    updateProgressUI(savedProgress[course]);
}

// Update progress UI
function updateProgressUI(completedLessons) {
    const totalLessons = document.querySelectorAll('.lesson-item').length;
    const completedCount = completedLessons ? completedLessons.length : 0;
    
    // Update progress bar
    const progressBar = document.querySelector('.progress');
    if (progressBar) {
        const percentage = (completedCount / totalLessons) * 100;
        progressBar.style.width = `${percentage}%`;
    }
    
    // Update progress text
    const progressText = document.querySelector('.progress-text');
    if (progressText) {
        progressText.textContent = `${completedCount}/${totalLessons} lessons completed`;
    }
    
    // Update lesson items
    const lessonItems = document.querySelectorAll('.lesson-item');
    lessonItems.forEach((item, index) => {
        if (completedLessons && completedLessons.includes(index)) {
            item.classList.add('completed');
        } else {
            item.classList.remove('completed');
        }
    });
}

// Form Submission Handling
document.addEventListener('DOMContentLoaded', () => {
    // Handle subscribe form submission
    const subscribeForms = document.querySelectorAll('.subscribe-form');
    subscribeForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // In a real app, this would send the email to a server
                alert(`Thank you for subscribing with ${email}!`);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    });
});

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation to elements when they come into view
document.addEventListener('DOMContentLoaded', () => {
    // Debounce function to limit scroll event frequency
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    
    const animateOnScroll = debounce(function() {
        const elements = document.querySelectorAll('.category-card, .feature-card, .course-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }, 100); // Only run once every 100ms
    
    // Set initial state for animated elements
    document.querySelectorAll('.category-card, .feature-card, .course-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on scroll and initially
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});

// Utility function to handle inline onclick events using event delegation
function handleInlineClickEvents() {
    // Use event delegation for better performance
    document.addEventListener('click', (e) => {
        const target = e.target;
        
        // Handle next lesson buttons
        if (target.closest('[onclick*="nextLesson()"]') || 
            (target.closest('.lesson-navigation') && target.closest('.btn-primary'))) {
            e.preventDefault();
            if (typeof nextLesson === 'function') {
                nextLesson();
            } else if (typeof courseManager !== 'undefined' && typeof courseManager.nextLesson === 'function') {
                courseManager.nextLesson();
            }
            return;
        }
        
        // Handle previous lesson buttons
        if (target.closest('[onclick*="prevLesson()"]') || 
            (target.closest('.lesson-navigation') && target.closest('.btn-secondary'))) {
            e.preventDefault();
            if (typeof prevLesson === 'function') {
                prevLesson();
            } else if (typeof courseManager !== 'undefined' && typeof courseManager.previousLesson === 'function') {
                courseManager.previousLesson();
            }
            return;
        }
        
        // Handle run code buttons
        const runButton = target.closest('[onclick*="runCode"], [data-run-code]');
        if (runButton) {
            e.preventDefault();
            let lessonId = runButton.getAttribute('data-run-code');
            
            // If no data-run-code, try to extract from onclick attribute
            if (!lessonId) {
                const onclickAttr = runButton.getAttribute('onclick');
                if (onclickAttr) {
                    const match = onclickAttr.match(/runCode\('([^']+)'\\)/);
                    lessonId = match ? match[1] : null;
                }
            }
            
            if (lessonId) {
                if (typeof runCode === 'function') {
                    runCode(lessonId);
                } else if (typeof courseManager !== 'undefined' && typeof courseManager.runCode === 'function') {
                    courseManager.runCode(lessonId);
                }
            }
            return;
        }
        
        // Handle mark complete buttons
        if (target.id === 'mark-complete' || target.closest('#mark-complete')) {
            e.preventDefault();
            if (typeof markCurrentLessonCompleted === 'function') {
                markCurrentLessonCompleted();
            } else if (typeof courseManager !== 'undefined' && typeof courseManager.markLessonComplete === 'function') {
                courseManager.markLessonComplete();
            }
            return;
        }
    });
}

// Initialize event handling on DOM load
document.addEventListener('DOMContentLoaded', () => {
    handleInlineClickEvents();
});
