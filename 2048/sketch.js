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
        cellColour("#a9a9a9");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
      }
      else if (grid[y][x] === 2) {
        cellColour("#eee4da");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
      }
      else if (grid[y][x] === 4) {
        cellColour("ede0c8");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
      }
      else if (grid[y][x] === 8) {
        cellColour("#f2b179");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
      }
      else if (grid[y][x] === 16) {
        cellColour("#f59563");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
      }
      else if (grid[y][x] === 32) {
        cellColour("#f67c5f");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
      }
      else if (grid[y][x] === 64) {
        cellColour("#f65e3b");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
      }
      else if (grid[y][x] === 128) {
        cellColour("#edcf72");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
      }
      else if (grid[y][x] === 256) {
        cellColour("#edcc61");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
      }
      else if (grid[y][x] === 512) {
        cellColour("#edc850");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
      }
      else if (grid[y][x] === 1024) {
        cellColour("#edc53f");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
      }
      else if (grid[y][x] === 2048) {
        cellColour("#edc22e");
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

function cellColour(colour) {
  fill(colour);
  strokeWeight(CORNER_SIZE);
  stroke("grey");
}

function notEmpty(value) {
  return value > 0; //segregates none zero values, that is to say cells that are filled
}

function moveCellsLeft(row) {
  let newRow = row.filter(notEmpty); // makes an array with only non empty values
  let empty = GRID_SIZE - newRow.length; // calculates how many zeros are needed to fill the empty spots
  let zeros = Array(empty).fill(0); // creates array with sufficient zeros to fill the gap
  newRow = newRow.concat(zeros); // makes the array that pushes all non empty blocks to the left
  return newRow;
}

function moveCellsRight(row) { //flip grid function?
  let newRow = row.filter(notEmpty); // makes an array with only non empty values
  let empty = GRID_SIZE - newRow.length; // calculates how many zeros are needed to fill the empty spots
  let zeros = Array(empty).fill(0); // creates array with sufficient zeros to fill the gap
  newRow = zeros.concat(newRow); // makes the array that pushes all non empty blocks to the right
  return newRow;
}

function rotateGrid() { //this function
  let newGrid = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    newGrid.push([]);
    for (let j = 0; j < GRID_SIZE; j++) {
      newGrid[i].push(grid[j][i]);
    }
  }
  return newGrid;
}

// function moveCellsUp(column) {
//   moveCellsLeft(column);
// }

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
  else if (key === "w") {
    grid = rotateGrid();
    for (let i = 0; i < GRID_SIZE; i++) {
      grid[i] = moveCellsLeft(grid[i]);
      combineCellsLeft(grid[i]);
    }
    grid = rotateGrid();
    spawnCells();
  }
  else if (key === "s") {
    grid = rotateGrid();
    for (let i = 0; i < GRID_SIZE; i++) {
      grid[i] = moveCellsRight(grid[i]);
      combineCellsRight(grid[i]);
    }
    grid = rotateGrid();
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
