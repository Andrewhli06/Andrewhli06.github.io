// 2D Grid
// Dan Schellenberg
// Apr 9, 2024

// if you are hard-coding a level, I'd use something like this

// let grid = [[1, 0, 0, 1],
//             [0, 1, 0, 1],
//             [1, 1, 0, 0],
//             [1, 0, 1, 1],
//             [0, 0, 0, 1],
//             [0, 0, 1, 1],
//             [0, 1, 0, 1],
//             [0, 0, 0, 1]];

let grid;
let cellSize;
const GRID_SIZE = 4;
let toggleStyle = "self";
let isAutoPlayOn = false;
let gosperGun;

function preload() {
  gosperGun = loadJSON("gosper.json");
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }

  //if randomizing the grid, do this:
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  
  //this is dumb -- should check if this is the right size!
  cellSize = height/grid.length;
}

function windowResized() {
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }
  //this is dumb -- should check if this is the right size!
  cellSize = height/grid.length;
}

function draw() {
  background(220);

  if (isAutoPlayOn) {
    grid = updateGrid();
  }

  displayGrid();
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }

  if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }

  if (key === "g") {
    grid = gosperGun.gun;
  }

  if (key === "n") {
    toggleStyle = "neighbours";
  }

  if (key === "s") {
    toggleStyle = "style";
  }

  if (key === " ") {
    grid = updateGrid();
  }

  if (key === "a") {
    isAutoPlayOn = !isAutoPlayOn;
  }
}

function updateGrid() {
  // need a second array to not mess with original grid
  let nextTurn = generateEmptyGrid(GRID_SIZE, GRID_SIZE);

  // look at every cell
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      let neighbours = 0;

      // look at every cell in a 3x3 grid around the cell
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          // avoid going off the edge of the grid
          if (y + i >= 0 && y + i < GRID_SIZE && x + j >= 0 && x + j <= GRID_SIZE) {
            neighbours += grid[y + i][x + j];
          }
        }
      }
      // don't count yourself in the neighbours
      neighbours -= grid[y][x];

      // apply rules
      if (grid[y][x] === 1) { // currently alive
        if (neighbours === 2 || neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }

      if (grid[y][x] === 0) { // currently dead
        if (neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }
    }
  }
  return nextTurn;
}



function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  // console.log(x, y);

  // toggle self
  toggleCell(x, y);

  // toggle NESW neighbours if style is set to neighbours
  if (toggleStyle === "neighbours") {
    toggleCell(x + 1, y);
    toggleCell(x - 1, y);
    toggleCell(x, y + 1);
    toggleCell(x, y - 1);
  }
}

function toggleCell(x, y) {
  //toggle the color of the cell
  if (x < GRID_SIZE && y < GRID_SIZE && x >= 0 && y >= 0) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else {
      grid[y][x] = 0;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 1) {
        fill("black");
      }
      else {
        fill("white");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function generateRandomGrid(cols, rows) {
  let emptyArray = [];
  for (let y = 0; y < rows; y++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x++) {
      //half the time, be a 1. Other half, be a 0.
      if (random(100) < 50) {
        emptyArray[y].push(0);
      }
      else {
        emptyArray[y].push(1);
      }
    }
  }
  return emptyArray;
}

function generateEmptyGrid(cols, rows) {
  let emptyArray = [];
  for (let y = 0; y < rows; y++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x++) {
      emptyArray[y].push(0);
    }
  }
  return emptyArray;
}