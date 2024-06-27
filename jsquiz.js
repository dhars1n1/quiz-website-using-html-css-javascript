let questions = [
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        options: ["<script href='xxx.js'>", "<script name='xxx.js'>", "<script src='xxx.js'>", "<script file='xxx.js'>"],
        correct: 2,
        hint: "It's an attribute that specifies the URL of an external script file."
    },
    {
        question: "How do you create a function in JavaScript?",
        options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "create function myFunction()"],
        correct: 0,
        hint: "Use the function keyword followed by the function name."
    },
    {
        question: "How do you call a function named 'myFunction'?",
        options: ["call myFunction()", "call function myFunction()", "myFunction()", "execute myFunction()"],
        correct: 2,
        hint: "Use the function name followed by parentheses."
    },
    {
        question: "How do you write a conditional statement for executing some code if 'i' is equal to 5?",
        options: ["if i = 5 then", "if (i == 5)", "if i == 5 then", "if (i = 5)"],
        correct: 1,
        hint: "Use double equal signs to compare values."
    },
    {
        question: "How does a 'while' loop start?",
        options: ["while (i <= 10)", "while i = 1 to 10", "while (i <= 10; i++)", "while (i < 10)"],
        correct: 0,
        hint: "It's a control flow statement that allows code to be executed repeatedly based on a given condition."
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        options: ["var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')", "var colors = 'red', 'green', 'blue'", "var colors = ['red', 'green', 'blue']", "var colors = (1:'red', 2:'green', 3:'blue')"],
        correct: 2,
        hint: "Arrays are defined with square brackets."
    },
    {
        question: "How do you find the number with the highest value of x and y?",
        options: ["Math.max(x, y)", "Math.ceil(x, y)", "top(x, y)", "ceil(x, y)"],
        correct: 0,
        hint: "Use the Math object."
    },
    {
        question: "What is the correct JavaScript syntax for opening a new window called 'w2'?",
        options: ["w2 = window.open('http://www.example.com');", "w2 = window.new('http://www.example.com');", "w2 = window.create('http://www.example.com');", "w2 = window.opener('http://www.example.com');"],
        correct: 0,
        hint: "Use the window object method that opens a new window."
    },
    {
        question: "How do you round the number 7.25 to the nearest integer?",
        options: ["Math.round(7.25)", "Math.rnd(7.25)", "Math.rounding(7.25)", "Math.roundToInt(7.25)"],
        correct: 0,
        hint: "Use the Math object method that rounds a number to the nearest integer."
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        options: ["onchange", "onclick", "onmouseclick", "onmouseover"],
        correct: 1,
        hint: "It's an event triggered by a mouse click."
    }
];

let goldCoins = 0;
let timeLeft = 120; // 2 minutes
let attempts = Array(questions.length).fill(false);
let hintUsed = Array(questions.length).fill(false);
let totalAttempts = 0;
let totalCorrect = 0;
let userAnswers = Array(questions.length).fill(null);

function startQuiz() {
    document.getElementById('start-quiz').style.display = 'none';
    document.getElementById('shelf').style.pointerEvents = 'auto';
    document.getElementById('timer').style.display = 'block';
    startTimer();
}

function openQuestion(index) {
    if (attempts[index]) return;

    let question = questions[index];
    document.getElementById('question-text').innerText = question.question;
    let optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    question.options.forEach((option, i) => {
        let optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.innerText = option;
        optionDiv.onclick = () => checkAnswer(index, i);
        optionsDiv.appendChild(optionDiv);
    });

    let hintButton = document.getElementById('hint');
    let hintText = document.getElementById('hint-text');
    hintText.style.display = 'none'; // Hide hint text initially

    if (hintUsed[index]) {
        hintButton.style.display = 'none';
    } else {
        hintButton.style.display = 'block';
        hintButton.onclick = () => useHint(index);
    }

    document.getElementById('question-modal').style.display = 'block';
}

function closeQuestion() {
    document.getElementById('question-modal').style.display = 'none';
}

function useHint(index) {
    if (goldCoins > 0) {
        goldCoins--;
        hintUsed[index] = true;
        document.getElementById('gold-coins').innerText = `Gold Coins: ${goldCoins}`;
        document.getElementById('hint').style.display = 'none';
        document.getElementById('hint-text').innerText = questions[index].hint;
        document.getElementById('hint-text').style.display = 'block'; // Display hint text
    } else {
        document.getElementById('hint-text').innerText = "Not enough gold coins for a hint!";
        document.getElementById('hint-text').style.display = 'block'; // Display hint text
    }
}

function checkAnswer(questionIndex, answerIndex) {
    if (attempts[questionIndex]) return;

    attempts[questionIndex] = true;
    userAnswers[questionIndex] = answerIndex;
    totalAttempts++;
    let box = document.getElementById(`box-${questionIndex}`);

    if (questions[questionIndex].correct === answerIndex) {
        goldCoins += hintUsed[questionIndex] ? 3 : 5;
        animateCoins(hintUsed[questionIndex] ? 3 : 5, true);
        box.classList.add('completed'); // Change to green

        // Increment totalCorrect if the answer is correct
        totalCorrect++;
    } else {
        goldCoins -= hintUsed[questionIndex] ? 2 : 1;
        animateCoins(hintUsed[questionIndex] ? 2 : 1, false);
        box.classList.add('exhausted'); // Change to red
    }
    box.onclick = null;

    document.getElementById('gold-coins').innerText = `Gold Coins: ${goldCoins}`;

    if (totalAttempts === questions.length || timeLeft <= 0) {
        setTimeout(showSummary, 500); // Show summary after a short delay
    }

    closeQuestion();
}

function showSummary() {
    let summaryList = document.getElementById('summary-list');
    summaryList.innerHTML = '';
    questions.forEach((question, index) => {
        let questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<strong>Question ${index + 1}:</strong> ${question.question}`;

        let userAnswer = userAnswers[index];
        let userAnswerText = userAnswer !== null ? question.options[userAnswer] : 'Not Attempted';
        let resultDiv = document.createElement('div');
        resultDiv.innerHTML = `Your Answer: ${userAnswerText}, `;
        resultDiv.innerHTML += userAnswer === question.correct ? 'Correct!' : 'Incorrect!';
        
        let answerDiv = document.createElement('div');
        answerDiv.className = 'correct-answer';
        answerDiv.innerText = `Correct Answer: ${question.options[question.correct]}`;

        questionDiv.appendChild(resultDiv);
        questionDiv.appendChild(answerDiv);
        summaryList.appendChild(questionDiv);
    });

    let summaryDiv = document.createElement('div');
    summaryDiv.innerHTML = `<strong>Total Gold Coins Earned: ${goldCoins}</strong>`;
    summaryList.appendChild(summaryDiv);

    document.getElementById('summary-modal').style.display = 'block';
}

function closeSummary() {
    document.getElementById('summary-modal').style.display = 'none';
}

function animateCoins(numCoins, correct) {
    let jar = document.getElementById('gold-jar');
    let jarRect = jar.getBoundingClientRect();
    for (let i = 0; i < numCoins; i++) {
        let coin = document.createElement('div');
        coin.className = 'coin-animation';
        coin.style.left = `${jarRect.left + jarRect.width / 2}px`;
        coin.style.top = `${jarRect.top}px`;
        if (!correct) coin.classList.add('reverse');
        document.body.appendChild(coin);
        setTimeout(() => {
            coin.remove();
        }, 2000);
    }
}

function startTimer() {
    let timerDiv = document.getElementById('timer');
    let timer = setInterval(() => {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerDiv.innerText = `Time left: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showSummary(); // Show summary when time is up
        }
    }, 1000);
}

window.onload = () => {
    document.getElementById('shelf').style.pointerEvents = 'none'; // Disable the shelf initially
    document.getElementById('timer').style.display = 'none'; // Hide the timer initially
}
