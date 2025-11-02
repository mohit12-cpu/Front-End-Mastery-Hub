// Quiz Questions Data
// This will be populated based on the current course
let currentQuizQuestions = [];

// General quiz questions (fallback)
const generalQuizQuestions = [
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
        question: "Which HTML attribute is used to define inline styles?",
        options: [
            "class",
            "styles",
            "style",
            "font"
        ],
        correctAnswer: 2
    },
    {
        question: "What is the correct HTML element for the largest heading?",
        options: [
            "<h6>",
            "<heading>",
            "<h1>",
            "<head>"
        ],
        correctAnswer: 2
    },
    {
        question: "Which HTML element is used to specify a footer for a document or section?",
        options: [
            "<bottom>",
            "<footer>",
            "<section>",
            "<aside>"
        ],
        correctAnswer: 1
    },
    {
        question: "In CSS, what does the 'box-sizing: border-box;' property do?",
        options: [
            "Adds a border around the element",
            "Includes padding and border in the element's total width and height",
            "Creates a box shadow around the element",
            "Changes the box model to border-box"
        ],
        correctAnswer: 1
    },
    {
        question: "Which JavaScript method is used to write HTML output?",
        options: [
            "document.write()",
            "innerHTML()",
            "document.log()",
            "document.output()"
        ],
        correctAnswer: 0
    },
    {
        question: "What is the correct syntax for referring to an external script called 'script.js'?",
        options: [
            "<script src='script.js'>",
            "<script href='script.js'>",
            "<script name='script.js'>",
            "<script file='script.js'>"
        ],
        correctAnswer: 0
    },
    {
        question: "What is the purpose of the <meta> tag in HTML?",
        options: [
            "To create metadata about the HTML document",
            "To display text on the page",
            "To create a new section",
            "To add images to the page"
        ],
        correctAnswer: 0
    },
    {
        question: "Which CSS property is used to control the text size?",
        options: [
            "font-size",
            "text-size",
            "font-style",
            "text-style"
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
        question: "Which HTML attribute specifies an alternate text for an image?",
        options: [
            "alt",
            "title",
            "src",
            "href"
        ],
        correctAnswer: 0
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
    },
    {
        question: "How do you round the number 7.25 to the nearest integer in JavaScript?",
        options: [
            "rnd(7.25)",
            "Math.round(7.25)",
            "round(7.25)",
            "Math.rnd(7.25)"
        ],
        correctAnswer: 1
    },
    {
        question: "Which HTML element is used to define important text?",
        options: [
            "<strong>",
            "<b>",
            "<important>",
            "<i>"
        ],
        correctAnswer: 0
    },
    {
        question: "Which property is used to change the font of an element in CSS?",
        options: [
            "font-family",
            "font-weight",
            "font-style",
            "font-size"
        ],
        correctAnswer: 0
    }
];

// Course-specific quiz questions
const courseQuizzes = {
    html: [
        {
            question: "What is the correct HTML element for inserting a line break?",
            options: [
                "<lb>",
                "<break>",
                "<br>",
                "<newline>"
            ],
            correctAnswer: 2
        },
        {
            question: "Which HTML attribute is used to provide alternative text for images?",
            options: [
                "title",
                "alt",
                "src",
                "href"
            ],
            correctAnswer: 1
        },
        {
            question: "What is the correct HTML for adding a background color?",
            options: [
                "<body bg='yellow'>",
                "<background>yellow</background>",
                "<body style='background-color:yellow;'>",
                "<body background='yellow'>"
            ],
            correctAnswer: 2
        }
    ],
    css: [
        {
            question: "Which CSS property controls the text size?",
            options: [
                "font-size",
                "text-size",
                "font-style",
                "text-style"
            ],
            correctAnswer: 0
        },
        {
            question: "How do you make each word in a text start with a capital letter?",
            options: [
                "text-transform:capitalize",
                "text-transform:uppercase",
                "text-style:capital",
                "transform:capitalize"
            ],
            correctAnswer: 0
        },
        {
            question: "Which property is used to change the left margin of an element?",
            options: [
                "indent",
                "margin-left",
                "padding-left",
                "margin"
            ],
            correctAnswer: 1
        }
    ],
    javascript: [
        {
            question: "Inside which HTML element do we put the JavaScript?",
            options: [
                "<scripting>",
                "<js>",
                "<script>",
                "<javascript>"
            ],
            correctAnswer: 2
        },
        {
            question: "How do you write 'Hello World' in an alert box?",
            options: [
                "msg('Hello World');",
                "alertBox('Hello World');",
                "msgBox('Hello World');",
                "alert('Hello World');"
            ],
            correctAnswer: 3
        },
        {
            question: "How do you create a function in JavaScript?",
            options: [
                "function myFunction()",
                "function:myFunction()",
                "function = myFunction()",
                "create myFunction()"
            ],
            correctAnswer: 0
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
    ],
    react: [
        {
            question: "What is React?",
            options: [
                "A JavaScript library for building user interfaces",
                "A CSS framework",
                "A backend framework",
                "A database management system"
            ],
            correctAnswer: 0
        },
        {
            question: "What is JSX?",
            options: [
                "A JavaScript extension that allows HTML-like syntax",
                "A new programming language",
                "A CSS preprocessor",
                "A testing framework"
            ],
            correctAnswer: 0
        },
        {
            question: "What hook is used to manage state in functional components?",
            options: [
                "useState",
                "useEffect",
                "useContext",
                "useReducer"
            ],
            correctAnswer: 0
        }
    ],
    git: [
        {
            question: "What is Git?",
            options: [
                "A programming language",
                "A version control system",
                "A database management system",
                "A web framework"
            ],
            correctAnswer: 1
        },
        {
            question: "Which command initializes a Git repository?",
            options: [
                "git start",
                "git init",
                "git create",
                "git new"
            ],
            correctAnswer: 1
        },
        {
            question: "Which command is used to stage files for commit?",
            options: [
                "git stage",
                "git add",
                "git commit",
                "git push"
            ],
            correctAnswer: 1
        }
    ],
    bootstrap: [
        {
            question: "What is Bootstrap?",
            options: [
                "A programming language",
                "A CSS framework",
                "A JavaScript library",
                "A database system"
            ],
            correctAnswer: 1
        },
        {
            question: "Which class is used to create a responsive grid layout in Bootstrap?",
            options: [
                ".grid",
                ".container",
                ".row",
                ".flex"
            ],
            correctAnswer: 2
        },
        {
            question: "How do you make a button look like a primary button in Bootstrap?",
            options: [
                ".btn",
                ".btn-primary",
                ".button-primary",
                ".primary-btn"
            ],
            correctAnswer: 1
        }
    ],
    webdesign: [
        {
            question: "What are the key principles of web design?",
            options: [
                "Balance, Visual Hierarchy, Consistency, Usability",
                "Colors, Fonts, Images, Animations",
                "HTML, CSS, JavaScript, Bootstrap",
                "Servers, Databases, APIs, Security"
            ],
            correctAnswer: 0
        },
        {
            question: "What is the recommended line height for body text?",
            options: [
                "1.4-1.6 times the font size",
                "Exactly the font size",
                "2 times the font size",
                "0.8 times the font size"
            ],
            correctAnswer: 0
        },
        {
            question: "What is white space in web design?",
            options: [
                "The unmarked area between design elements",
                "Blank pages in a website",
                "White background color",
                "Empty HTML tags"
            ],
            correctAnswer: 0
        }
    ]
};

// Quiz State
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let shuffledQuestions = [];

// Get user ID for personalized data storage
function getUserId() {
    // Try to get existing user ID from cookie
    let userId = getCookie('userId');
    
    // If no user ID exists, create a new one
    if (!userId) {
        userId = 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
        // Store user ID in cookie for 365 days
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

// Initialize Quiz
function initializeQuiz() {
    // Determine the current course from URL or default to general
    const urlParams = new URLSearchParams(window.location.search);
    const course = urlParams.get('course') || 'general';
    
    // Select appropriate questions based on course
    let availableQuestions = [];
    if (course !== 'general' && courseQuizzes[course]) {
        availableQuestions = courseQuizzes[course];
    } else {
        availableQuestions = generalQuizQuestions;
    }
    
    // Limit to a reasonable number of questions (e.g., 10) for better user experience
    const maxQuestions = Math.min(10, availableQuestions.length);
    
    // Randomly select questions if we have more than the max
    if (availableQuestions.length > maxQuestions) {
        // Create a copy and shuffle
        const shuffledAvailable = shuffleArray([...availableQuestions]);
        currentQuizQuestions = shuffledAvailable.slice(0, maxQuestions);
    } else {
        currentQuizQuestions = [...availableQuestions];
    }
    
    // Initialize user answers array
    userAnswers = Array(currentQuizQuestions.length).fill(null);
    
    // Shuffle questions
    shuffledQuestions = shuffleArray(currentQuizQuestions);
    
    // Get DOM elements
    const totalQuestionsEl = document.getElementById('total-questions');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const restartQuizBtn = document.getElementById('restart-quiz');
    
    // Update UI
    if (totalQuestionsEl) {
        totalQuestionsEl.textContent = shuffledQuestions.length;
    }
    
    // Load first question
    loadQuestion();
    
    // Set up event listeners if elements exist
    if (prevBtn) prevBtn.addEventListener('click', goToPreviousQuestion);
    if (nextBtn) nextBtn.addEventListener('click', goToNextQuestion);
    if (submitBtn) submitBtn.addEventListener('click', submitQuiz);
    if (restartQuizBtn) restartQuizBtn.addEventListener('click', restartQuiz);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeQuiz);

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeQuiz,
        loadQuestion,
        selectOption,
        goToPreviousQuestion,
        goToNextQuestion,
        submitQuiz,
        restartQuiz,
        shuffleArray
    };
}

// Load Question
function loadQuestion() {
    // Make sure we have DOM elements
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const currentQuestionEl = document.getElementById('current-question');
    const quizProgress = document.getElementById('quiz-progress');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    if (!questionText || !optionsContainer) return;
    
    const question = shuffledQuestions[currentQuestionIndex];
    
    // Update UI
    questionText.textContent = question.question;
    if (currentQuestionEl) currentQuestionEl.textContent = currentQuestionIndex + 1;
    if (quizProgress) quizProgress.style.width = `${((currentQuestionIndex + 1) / shuffledQuestions.length) * 100}%`;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create options array with indices for shuffling
    const optionsWithIndices = question.options.map((option, index) => ({
        option,
        index,
        letter: String.fromCharCode(65 + index)
    }));
    
    // Shuffle options
    const shuffledOptions = shuffleArray(optionsWithIndices);
    
    // Add new options
    shuffledOptions.forEach((optionData, displayIndex) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.dataset.option = optionData.letter; // A, B, C, D
        
        optionElement.innerHTML = `
            <span class="option-letter">${optionData.letter}</span>
            <span class="option-text">${optionData.option}</span>
        `;
        
        // Add click event
        optionElement.addEventListener('click', () => selectOption(optionData.index));
        
        // Mark as selected if previously selected
        if (userAnswers[currentQuestionIndex] === optionData.index) {
            optionElement.classList.add('selected');
        }
        
        optionsContainer.appendChild(optionElement);
    });
    
    // Update button states
    if (prevBtn) prevBtn.disabled = currentQuestionIndex === 0;
    
    if (nextBtn && submitBtn) {
        if (currentQuestionIndex === shuffledQuestions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }
}

// Select Option
function selectOption(optionIndex) {
    // Update user answers array
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Update UI - remove selected class from all options
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    const selectedOption = document.querySelector(`.option[data-option="${String.fromCharCode(65 + optionIndex)}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }
}

// Go to Previous Question
function goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

// Go to Next Question
function goToNextQuestion() {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

// Submit Quiz
function submitQuiz() {
    // Calculate score
    score = 0;
    shuffledQuestions.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
            score++;
        }
    });
    
    // Calculate statistics
    const correctAnswers = score;
    const wrongAnswers = shuffledQuestions.length - score - userAnswers.filter(a => a === null).length;
    const unanswered = userAnswers.filter(a => a === null).length;
    
    // Save quiz score
    saveQuizScore(score, shuffledQuestions.length);
    
    // Get DOM elements
    const scoreEl = document.getElementById('score');
    const scoreText = document.getElementById('score-text');
    const correctAnswersEl = document.getElementById('correct-answers');
    const wrongAnswersEl = document.getElementById('wrong-answers');
    const unansweredEl = document.getElementById('unanswered');
    const quizResult = document.getElementById('quiz-result');
    
    // Update result UI
    if (scoreEl) scoreEl.textContent = score;
    if (scoreText) scoreText.textContent = `You scored ${score} out of ${shuffledQuestions.length}`;
    if (correctAnswersEl) correctAnswersEl.textContent = correctAnswers;
    if (wrongAnswersEl) wrongAnswersEl.textContent = wrongAnswers;
    if (unansweredEl) unansweredEl.textContent = unanswered;
    
    // Show result, hide quiz
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) quizContainer.style.display = 'none';
    if (quizResult) quizResult.style.display = 'block';
}

// Save quiz score
function saveQuizScore(score, total) {
    // Get user ID
    const userId = getUserId();
    
    // Get existing quiz scores or initialize empty object
    const quizScores = JSON.parse(localStorage.getItem(userId + '_quizScores')) || {};
    
    // Save score with timestamp
    const quizId = 'general_quiz_' + Date.now();
    quizScores[quizId] = {
        score: score,
        total: total,
        percentage: Math.round((score / total) * 100),
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage with user ID prefix
    localStorage.setItem(userId + '_quizScores', JSON.stringify(quizScores));
    
    // Check for achievements
    if (typeof Achievements !== 'undefined' && typeof Achievements.checkAchievements === 'function') {
        setTimeout(() => {
            Achievements.checkAchievements();
        }, 1000);
    }
}

// Utility function to shuffle an array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Restart Quiz
function restartQuiz() {
    // Reset state
    currentQuestionIndex = 0;
    userAnswers = Array(shuffledQuestions.length).fill(null);
    score = 0;
    
    // Shuffle questions again
    shuffledQuestions = shuffleArray(currentQuizQuestions);
    
    // Hide result, show quiz
    const quizResult = document.getElementById('quiz-result');
    const quizContainer = document.getElementById('quiz-container');
    if (quizResult) quizResult.style.display = 'none';
    if (quizContainer) quizContainer.style.display = 'block';
    
    // Load first question
    loadQuestion();
}