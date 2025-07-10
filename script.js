// Quiz questions data
const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: 2
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: 3
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hypertext Markup Language",
            "Hypertext Markdown Language",
            "Hyperloop Machine Language",
            "Helicopters Terminals Motorboats Lamborginis"
        ],
        answer: 0
    },
    {
        question: "Which year was JavaScript launched?",
        options: ["1996", "1995", "1994", "1997"],
        answer: 1
    }
];

// DOM elements
const loginForm = document.getElementById('loginform');
const studentDetails = document.getElementById('student-details');
const quizContainer = document.getElementById('quiz-container');
const questionsContainer = document.getElementById('questions');
const submitDetailsBtn = document.getElementById('submit-details');
const submitQuizBtn = document.getElementById('submit-quiz');
const resultsContainer = document.getElementById('results');

// Initially hide student details and quiz container
studentDetails.style.display = 'none';
quizContainer.style.display = 'none';

// Handle login form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple validation (hardcoded for example)
    if (username === 'admin' && password === 'password') {
        loginForm.style.display = 'none';
        studentDetails.style.display = 'block';
    } else {
        alert('Invalid credentials! Try admin/password');
    }
});

// Handle student details submission
submitDetailsBtn.addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const rollno = document.getElementById('rollno').value;
    const cls = document.getElementById('class').value;
    const section = document.getElementById('section').value;
    
    if (name && rollno && cls && section) {
        studentDetails.style.display = 'none';
        quizContainer.style.display = 'block';
        loadQuiz();
    } else {
        alert('Please fill all student details.');
    }
});

// Load quiz questions
function loadQuiz() {
    questionsContainer.innerHTML = '';
    
    quizQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-container';
        questionDiv.innerHTML = `
            <div class="question">Q${index + 1}. ${q.question}</div>
            <div class="options">
                ${q.options.map((option, i) => `
                    <label>
                        <input type="radio" name="q${index}" value="${i}">
                        ${option}
                    </label>
                `).join('')}
            </div>
        `;
        questionsContainer.appendChild(questionDiv);
    });
}

// Handle quiz submission
submitQuizBtn.addEventListener('click', function() {
    let score = 0;
    const answerInputs = document.querySelectorAll('input[type="radio"]:checked');
    
    // Check if all questions are answered
    if (answerInputs.length < quizQuestions.length) {
        alert('Please answer all questions.');
        return;
    }
    
    quizQuestions.forEach((q, index) => {
        const selectedOption = Array.from(answerInputs).find(input => 
            input.name === `q${index}`
        );
        
        if (selectedOption && parseInt(selectedOption.value) === q.answer) {
            score++;
        }
    });
    
    showResults(score);
});

// Show quiz results
function showResults(score) {
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    resultsContainer.innerHTML = `
        <h2>Quiz Results</h2>
        <p>Your score: ${score} out of ${quizQuestions.length}</p>
        <p>Percentage: ${Math.round((score / quizQuestions.length) * 100)}%</p>
    `;
}