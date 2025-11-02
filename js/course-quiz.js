// course-quiz.js - Course-specific quiz functionality

class CourseQuiz {
    constructor() {
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.shuffledQuestions = [];
        this.courseId = this.getCourseId();
        this.questions = [];
        this.init();
    }

    init() {
        // Wait for DOM to be loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeQuiz());
        } else {
            this.initializeQuiz();
        }
    }

    getCourseId() {
        // Extract course ID from the current page URL
        const path = window.location.pathname;
        const fileName = path.substring(path.lastIndexOf('/') + 1);
        return fileName.replace('-quiz.html', '');
    }

    async initializeQuiz() {
        try {
            // Load course-specific quiz data
            await this.loadQuizData();
            
            // Initialize UI components
            this.initializeUI();
            
            // Show first question
            this.showQuestion(0);
            
            // Set up event listeners
            this.setupEventListeners();
        } catch (error) {
            console.error('Error initializing quiz:', error);
        }
    }

    async loadQuizData() {
        try {
            // Try to load course-specific quiz data
            const response = await fetch(`../data/${this.courseId}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const courseData = await response.json();
            
            // Use course-specific quiz questions if available
            if (courseData.quiz && courseData.quiz.questions) {
                this.questions = courseData.quiz.questions.map(q => ({
                    question: q.question,
                    options: q.options,
                    correctAnswer: q.correct
                }));
            } else {
                // Fallback to general quiz questions for this course
                const quizData = await this.loadCourseQuizData();
                this.questions = quizData[this.courseId] || [];
            }
        } catch (error) {
            console.error('Error loading quiz data:', error);
            // Fallback to general quiz questions
            this.questions = this.getFallbackQuestions();
        }
        
        // Initialize user answers array
        this.userAnswers = Array(this.questions.length).fill(null);
    }

    async loadCourseQuizData() {
        // This would load course-specific quiz data if we had separate files
        // For now, we'll use the courseQuizzes object from the existing quiz.js
        return typeof courseQuizzes !== 'undefined' ? courseQuizzes : {};
    }

    getFallbackQuestions() {
        // Provide fallback questions based on course ID
        const fallbackQuizzes = {
            html: [
                {
                    question: "What does HTML stand for?",
                    options: [
                        "Hyper Text Markup Language",
                        "High Tech Modern Language",
                        "Home Tool Markup Language",
                        "Hyperlink and Text Markup Language"
                    ],
                    correctAnswer: 0
                },
                {
                    question: "Which HTML tag is used to define an internal style sheet?",
                    options: [
                        "<script>",
                        "<style>",
                        "<css>",
                        "<link>"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Which HTML attribute is used to define inline styles?",
                    options: [
                        "class",
                        "styles",
                        "style",
                        "font"
                    ],
                    correctAnswer: 2
                }
            ],
            css: [
                {
                    question: "What does CSS stand for?",
                    options: [
                        "Computer Style Sheets",
                        "Creative Style Sheets",
                        "Cascading Style Sheets",
                        "Colorful Style Sheets"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "Which property is used to change the background color in CSS?",
                    options: [
                        "color",
                        "bgcolor",
                        "background-color",
                        "backgroundColor"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "How do you select an element with id 'demo' in CSS?",
                    options: [
                        ".demo",
                        "#demo",
                        "*demo",
                        "demo"
                    ],
                    correctAnswer: 1
                }
            ],
            javascript: [
                {
                    question: "How do you declare a variable in JavaScript?",
                    options: [
                        "var myVariable;",
                        "variable myVariable;",
                        "v myVariable;",
                        "declare myVariable;"
                    ],
                    correctAnswer: 0
                },
                {
                    question: "Which JavaScript operator is used to assign a value to a variable?",
                    options: [
                        "*",
                        "-",
                        "=",
                        "x"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "Which event occurs when the user clicks on an HTML element?",
                    options: [
                        "onchange",
                        "onmouseclick",
                        "onmouseover",
                        "onclick"
                    ],
                    correctAnswer: 3
                }
            ],
            python: [
                {
                    question: "Which keyword is used to define a function in Python?",
                    options: [
                        "function",
                        "def",
                        "fun",
                        "define"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Which data type is mutable in Python?",
                    options: [
                        "Tuple",
                        "String",
                        "List",
                        "Integer"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "How do you start a comment in Python?",
                    options: [
                        "//",
                        "/*",
                        "#",
                        "<!--"
                    ],
                    correctAnswer: 2
                }
            ]
        };
        
        return fallbackQuizzes[this.courseId] || [];
    }

    initializeUI() {
        // Update total questions count
        const totalQuestionsEl = document.getElementById('total-questions');
        if (totalQuestionsEl) {
            totalQuestionsEl.textContent = this.questions.length;
        }
    }

    setupEventListeners() {
        // Navigation buttons
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const submitBtn = document.getElementById('submit-btn');
        const restartQuizBtn = document.getElementById('restart-quiz');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousQuestion());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }
        
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitQuiz());
        }
        
        if (restartQuizBtn) {
            restartQuizBtn.addEventListener('click', () => this.restartQuiz());
        }
    }

    showQuestion(index) {
        // Validate index
        if (index < 0 || index >= this.questions.length) return;
        
        // Update current question
        this.currentQuestionIndex = index;
        
        // Update UI to show current question
        this.updateQuestionDisplay();
        
        // Update navigation buttons
        this.updateNavigationButtons();
    }

    updateQuestionDisplay() {
        const question = this.questions[this.currentQuestionIndex];
        if (!question) return;
        
        // Update question text
        const questionTextEl = document.getElementById('question-text');
        if (questionTextEl) {
            questionTextEl.textContent = question.question;
        }
        
        // Update current question number
        const currentQuestionEl = document.getElementById('current-question');
        if (currentQuestionEl) {
            currentQuestionEl.textContent = this.currentQuestionIndex + 1;
        }
        
        // Update progress bar
        const quizProgressEl = document.getElementById('quiz-progress');
        if (quizProgressEl) {
            const percentage = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
            quizProgressEl.style.width = `${percentage}%`;
        }
        
        // Update options
        const optionsContainer = document.getElementById('options-container');
        if (optionsContainer) {
            // Clear previous options
            optionsContainer.innerHTML = '';
            
            // Add new options
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.classList.add('option');
                optionElement.dataset.optionIndex = index;
                optionElement.innerHTML = `
                    <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                    <span class="option-text">${option}</span>
                `;
                
                // Add click event
                optionElement.addEventListener('click', () => this.selectOption(index));
                
                // Mark as selected if previously selected
                if (this.userAnswers[this.currentQuestionIndex] === index) {
                    optionElement.classList.add('selected');
                }
                
                optionsContainer.appendChild(optionElement);
            });
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const submitBtn = document.getElementById('submit-btn');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentQuestionIndex === 0;
        }
        
        if (nextBtn) {
            nextBtn.style.display = this.currentQuestionIndex === this.questions.length - 1 ? 'none' : 'block';
        }
        
        if (submitBtn) {
            submitBtn.style.display = this.currentQuestionIndex === this.questions.length - 1 ? 'block' : 'none';
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.showQuestion(this.currentQuestionIndex + 1);
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.showQuestion(this.currentQuestionIndex - 1);
        }
    }

    selectOption(optionIndex) {
        // Update user answers array
        this.userAnswers[this.currentQuestionIndex] = optionIndex;
        
        // Update UI - remove selected class from all options in current question
        const optionsContainer = document.getElementById('options-container');
        if (optionsContainer) {
            optionsContainer.querySelectorAll('.option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            const selectedOption = optionsContainer.querySelector(`.option[data-option-index="${optionIndex}"]`);
            if (selectedOption) {
                selectedOption.classList.add('selected');
            }
        }
    }

    submitQuiz() {
        // Validate that all questions have been answered
        const unansweredQuestions = this.userAnswers.filter(answer => answer === null).length;
        if (unansweredQuestions > 0) {
            if (!confirm(`You have ${unansweredQuestions} unanswered questions. Are you sure you want to submit?`)) {
                return;
            }
        }
        
        // Calculate score
        this.score = 0;
        this.questions.forEach((question, index) => {
            if (this.userAnswers[index] === question.correctAnswer) {
                this.score++;
            }
        });
        
        // Calculate statistics
        const correctAnswers = this.score;
        const wrongAnswers = this.questions.length - this.score - this.userAnswers.filter(a => a === null).length;
        const unanswered = this.userAnswers.filter(a => a === null).length;
        
        // Save quiz score
        this.saveQuizScore(this.score, this.questions.length);
        
        // Update result UI
        const scoreEl = document.getElementById('score');
        const scoreTextEl = document.getElementById('score-text');
        const correctAnswersEl = document.getElementById('correct-answers');
        const wrongAnswersEl = document.getElementById('wrong-answers');
        const unansweredEl = document.getElementById('unanswered');
        
        if (scoreEl) scoreEl.textContent = this.score;
        if (scoreEl) scoreEl.textContent = this.score;
        if (scoreTextEl) scoreTextEl.textContent = `You scored ${this.score} out of ${this.questions.length}`;
        if (correctAnswersEl) correctAnswersEl.textContent = correctAnswers;
        if (wrongAnswersEl) wrongAnswersEl.textContent = wrongAnswers;
        if (unansweredEl) unansweredEl.textContent = unanswered;
        
        // Update the score total display
        const scoreTotalEl = document.querySelector('.score-total');
        if (scoreTotalEl) scoreTotalEl.textContent = `/ ${this.questions.length}`;
        
        // Show result, hide quiz
        const quizContainer = document.getElementById('quiz-container');
        const quizResult = document.getElementById('quiz-result');
        
        if (quizContainer) quizContainer.style.display = 'none';
        if (quizResult) quizResult.style.display = 'block';
    }

    getUserId() {
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

    saveQuizScore(score, total) {
        // Get user ID
        const userId = this.getUserId();
        
        // Get existing quiz scores or initialize empty object
        const quizScores = JSON.parse(localStorage.getItem(`${userId}_quizScores`)) || {};
        
        // Save score with timestamp
        const quizId = `${this.courseId}_quiz_${Date.now()}`;
        quizScores[quizId] = {
            courseId: this.courseId,
            score: score,
            total: total,
            percentage: Math.round((score / total) * 100),
            timestamp: new Date().toISOString()
        };
        
        // Save to localStorage with user ID prefix
        localStorage.setItem(`${userId}_quizScores`, JSON.stringify(quizScores));
        
        // Also save to course progress
        this.saveCourseProgress(score, total);
    }

    saveCourseProgress(score, total) {
        // Get user ID
        const userId = this.getUserId();
        
        // Get existing progress or initialize empty object
        const progress = JSON.parse(localStorage.getItem(`${userId}_courseProgress`)) || {};
        
        // Initialize course progress if not exists
        if (!progress[this.courseId]) {
            progress[this.courseId] = [];
        }
        
        // Add quiz completion marker (use a special identifier to indicate quiz completion)
        const quizCompletionMarker = 'quiz_completed';
        if (!progress[this.courseId].includes(quizCompletionMarker)) {
            progress[this.courseId].push(quizCompletionMarker);
        }
        
        // Save to localStorage with user ID prefix
        localStorage.setItem(`${userId}_courseProgress`, JSON.stringify(progress));
    }

    restartQuiz() {
        // Reset state
        this.currentQuestionIndex = 0;
        this.userAnswers = Array(this.questions.length).fill(null);
        this.score = 0;
        
        // Hide result, show quiz
        const quizResult = document.getElementById('quiz-result');
        const quizContainer = document.getElementById('quiz-container');
        
        if (quizResult) quizResult.style.display = 'none';
        if (quizContainer) quizContainer.style.display = 'block';
        
        // Load first question
        this.showQuestion(0);
    }
}

// Initialize course quiz when the script loads
var courseQuiz = new CourseQuiz();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CourseQuiz;
}