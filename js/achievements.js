// Achievements system for tracking user progress

// Achievement definitions
const achievements = [
    {
        id: "first_lesson",
        title: "First Steps",
        description: "Complete your first lesson",
        icon: "fas fa-star",
        condition: (progress) => {
            // Check if any course has at least 1 completed lesson
            for (const course in progress) {
                if (progress[course].length >= 1) {
                    return true;
                }
            }
            return false;
        }
    },
    {
        id: "five_lessons",
        title: "Learning Machine",
        description: "Complete 5 lessons",
        icon: "fas fa-graduation-cap",
        condition: (progress) => {
            // Count total completed lessons across all courses
            let totalLessons = 0;
            for (const course in progress) {
                totalLessons += progress[course].length;
            }
            return totalLessons >= 5;
        }
    },
    {
        id: "ten_lessons",
        title: "Knowledge Seeker",
        description: "Complete 10 lessons",
        icon: "fas fa-book",
        condition: (progress) => {
            // Count total completed lessons across all courses
            let totalLessons = 0;
            for (const course in progress) {
                totalLessons += progress[course].length;
            }
            return totalLessons >= 10;
        }
    },
    {
        id: "first_course",
        title: "Course Conqueror",
        description: "Complete your first course",
        icon: "fas fa-trophy",
        condition: (progress) => {
            // Check if any course has at least 12 completed lessons (assuming 12 lessons per course)
            for (const course in progress) {
                if (progress[course].length >= 12) {
                    return true;
                }
            }
            return false;
        }
    },
    {
        id: "quiz_master",
        title: "Quiz Master",
        description: "Score 80% or higher on any quiz",
        icon: "fas fa-brain",
        condition: (quizScores) => {
            // Check if any quiz score is 80% or higher
            for (const quiz in quizScores) {
                const score = quizScores[quiz];
                if (score.percentage >= 80) {
                    return true;
                }
            }
            return false;
        }
    },
    {
        id: "polyglot",
        title: "Polyglot",
        description: "Complete lessons in 3 different courses",
        icon: "fas fa-language",
        condition: (progress) => {
            // Count courses with at least 1 completed lesson
            let courseCount = 0;
            for (const course in progress) {
                if (progress[course].length >= 1) {
                    courseCount++;
                }
            }
            return courseCount >= 3;
        }
    }
];

// Check for unlocked achievements
function checkAchievements() {
    const progress = JSON.parse(localStorage.getItem('courseProgress')) || {};
    const quizScores = JSON.parse(localStorage.getItem('quizScores')) || {};
    
    const unlockedAchievements = [];
    
    achievements.forEach(achievement => {
        if (achievement.condition(progress, quizScores)) {
            // Check if already unlocked
            const unlocked = JSON.parse(localStorage.getItem('unlockedAchievements')) || [];
            if (!unlocked.includes(achievement.id)) {
                unlockedAchievements.push(achievement);
                unlocked.push(achievement.id);
                localStorage.setItem('unlockedAchievements', JSON.stringify(unlocked));
            }
        }
    });
    
    // Show notifications for newly unlocked achievements
    unlockedAchievements.forEach(achievement => {
        showAchievementNotification(achievement);
    });
    
    return unlockedAchievements;
}

// Show achievement notification
function showAchievementNotification(achievement) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-icon">
            <i class="${achievement.icon}"></i>
        </div>
        <div class="achievement-content">
            <h4>Achievement Unlocked!</h4>
            <h3>${achievement.title}</h3>
            <p>${achievement.description}</p>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 5000);
}

// Get all unlocked achievements
function getUnlockedAchievements() {
    const unlocked = JSON.parse(localStorage.getItem('unlockedAchievements')) || [];
    return achievements.filter(achievement => unlocked.includes(achievement.id));
}

// Get achievement by ID
function getAchievementById(id) {
    return achievements.find(achievement => achievement.id === id);
}

// Initialize achievements system
document.addEventListener('DOMContentLoaded', () => {
    // Check for new achievements
    checkAchievements();
    
    // Set up periodic checks
    setInterval(checkAchievements, 30000); // Check every 30 seconds
});

// Add achievement styles
const achievementStyles = `
    .achievement-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        z-index: 10000;
        animation: slideIn 0.5s ease-out;
        max-width: 300px;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .fade-out {
        animation: fadeOut 0.5s ease-out forwards;
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .achievement-icon {
        font-size: 24px;
        margin-right: 15px;
    }
    
    .achievement-content h4 {
        margin: 0 0 5px 0;
        font-size: 14px;
        opacity: 0.9;
    }
    
    .achievement-content h3 {
        margin: 0 0 5px 0;
        font-size: 18px;
    }
    
    .achievement-content p {
        margin: 0;
        font-size: 14px;
        opacity: 0.8;
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = achievementStyles;
document.head.appendChild(styleSheet);

// Export functions
window.Achievements = {
    checkAchievements,
    getUnlockedAchievements,
    getAchievementById
};