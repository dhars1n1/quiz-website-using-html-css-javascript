let questions = [
    {
        question: "What does CSS stand for?",
        options: ["Colorful Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"],
        correct: 2,
        hint: "It's a language used for describing the presentation of a document written in HTML."
    },
    {
        question: "Which HTML attribute is used to define inline styles in CSS?",
        options: ["class", "styles", "style", "font"],
        correct: 2,
        hint: "It allows adding CSS directly in the tag."
    },
    {
        question: "Which property is used to change the background color?",
        options: ["background-color", "bgcolor", "color", "background"],
        correct: 0,
        hint: "It is a property often used with the background shorthand property."
    },
    {
        question: "Which CSS property controls the text size?",
        options: ["text-style", "font-size", "text-size", "font-style"],
        correct: 1,
        hint: "It's often used to adjust the size of the font."
    },
    {
        question: "How do you select an element with id 'demo'?",
        options: ["#demo", ".demo", "demo", "*demo"],
        correct: 0,
        hint: "It uses a hash symbol."
    },
    {
        question: "How do you select elements with class name 'test'?",
        options: [".test", "#test", "*test", "test"],
        correct: 0,
        hint: "It uses a period symbol."
    },
    {
        question: "Which property is used to change the font of an element?",
        options: ["font-family", "font-weight", "font-style", "font-variant"],
        correct: 0,
        hint: "It specifies the font for an element."
    },
    {
        question: "Which property is used to change the left margin of an element?",
        options: ["margin-left", "padding-left", "left-margin", "padding-left"],
        correct: 0,
        hint: "It adjusts the space outside the border."
    },
    {
        question: "How do you make each word in a text start with a capital letter?",
        options: ["text-transform:capitalize", "text-style:capitalize", "transform:capitalize", "text-decoration:capitalize"],
        correct: 0,
        hint: "It is a value for the text-transform property."
    },
    {
        question: "How do you display a border like this: The top border = 10 pixels, the bottom border = 5 pixels, the left border = 20 pixels, and the right border = 1 pixel?",
        options: ["border-width:10px 1px 5px 20px;", "border-width:10px 20px 5px 1px;", "border-width:10px 5px 20px 1px;", "border-width:10px 1px 20px 5px;"],
        correct: 0,
        hint: "The values are specified in the order: top, right, bottom, left."
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