// 2048 attempt
// Andrew Li
// April
//
// Extra for Experts:
// - Sliding animation
// - Autoplay?
// - updateCanvas()?

// Notes:
// Create 4x4 grid
// Spawn two random blocks (2 or 4)
// Move all blocks simultaneously according to user input

let cellSize;
let grid;
const GRID_SIZE = 4;
const CORNER_SIZE = 10;
const OPEN_CELL = 0;
let counter;

function setup() {
  createCanvas(windowWidth, windowHeight);

  grid = generateGrid(GRID_SIZE, GRID_SIZE);

  cellSize = height/grid.length;
}

function draw() {
  background(220);

  displayGrid();
}

function displayGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 0) {
        fill("white");
        strokeWeight(CORNER_SIZE);
        stroke("grey");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
      }
      else if (grid[y][x] === 1) {
        fill("black");
        strokeWeight(CORNER_SIZE);
        stroke("grey");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
      }
    }
  }
}

function generateGrid(columns, rows) {
  let emptyArray = [];
  for (let y = 0; y < rows; y++) {
    emptyArray.push([]);
    for (let x = 0; x < columns; x++) {
      if (random(10) > 9) { //change this later to guarantee 2 cells spawning everytime
        emptyArray[y].push(1);
      }
      else {
        emptyArray[y].push(OPEN_CELL);
      }
    }
  }
  return emptyArray;
}

