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
    randomColorButton.textContent = `Random Color Mode: ${randomColorMode ? 'ON' : 'OFF'}`;
});

gradientButton.addEventListener('click', () => {
    gradientMode = !gradientMode;
    gradientButton.textContent = `Gradient Mode: ${gradientMode ? 'ON' : 'OFF'}`;
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
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        if (document.activeElement.tagName !== 'BUTTON') {
            painting = false;
        }
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