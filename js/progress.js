// Progress tracking functionality for courses

// Ensure this script runs after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize progress tracking for any course page
    const courseScript = document.querySelector('script[src*="course.js"]');
    if (courseScript) {
        // Get course ID from the current page
        const path = window.location.pathname;
        const fileName = path.substring(path.lastIndexOf('/') + 1);
        const courseId = fileName.replace('.html', '').replace('-quiz', '');
        
        // Initialize progress tracking
        if (typeof initializeProgressTracking === 'function') {
            initializeProgressTracking(courseId);
        }
    }
});

// Get user ID for personalized data storage
function getUserId() {
    // Try to get existing user ID from localStorage first (more reliable)
    let userId = localStorage.getItem('userId');
    
    // If no user ID exists, try to get from cookie
    if (!userId) {
        userId = getCookie('userId');
    }
    
    // If still no user ID exists, create a new one
    if (!userId) {
        userId = 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
        // Store user ID in both localStorage and cookie for compatibility
        localStorage.setItem('userId', userId);
        setCookie('userId', userId, 365);
    }
    
    return userId;
}

// Set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Get a cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Save lesson progress
function saveLessonProgress(course, lessonIndex) {
    try {
        // Validate inputs
        if (!course || lessonIndex === undefined || lessonIndex < 0) {
            console.warn('Invalid course or lesson index for progress saving');
            return;
        }
        
        // Get user ID
        const userId = getUserId();
        
        // Get existing progress or initialize empty array
        const progress = JSON.parse(localStorage.getItem(userId + '_courseProgress')) || {};
        
        // Initialize course progress if not exists
        if (!progress[course]) {
            progress[course] = [];
        }
        
        // Add lesson to completed lessons if not already there
        if (!progress[course].includes(lessonIndex)) {
            progress[course].push(lessonIndex);
            
            // Sort the array to keep it organized
            progress[course].sort((a, b) => a - b);
        }
        
        // Save to localStorage with user ID prefix
        localStorage.setItem(userId + '_courseProgress', JSON.stringify(progress));
        
        // Update UI
        updateProgressUI(course, progress[course]);
        
        // Dispatch a custom event for other parts of the app to listen to
        const progressEvent = new CustomEvent('lessonProgressUpdated', {
            detail: { course, lessonIndex, progress: progress[course] }
        });
        document.dispatchEvent(progressEvent);
    } catch (error) {
        console.error('Error saving lesson progress:', error);
    }
}

// Load lesson progress
function loadLessonProgress(course) {
    // Get user ID
    const userId = getUserId();
    
    const progress = JSON.parse(localStorage.getItem(userId + '_courseProgress')) || {};
    return progress[course] || [];
}

// Update progress UI
function updateProgressUI(course, completedLessons) {
    // Update progress bar
    const progressBar = document.querySelector('.progress');
    const progressText = document.querySelector('.progress-text');
    
    if (progressBar && progressText) {
        // Get total lessons from the course data if available, otherwise count lesson items
        let totalLessons = 0;
        let courseLessonCount = 0;
        
        // Try to get course data to determine actual lesson count
        const courseScript = document.querySelector('script[src*="course.js"]');
        if (typeof courseManager !== 'undefined' && courseManager.lessons) {
            courseLessonCount = courseManager.lessons.length;
        }
        
        // Fallback to counting lesson items
        const lessonItemCount = document.querySelectorAll('.lesson-item').length - 1; // Exclude quiz
        
        // Use course lesson count if available, otherwise use item count
        totalLessons = courseLessonCount > 0 ? courseLessonCount : lessonItemCount;
        const completedCount = completedLessons ? completedLessons.length : 0;
        
        // Calculate percentage
        const percentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
        
        // Update UI
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${completedCount}/${totalLessons} lessons completed`;
    }
    
    // Mark completed lessons in sidebar
    const lessonItems = document.querySelectorAll('.lesson-item');
    lessonItems.forEach((item, index) => {
        // Only mark actual lessons as completed, not the quiz item
        const isQuizItem = index === lessonItems.length - 1;
        if (!isQuizItem && completedLessons && completedLessons.includes(index)) {
            item.classList.add('completed');
        } else if (!isQuizItem) {
            item.classList.remove('completed');
        }
    });
}

// Mark current lesson as completed
function markCurrentLessonCompleted(course, lessonIndex) {
    // If course and lessonIndex are not provided, try to get them from URL and UI
    if (!course || lessonIndex === undefined) {
        // Get current course from URL
        const urlParams = new URLSearchParams(window.location.search);
        course = course || urlParams.get('course') || 'html';
        
        // Get current lesson index (based on active lesson in sidebar)
        const activeLesson = document.querySelector('.lesson-item.active');
        if (activeLesson) {
            const lessonItems = document.querySelectorAll('.lesson-item');
            lessonIndex = lessonIndex !== undefined ? lessonIndex : Array.from(lessonItems).indexOf(activeLesson);
        }
    }
    
    // Save progress
    if (course && lessonIndex !== undefined) {
        saveLessonProgress(course, lessonIndex);
    }
}

// Initialize progress tracking when called by course manager
function initializeProgressTracking(course) {
    // Load and display progress
    const completedLessons = loadLessonProgress(course);
    updateProgressUI(course, completedLessons);
    
    // Add event listener for manual progress marking
    const markCompleteBtn = document.getElementById('mark-complete');
    if (markCompleteBtn) {
        markCompleteBtn.addEventListener('click', () => {
            markCurrentLessonCompleted(course);
        });
    }
}

// Reset progress for a course
function resetCourseProgress(course) {
    // Get user ID
    const userId = getUserId();
    
    const progress = JSON.parse(localStorage.getItem(userId + '_courseProgress')) || {};
    delete progress[course];
    localStorage.setItem(userId + '_courseProgress', JSON.stringify(progress));
    
    // Update UI
    updateProgressUI(course, []);
}

// Get overall progress for all courses
function getOverallProgress() {
    // Get user ID
    const userId = getUserId();
    
    const progress = JSON.parse(localStorage.getItem(userId + '_courseProgress')) || {};
    const courseNames = Object.keys(progress);
    
    let totalLessons = 0;
    let completedLessons = 0;
    
    courseNames.forEach(course => {
        completedLessons += progress[course].length;
        // Estimate total lessons per course (this would need to be more sophisticated in a real app)
        totalLessons += 12; // Assuming 12 lessons per course
    });
    
    return {
        completed: completedLessons,
        total: totalLessons,
        percentage: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0
    };
}

// Get progress for a specific course
function getCourseProgress(course) {
    // Get user ID
    const userId = getUserId();
    
    const progress = JSON.parse(localStorage.getItem(userId + '_courseProgress')) || {};
    const completedLessons = progress[course] || [];
    // Assuming 12 lessons per course
    const totalLessons = 12;
    return totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;
}