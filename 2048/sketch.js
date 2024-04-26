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

  for (let i = 0; i < 2; i++) {
    spawnCells();
  }
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
      else if (grid[y][x] === 2) {
        fill("black");
        strokeWeight(CORNER_SIZE);
        stroke("grey");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
      }
      else if (grid[y][x] === 4) {
        fill("red");
        strokeWeight(CORNER_SIZE);
        stroke("grey");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
      }
      else if (grid[y][x] === 8) {
        fill("blue");
        strokeWeight(CORNER_SIZE);
        stroke("grey");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
      }
      else if (grid[y][x] === 16) {
        fill("green");
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
      emptyArray[y].push(OPEN_CELL);
    }
  }
  return emptyArray;
}

function spawnCells() {
  let openCells = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j] === 0) {
        openCells.push({
          x: i,
          y: j,
        });
      }
    }
  }
  if (openCells.length > 0) {
    let spot = random(openCells);
    if (random(1) > 0.5) {
      grid[spot.x][spot.y] = 2;
    }
    else {
      grid[spot.x][spot.y] = 4;
    }
  }
}

function notEmpty(value) {
  return value > 0; //segregates none zero values, that is to say cells that are filled
}

function moveCellsLeft(row) {
  let newRow = row.filter(notEmpty); // makes an array with only non empty values
  let missing = GRID_SIZE - newRow.length; // calculates how many zeros are needed to fill the empty spots
  let zeros = Array(missing).fill(0); // creates array with sufficient zeros to fill the gap
  newRow = newRow.concat(zeros); // makes the array that pushes all non empty blocks to the left
  return newRow;
}

function moveCellsRight(row) {
  let newRow = row.filter(notEmpty); // makes an array with only non empty values
  let missing = GRID_SIZE - newRow.length; // calculates how many zeros are needed to fill the empty spots
  let zeros = Array(missing).fill(0); // creates array with sufficient zeros to fill the gap
  newRow = zeros.concat(newRow); // makes the array that pushes all non empty blocks to the right
  return newRow;
}

function keyPressed() {
  if (key === "a") {
    for (let i = 0; i < GRID_SIZE; i++) {
      grid[i] = moveCellsLeft(grid[i]);
      combineCellsLeft(grid[i]);
    }
    spawnCells();
  }
  else if (key === "d") {
    for (let i = 0; i < GRID_SIZE; i++) {
      grid[i] = moveCellsRight(grid[i]);
      combineCellsRight(grid[i]);
    }
    spawnCells();
  }
}

function combineCellsRight(row) {
  for (let i = row.length - 1; i >= 1; i--) {
    let first = row[i];
    let second = row[i-1];
    if (first === second) {
      row[i] = first + second;
      row[i-1] = 0;
      break;
    }
  }
}

function combineCellsLeft(row) {
  for (let i = 0; i < row.length-1; i++) {
    let first = row[i];
    let second = row[i+1];
    if (first === second) {
      row[i] = first + second;
      row[i+1] = 0;
      break;
    }
  }
}
