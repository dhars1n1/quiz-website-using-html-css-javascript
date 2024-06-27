const flashcards = [
    { front: 'What does CSS stand for?', backTitle: 'ANSWER', backInfo: 'Cascading Style Sheets' },
    { front: 'What is the main purpose of CSS?', backTitle: 'ANSWER', backInfo: 'CSS is used to style and layout web pages.' },
    { front: 'How do you link a CSS file to an HTML document?', backTitle: 'ANSWER', backInfo: 'Use the <link> tag in the <head> section of the HTML document. Example: <link rel="stylesheet" href="styles.css">' },
    { front: 'What is a CSS selector?', backTitle: 'ANSWER', backInfo: 'A CSS selector is a pattern used to select the elements you want to style.' },
    { front: 'What does the color property do in CSS?', backTitle: 'ANSWER', backInfo: 'The color property sets the color of the text.' },
    { front: 'How do you set the background color of an element in CSS?', backTitle: 'ANSWER', backInfo: 'Use the background-color property. Example: background-color: blue;' },
    { front: ' What is the purpose of the margin property in CSS?', backTitle: 'ANSWER', backInfo: 'The margin property sets the space outside of an element\'s border.' },
    { front: 'What does the <body> tag contain?', backTitle: 'ANSWER', backInfo: 'The <body> tag contains all the content of the web page, such as text, images, links, and other media.' },
    { front: 'What is the purpose of the padding property in CSS?', backTitle: 'ANSWER', backInfo: 'The padding property sets the space between the content of an element and its border.' },
    { front: 'How do you center text in CSS?', backTitle: 'ANSWER', backInfo: 'Use the text-align property with the value center. Example: text-align: center;' },
    { front: 'What does the display property do in CSS?', backTitle: 'ANSWER', backInfo: 'The display property specifies how an element is displayed on the page (e.g., block, inline, none).' },
    { front: 'How do you apply multiple CSS classes to an element?', backTitle: 'ANSWER', backInfo: 'List the class names in the class attribute separated by spaces. Example: <div class="class1 class2"></div>' },
    { front: 'What is the purpose of the border property in CSS?', backTitle: 'ANSWER', backInfo: 'The border property sets the border around an element.' },
    { front: 'How do you round the corners of an element in CSS?', backTitle: 'ANSWER', backInfo: 'Use the border-radius property. Example: border-radius: 10px;' },
    { front: 'What does the float property do in CSS?', backTitle: 'ANSWER', backInfo: 'The float property allows elements to be taken out of the normal flow and positioned to the left or right of their container.' },
    { front: 'What is the purpose of the position property in CSS?', backTitle: 'ANSWER', backInfo: 'The position property specifies the positioning method for an element (e.g., static, relative, absolute, fixed)' },
    { front: 'How do you add a shadow to text in CSS?', backTitle: 'ANSWER', backInfo: 'Use the text-shadow property. Example: text-shadow: 2px 2px 5px gray;' },
    { front: 'What is the purpose of the z-index property in CSS?', backTitle: 'ANSWER', backInfo: 'The z-index property specifies the stack order of an element (i.e., which element should be in front or behind).' },
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
    window.location.href = "cssquiz.html";
}
