const resizeButton = document.getElementById('resize-button');
const gridContainer = document.querySelector('.grid-container');
const randomColorButton = document.getElementById('random-color-button');
const gradientButton = document.getElementById('gradient-mode-button');

randomColorButton.textContent = 'Random Color OFF';
gradientButton.textContent = 'Gradient Mode OFF';

let randomColorMode = false;
let gradientMode = false;
let painting = true;

randomColorButton.addEventListener('click', () => {
    randomColorMode = !randomColorMode;

    if (randomColorMode) {
        gradientMode = false;
        gradientButton.textContent = 'Gradient Mode: OFF';

        gradientButton.style.backgroundColor = '#bdc3c7';
        gradientButton.style.color = 'dimgray';
        gradientButton.style.fontStyle = 'italic';

        randomColorButton.style.backgroundColor = '';
        randomColorButton.style.color = '';
        randomColorButton.style.fontStyle = '';
    } else {
        gradientButton.style.backgroundColor = '';
        gradientButton.style.color = '';
        gradientButton.style.fontStyle = '';

        randomColorButton.style.backgroundColor = '';
        randomColorButton.style.color = '';
        randomColorButton.style.fontStyle = '';
    }

    randomColorButton.textContent = `Random Color Mode: ${randomColorMode ? 'ON' : 'OFF'}`;
    randomColorButton.blur();
});

gradientButton.addEventListener('click', () => {
    gradientMode = !gradientMode;

    if (gradientMode) {
        randomColorMode = false;
        randomColorButton.textContent = 'Random Color Mode: OFF';

        randomColorButton.style.backgroundColor = '#bdc3c7';
        randomColorButton.style.color = 'dimgray';
        randomColorButton.style.fontStyle = 'italic';

        gradientButton.style.backgroundColor = '';
        gradientButton.style.color = '';
        gradientButton.style.fontStyle = '';
    } else {
        randomColorButton.style.backgroundColor = '';
        randomColorButton.style.color = '';
        randomColorButton.style.fontStyle = '';

        gradientButton.style.backgroundColor = '';
        gradientButton.style.color = '';
        gradientButton.style.fontStyle = '';
    }

    gradientButton.textContent = `Gradient Mode: ${gradientMode ? 'ON' : 'OFF'}`;
    gradientButton.blur();
});

resizeButton.addEventListener('click', () => {
    let newSize = prompt('Please enter the new grid size (1 to 100):');

    if (newSize === null) {
        return;
    }

    newSize = parseInt(newSize, 10);

    if (isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert('Please enter a number between 1 and 100');
        return;
    }

    clearGrid();
    createGrid(newSize);
    resizeButton.blur();
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
            painting = false;
            e.preventDefault();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
        painting = true;
    }
});

function clearGrid() {
    gridContainer.innerHTML = '';
}

function createGrid(size) {
    const squareSize = 512 / size;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        square.addEventListener('mouseover', function () {
            if (painting) {
                if (gradientMode) {
                    let currentOpacity = parseFloat(square.style.opacity) || 0;
                    if (currentOpacity < 1) {
                        currentOpacity += 0.1;
                        square.style.backgroundColor = 'black';
                        square.style.opacity = currentOpacity;
                    }
                } else if (randomColorMode) {
                    const r = Math.floor(Math.random() * 256);
                    const g = Math.floor(Math.random() * 256);
                    const b = Math.floor(Math.random() * 256);
                    square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                } else {
                    square.style.backgroundColor = 'black';
                }    
            
            }
        });

        gridContainer.appendChild(square);
    }
}

createGrid(16);