const flashcards = [
  { front: 'What does HTML stand for?', backTitle: 'ANSWER', backInfo: 'HyperText Markup Language' },
  { front: 'What is the purpose of HTML?', backTitle: 'ANSWER', backInfo: 'HTML is used to create and structure sections, paragraphs, and links on web pages.' },
  { front: 'What is a "tag" in HTML?', backTitle: 'ANSWER', backInfo: 'A tag is a code element that defines how content should be formatted or displayed. Tags are enclosed in angle brackets, like <tag>.' },
  { front: 'What is an "element" in HTML?', backTitle: 'ANSWER', backInfo: 'An element is a part of an HTML document, composed of a start tag, content, and an end tag (e.g., <p>This is a paragraph.</p>).' },
  { front: 'What is the role of the <html> tag?', backTitle: 'ANSWER', backInfo: 'The <html> tag is the root element of an HTML document and contains all other elements.' },
  { front: 'What does the <head> section contain?', backTitle: 'ANSWER', backInfo: 'The <head> section contains meta-information about the document, like the title and links to stylesheets.' },
  { front: 'What is the purpose of the <title> tag?', backTitle: 'ANSWER', backInfo: 'The <title> tag sets the title of the web page, which appears in the browser tab.' },
  { front: 'What does the <body> tag contain?', backTitle: 'ANSWER', backInfo: 'The <body> tag contains all the content of the web page, such as text, images, links, and other media.' },
  { front: 'What does the <h1> to <h6> tags represent?', backTitle: 'ANSWER', backInfo: 'These tags represent headings, with <h1> being the highest (most important) level and <h6> the lowest.' },
  { front: 'How do you create a paragraph in HTML?', backTitle: 'ANSWER', backInfo: 'Use the <p> tag to create a paragraph. Example: <p>This is a paragraph.</p>' },
  { front: 'How do you create a hyperlink in HTML?', backTitle: 'ANSWER', backInfo: 'Use the <a> tag with the href attribute. Example: <a href="https://example.com">This is a link</a>' },
  { front: 'What is an attribute in HTML?', backTitle: 'ANSWER', backInfo: 'An attribute provides additional information about an element and is always included in the opening tag. Example: href in <a href="url">.' },
  { front: 'How do you insert an image in HTML?', backTitle: 'ANSWER', backInfo: 'Use the <img> tag with the src attribute. Example: <img src="image.jpg" alt="Description">' },
  { front: 'How do you create an unordered list in HTML?', backTitle: 'ANSWER', backInfo: 'Use the <ul> tag for the list and <li> tags for each list item. Example: <ul><li>Item 1</li><li>Item 2</li></ul>' },
  { front: 'How do you create an ordered list in HTML?', backTitle: 'ANSWER', backInfo: 'Use the <ol> tag for the list and <li> tags for each list item. Example: <ol><li>First item</li><li>Second item</li></ol>' },
  { front: 'What is the purpose of the <div> tag?', backTitle: 'ANSWER', backInfo: 'The <div> tag is a block-level element used to group other HTML elements and apply CSS styles or JavaScript.' },
  { front: 'What is the purpose of the <span> tag?', backTitle: 'ANSWER', backInfo: 'The <span> tag is an inline element used to apply styles or scripts to a part of the text.' },
  { front: 'How do you create a form in HTML?', backTitle: 'ANSWER', backInfo: 'Use the <form> tag to create a form. Example: <form action="submit.html"><input type="text" name="name"><input type="submit"></form>' },
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
  window.location.href = "htmlquiz.html";
}
