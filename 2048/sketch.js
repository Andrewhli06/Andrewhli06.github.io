// Kind of 2048
// Andrew Li
// April 30th
//
// Extra for Experts:
// - I explored the use of the switch operator as a replacement for multiple else if statements
// - I also explored the functionality of a ternary operator in place of a single if else statement
// - I also explored the use of many different array modifying operators such as fill, filter, concat, etc.

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

  for (let i = 0; i < 2; i++) {
    spawnCells();
  }
}

function draw() {
  background(220);
  displayGrid();
  cellText();
  displayScore();
}

function displayGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      switch(grid[y][x]) {
      case 0:
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
    random(1) > 0.5 ? grid[spot.x][spot.y] = 2 : grid[spot.x][spot.y] = 4;
  }
}

function cellColour(colour) {
  fill(colour);
  strokeWeight(CORNER_SIZE);
  stroke("grey");
}

function notEmpty(value) {
  return value > 0; //segregates non-zero values, that is to say cells that are filled
}

function moveCellsLeft(row) {
  let newRow = row.filter(notEmpty); // makes an array with only non empty values
  let empty = GRID_SIZE - newRow.length; // calculates how many zeros are needed to fill the empty spots
  let zeros = Array(empty).fill(0); // creates array with sufficient zeros to fill the gap
  newRow = newRow.concat(zeros); // makes the array that pushes all non empty blocks to the left
  return newRow;
}

function moveCellsRight(row) { 
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
  else if (key === "w" || keyCode === UP_ARROW) { // rotates the grid to turn cols to rows, makes the modification, then returns the rows to cols
    grid = rotateGrid();
    for (let i = 0; i < GRID_SIZE; i++) {
      grid[i] = moveCellsLeft(grid[i]);
      combineCellsLeft(grid[i]);
      grid[i] = moveCellsLeft(grid[i]);
    }
    grid = rotateGrid();
    spawnCells();
  }
  else if (key === "s" || keyCode === DOWN_ARROW) { // rotates the grid to turn cols to rows, makes the modification, then returns the rows to cols
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

function combineCellsRight(row) {
  for (let i = row.length - 1; i >= 1; i--) {
    let first = row[i];
    let second = row[i-1];
    if (first === second) {
      row[i] = first + second;
      row[i-1] = 0;
      score = score + (first + second);
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
      score = score + (first + second);
    }
  }
}

function cellText() {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j] > 0) {
        fill("black");
        noStroke();
        textSize(42);
        textAlign(CENTER, CENTER);
        text(grid[i][j], j*cellSize + cellSize/2, i*cellSize + cellSize/2);
      }
    }
  }
}

function displayScore() {
  fill("black");
  textSize(42);
  text("Score:" + score, width - 3*cellSize, cellSize);
}
