const flashcards = [
    { front: 'What does JS stand for?', backTitle: 'ANSWER', backInfo: 'JavaScript' },
    { front: 'What is the main purpose of JavaScript?', backTitle: 'ANSWER', backInfo: 'JavaScript is used to create interactive and dynamic web pages.' },
    { front: 'How do you include JavaScript in an HTML document?', backTitle: 'ANSWER', backInfo: 'Use the <script> tag. Example: <script src="script.js"></script>' },
    { front: 'What is a variable in JavaScript?', backTitle: 'ANSWER', backInfo: 'A variable is a container for storing data values.' },
    { front: 'How do you declare a variable in JavaScript?', backTitle: 'ANSWER', backInfo: 'Use var, let, or const. Example: let x = 10;' },
    { front: 'What is a function in JavaScript?', backTitle: 'ANSWER', backInfo: 'A function is a block of code designed to perform a particular task.' },
    { front: 'How do you define a function in JavaScript?', backTitle: 'ANSWER', backInfo: 'Use the function keyword. Example: function myFunction() { // code }' },
    { front: 'What is an array in JavaScript?', backTitle: 'ANSWER', backInfo: 'An array is a special variable that can hold more than one value at a time.' },
    { front: 'How do you create an array in JavaScript?', backTitle: 'ANSWER', backInfo: 'Use square brackets. Example: let fruits = ["Apple", "Banana", "Cherry"];' },
    { front: 'What is an object in JavaScript?', backTitle: 'ANSWER', backInfo: 'An object is a collection of properties, and a property is an association between a name (or key) and a value.' },
    { front: 'How do you create an object in JavaScript?', backTitle: 'ANSWER', backInfo: 'Use curly braces. Example: let person = {firstName: "John", lastName: "Doe"};' },
    { front: 'What is an event in JavaScript?', backTitle: 'ANSWER', backInfo: 'An event is an action or occurrence that can be detected by JavaScript, such as a mouse click or a key press.' },
    { front: 'How do you write a comment in JavaScript?', backTitle: 'ANSWER', backInfo: 'Use // for single-line comments and /* */ for multi-line comments.' },
    { front: 'What is the purpose of if statements in JavaScript?', backTitle: 'ANSWER', backInfo: 'If statements are used to perform different actions based on different conditions.' },
    { front: 'How do you write an if statement in JavaScript?', backTitle: 'ANSWER', backInfo: 'Use the if keyword followed by a condition in parentheses and a block of code in curly braces. Example: if (x > 5) { // code }' },
    { front: 'What are else and else if statements in JavaScript?', backTitle: 'ANSWER', backInfo: 'Else and else if statements provide alternative blocks of code that execute if the original if condition is false.' },
    { front: 'What is the console.log function used for?', backTitle: 'ANSWER', backInfo: 'console.log is used to print messages to the web console for debugging purposes.' },
    { front: 'How do you access an HTML element by its ID in JavaScript?', backTitle: 'ANSWER', backInfo: 'Use document.getElementById("id"). Example: document.getElementById("myElement")' },
    { front: 'What is a JavaScript event listener?', backTitle: 'ANSWER', backInfo: 'An event listener is a procedure that waits for an event to occur and then executes a function in response.' },
    { front: 'What are JavaScript promises used for?', backTitle: 'ANSWER', backInfo: 'Promises are used to handle asynchronous operations, allowing you to execute code after an operation has completed.' },
  ];
  
  let currentCardIndex = 0;
  const flashcard = document.getElementById('flashcard');
  const front = document.getElementById('front');
  const backTitle = document.getElementById('back-title');
  const backInfo = document.getElementById('back-info');
  
  function loadCard(index) {
    const card = flashcards[index];
    front.textContent = card.front;
    backTitle.textContent = card.backTitle;
    backInfo.textContent = card.backInfo;
    flashcard.style.opacity = 0;
    flashcard.style.left = '50px';
    setTimeout(() => {
      flashcard.style.opacity = 1;
      flashcard.style.left = '0';
    }, 300); // Adjusted to match the opacity transition
  }
  
  function nextCard() {
    if (currentCardIndex < flashcards.length - 1) {
      currentCardIndex++;
      flashcard.style.left = '-50px';
      setTimeout(() => {
        loadCard(currentCardIndex);
        flashcard.classList.remove('flip'); // Ensure the front side is shown
      }, 300); // Time for the card to float left and vanish
    }
  }
  
  function prevCard() {
    if (currentCardIndex > 0) {
      currentCardIndex--;
      flashcard.style.left = '50px';
      setTimeout(() => {
        loadCard(currentCardIndex);
        flashcard.classList.remove('flip'); // Ensure the front side is shown
      }, 300); // Time for the card to come back from left
    }
  }
  
  // Initialize first card
  loadCard(currentCardIndex);
  
  // Add flip functionality
  flashcard.addEventListener('click', () => {
    flashcard.classList.toggle('flip');
  });
  
  function startQuiz() {
    window.location.href = "jsquiz.html";
}
