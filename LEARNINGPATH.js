document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.tile');
    const nextButton = document.getElementById('next-button');
    const startButton = document.getElementById('start-button');
    const learningPathError = document.getElementById('learning-path-error');
    const learningModeError = document.getElementById('learning-mode-error');
    const learningPathSection = document.getElementById('learning-path-section');
    const learningModeSection = document.getElementById('learning-mode-section');
    let selectedPath = '';
    let selectedMode = '';

    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            if (tile.dataset.path) {
                selectedPath = tile.dataset.path;
                document.querySelectorAll('.tile[data-path]').forEach(t => t.classList.remove('selected'));
                tile.classList.add('selected');
                nextButton.style.display = 'block';
            } else if (tile.dataset.mode) {
                selectedMode = tile.dataset.mode;
                document.querySelectorAll('.tile[data-mode]').forEach(t => t.classList.remove('selected'));
                tile.classList.add('selected');
                startButton.style.display = 'block';
            }
        });
    });

    nextButton.addEventListener('click', () => {
        if (!selectedPath) {
            learningPathError.textContent = 'Please select a learning path.';
        } else {
            learningPathError.textContent = '';
            learningPathSection.style.display = 'none';
            learningModeSection.style.display = 'block';
        }
    });

    startButton.addEventListener('click', () => {
        if (!selectedMode) {
            learningModeError.textContent = 'Please select a learning mode.';
        } else {
            learningModeError.textContent = '';
            startLearning(selectedPath, selectedMode);
        }
    });

    function startLearning(path, mode) {
        if (mode === 'quiz') {
            // Redirect to the appropriate quiz page
            let quizPage;
            switch (path) {
                case 'html':
                    quizPage = 'htmlquiz.html';
                    break;
                case 'css':
                    quizPage = 'cssquiz.html';
                    break;
                case 'javascript':
                    quizPage = 'jsquiz.html';
                    break;
                default:
                    quizPage = '';
            }
            window.location.href = quizPage;
        } else if (mode === 'flashcards') {
            // Redirect to the appropriate flashcard page
            let flashcardPage;
            switch (path) {
                case 'html':
                    flashcardPage = 'HTML.html';
                    break;
                case 'css':
                    flashcardPage = 'CSS.html';
                    break;
                case 'javascript':
                    flashcardPage = 'JS.html';
                    break;
                default:
                    flashcardPage = '';
            }
            window.location.href = flashcardPage;
        } else {
            console.log(`Starting learning path: ${path}, mode: ${mode}`);
        }
    }
});
