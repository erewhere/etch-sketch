const gridContainer = document.querySelector('.grid-container');
const gridSize = 16;
const totalSquares = gridSize * gridSize;

for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement('div');
    square.classList.add('grid-square');
    gridContainer.appendChild(square);

square.addEventListener('mouseover', function() {
    square.style.backgroundColor = 'black';  // Change to black on hover
});

}