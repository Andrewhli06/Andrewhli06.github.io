// Kind of 2048
// Andrew Li
// April 30th
//
// Extra for Experts:
// - I explored the use of the switch operator as a replacement for multiple else if statements
// - I also explored the functionality of a ternary operator in place of a single if else statement
// - I also explored the use of many different array modifying operators such as fill, filter, concat, etc.

//initializing global variables and constants
let cellSize;
let grid;
let score = 0;
const GRID_SIZE = 4;
const CORNER_SIZE = 10;
const OPEN_CELL = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  grid = generateGrid(GRID_SIZE, GRID_SIZE);

  cellSize = height/grid.length;

  for (let i = 0; i < 2; i++) { //randomly spawns two cells upon start
    spawnCells();
  }
}

function draw() {
  background(220);
  displayGrid();
  cellText();
  displayScore();
}

//displays the 4x4 grid, allocates appropriate colour to respective cell
function displayGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      switch(grid[y][x]) {
      case OPEN_CELL:
        cellColour("#a9a9a9");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
        break;
      case 2:
        cellColour("#eee4da");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
        break;
      case 4:
        cellColour("ede0c8");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
        break;
      case 8:
        cellColour("#f2b179");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
        break;
      case 16:
        cellColour("#f59563");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
        break;
      case 32:
        cellColour("#f67c5f");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
        break;
      case 64:
        cellColour("#f65e3b");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
        break;
      case 128:
        cellColour("#edcf72");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
        break;
      case 256:
        cellColour("#edcc61");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);   
        break;
      case 512:
        cellColour("#edc850");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
        break;
      case 1024:
        cellColour("#edc53f");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
        break;
      case 2048:
        cellColour("#edc22e");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
        fill("black");
        textSize(42);
        noStroke();
        text("You Win!", width - 3*cellSize, 2*cellSize);
        break;
      }
      if (grid[y][x] > 2048) {
        cellColour("black");
        square(x * cellSize, y * cellSize, cellSize, CORNER_SIZE);
      }
    }
  }
}

//generates the 2D array responsible for the creation of the grid
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

//spawns cells in random location
function spawnCells() {
  let openCells = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j] === 0) { //assigns an x and y coordinate to each cell in the grid
        openCells.push({
          x: i,
          y: j,
        });
      }
    }
  }
  if (openCells.length > 0) {
    let spot = random(openCells);
    random(1) > 0.5 ? grid[spot.x][spot.y] = 2 : grid[spot.x][spot.y] = 4; //chooses to randomly spawn either a 2 or a 4
  }
}

//gives colour to the cell, forms the border of the grid
function cellColour(colour) {
  fill(colour);
  strokeWeight(CORNER_SIZE);
  stroke("grey");
}

//segregates non-zero values
function notEmpty(value) {
  return value > OPEN_CELL; 
}

function moveCellsLeft(row) {
  let newRow = row.filter(notEmpty); // makes an array with only non empty values
  let empty = GRID_SIZE - newRow.length; 
  let zeros = Array(empty).fill(0); // creates array with sufficient zeros to fill the gap
  newRow = newRow.concat(zeros); // makes the array that pushes all non empty blocks to the left
  return newRow;
}

function moveCellsRight(row) { 
  let newRow = row.filter(notEmpty); // makes an array with only non empty values
  let empty = GRID_SIZE - newRow.length;
  let zeros = Array(empty).fill(0); // creates array with sufficient zeros to fill the gap
  newRow = zeros.concat(newRow); // makes the array that pushes all non empty blocks to the right
  return newRow;
}

//turns the columns into rows in order to recycle the right and left movement/combine functions
function rotateGrid() { 
  let newGrid = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    newGrid.push([]);
    for (let j = 0; j < GRID_SIZE; j++) {
      newGrid[i].push(grid[j][i]);
    }
  }
  return newGrid;
}

function keyPressed() {
  if (key === "a" || keyCode === LEFT_ARROW) {
    for (let i = 0; i < GRID_SIZE; i++) {
      grid[i] = moveCellsLeft(grid[i]);
      combineCellsLeft(grid[i]);
      grid[i] = moveCellsLeft(grid[i]);
    }
    spawnCells();
  }
  else if (key === "d" || keyCode === RIGHT_ARROW) {
    for (let i = 0; i < GRID_SIZE; i++) {
      grid[i] = moveCellsRight(grid[i]);
      combineCellsRight(grid[i]);
      grid[i] = moveCellsRight(grid[i]);
    }
    spawnCells();
  }
  else if (key === "w" || keyCode === UP_ARROW) {
    grid = rotateGrid();
    for (let i = 0; i < GRID_SIZE; i++) {
      grid[i] = moveCellsLeft(grid[i]);
      combineCellsLeft(grid[i]);
      grid[i] = moveCellsLeft(grid[i]);
    }
    grid = rotateGrid();
    spawnCells();
  }
  else if (key === "s" || keyCode === DOWN_ARROW) {
    grid = rotateGrid();
    for (let i = 0; i < GRID_SIZE; i++) {
      grid[i] = moveCellsRight(grid[i]);
      combineCellsRight(grid[i]);
      grid[i] = moveCellsRight(grid[i]);
    }
    grid = rotateGrid();
    spawnCells();
  }
}

//checks if neighbouring cells are the same, if so, add them up and replace old location with an empty cell
function combineCellsRight(row) { 
  for (let i = row.length - 1; i >= 1; i--) {
    let first = row[i];
    let second = row[i-1];
    if (first === second) {
      row[i] = first + second;
      row[i-1] = OPEN_CELL;
      score = score + (first + second);
    }
  }
}

//checks if neighbouring cells are the same, if so, add them up and replace old location with an empty cell
function combineCellsLeft(row) {
  for (let i = 0; i < row.length-1; i++) {
    let first = row[i];
    let second = row[i+1];
    if (first === second) {
      row[i] = first + second;
      row[i+1] = OPEN_CELL;
      score = score + (first + second);
    }
  }
}

//shows the value of the cell, places the text in the middle of said cell
function cellText() {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j] > OPEN_CELL) {
        fill("black");
        noStroke();
        textSize(42);
        textAlign(CENTER, CENTER);
        text(grid[i][j], j*cellSize + cellSize/2, i*cellSize + cellSize/2);
      }
    }
  }
}

//keeps a running total for the sum of the combined blocks
function displayScore() {
  fill("black");
  textSize(42);
  text("Score:" + score, width - 3*cellSize, cellSize);
}
