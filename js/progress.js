// Progress tracking functionality for courses

// Save lesson progress
function saveLessonProgress(course, lessonIndex) {
    // Get existing progress or initialize empty array
    const progress = JSON.parse(localStorage.getItem('courseProgress')) || {};
    
    // Initialize course progress if not exists
    if (!progress[course]) {
        progress[course] = [];
    }
    
    // Add lesson to completed lessons if not already there
    if (!progress[course].includes(lessonIndex)) {
        progress[course].push(lessonIndex);
    }
    
    // Save to localStorage
    localStorage.setItem('courseProgress', JSON.stringify(progress));
    
    // Update UI
    updateProgressUI(course, progress[course]);
}

// Load lesson progress
function loadLessonProgress(course) {
    const progress = JSON.parse(localStorage.getItem('courseProgress')) || {};
    return progress[course] || [];
}

// Update progress UI
function updateProgressUI(course, completedLessons) {
    // Update progress bar
    const progressBar = document.querySelector('.progress');
    const progressText = document.querySelector('.progress-text');
    
    if (progressBar && progressText) {
        // Count total lessons (excluding quiz which is the last item)
        const totalLessons = document.querySelectorAll('.lesson-item').length - 1;
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
        if (completedLessons && completedLessons.includes(index)) {
            item.classList.add('completed');
        } else {
            item.classList.remove('completed');
        }
    });
}

// Mark current lesson as completed
function markCurrentLessonCompleted() {
    // Get current course from URL
    const urlParams = new URLSearchParams(window.location.search);
    const course = urlParams.get('course') || 'html';
    
    // Get current lesson index (based on active lesson in sidebar)
    const activeLesson = document.querySelector('.lesson-item.active');
    if (activeLesson) {
        const lessonItems = document.querySelectorAll('.lesson-item');
        const lessonIndex = Array.from(lessonItems).indexOf(activeLesson);
        
        // Save progress
        saveLessonProgress(course, lessonIndex);
    }
}

// Initialize progress tracking
document.addEventListener('DOMContentLoaded', () => {
    // Get course from URL
    const urlParams = new URLSearchParams(window.location.search);
    const course = urlParams.get('course') || 'html';
    
    // Load and display progress
    const completedLessons = loadLessonProgress(course);
    updateProgressUI(course, completedLessons);
    
    // Add click event to lesson items
    const lessonItems = document.querySelectorAll('.lesson-item a');
    lessonItems.forEach((item, index) => {
        // Skip the quiz item (last item)
        if (index < lessonItems.length - 1) {
            item.addEventListener('click', () => {
                // Small delay to ensure navigation happens first
                setTimeout(() => {
                    saveLessonProgress(course, index);
                }, 100);
            });
        }
    });
    
    // Add event listener for manual progress marking
    const markCompleteBtn = document.getElementById('mark-complete');
    if (markCompleteBtn) {
        markCompleteBtn.addEventListener('click', markCurrentLessonCompleted);
    }
});

// Reset progress for a course
function resetCourseProgress(course) {
    const progress = JSON.parse(localStorage.getItem('courseProgress')) || {};
    delete progress[course];
    localStorage.setItem('courseProgress', JSON.stringify(progress));
    
    // Update UI
    updateProgressUI(course, []);
}

// Get overall progress for all courses
function getOverallProgress() {
    const progress = JSON.parse(localStorage.getItem('courseProgress')) || {};
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
    const progress = JSON.parse(localStorage.getItem('courseProgress')) || {};
    const completedLessons = progress[course] || [];
    // Assuming 12 lessons per course
    const totalLessons = 12;
    return totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;
}