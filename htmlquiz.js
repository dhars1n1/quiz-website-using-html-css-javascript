let questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Markup Language"],
        correct: 0,
        hint: "It's the standard markup language for creating web pages."
    },
    {
        question: "Who is making the Web standards?",
        options: ["Mozilla", "Microsoft", "Google", "The World Wide Web Consortium"],
        correct: 3,
        hint: "Abbreviated as W3C."
    },
    {
        question: "What is the correct HTML element for the largest heading?",
        options: ["<heading>", "<h1>", "<head>", "<h6>"],
        correct: 1,
        hint: "Headings range from <h1> to <h6>."
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        options: ["<br>", "<break>", "<lb>", "<linebreak>"],
        correct: 0,
        hint: "It’s a self-closing tag used within paragraphs."
    },
    {
        question: "Which character is used to indicate an end tag?",
        options: ["<", ">", "/", "*"],
        correct: 2,
        hint: "It’s used in closing HTML tags like </div>."
    },
    {
        question: "How can you make a numbered list?",
        options: ["<list>", "<ul>", "<ol>", "<dl>"],
        correct: 2,
        hint: "Stands for Ordered List."
    },
    {
        question: "What is the correct HTML element for playing video files?",
        options: ["<media>", "<movie>", "<video>", "<film>"],
        correct: 2,
        hint: "It's a relatively new tag introduced in HTML5."
    },
    {
        question: "What is the correct HTML element to define important text?",
        options: ["<b>", "<important>", "<strong>", "<em>"],
        correct: 2,
        hint: "It indicates strong emphasis."
    },
    {
        question: "What does the <a> tag stand for?",
        options: ["Anchor", "Attribute", "Aside", "Applet"],
        correct: 0,
        hint: "It’s used for creating hyperlinks."
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        options: ["class", "font", "style", "styles"],
        correct: 2,
        hint: "It allows adding CSS directly in the tag."
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
