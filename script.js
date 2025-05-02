const resizeButton = document.getElementById('resize-button');
const gridContainer = document.querySelector('.grid-container');

resizeButton.addEventListener('click', () => {
    let newSize = parseInt(prompt('Please enter the new grid size (1 to 100):'), 10);

    if (isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert('Please enter a number between 1 and 100');
        return;
    }

    clearGrid();
    createGrid(newSize);
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
            square.style.backgroundColor = 'black';
        });

        gridContainer.appendChild(square);
    }
}

createGrid(16);