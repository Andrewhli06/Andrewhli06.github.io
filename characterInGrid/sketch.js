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
const GRID_SIZE = 10;
const PLAYER = 9;
const OPEN_TILE = 0;
const CLOSED_TILE = 1;
let player = {
  x: 0,
  y: 0,
};
let grassImg;
let pavingImg;
let bgMusic;
let cantWalk;
let state = "startScreen";

function preload() {
  grassImg = loadImage("assets/images/grass1.png");
  pavingImg = loadImage("assets/images/paving 4.png");
  bgMusic = loadSound("assets/sounds/TownTheme.mp3");
  cantWalk = loadSound("assets/sounds/burp.wav");
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

  //add player to grid
  grid[player.y][player.x] = PLAYER;

  bgMusic.setVolume(0.4);
  cantWalk.setVolume(5);
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
  if (state === "startScreen") {
    background(0);
  }
  else if (state === "game") {
    background(220);
    displayGrid();
  }
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }

  if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }

  if (key === "w") {
    movePlayer(player.x + 0, player.y - 1);
  }

  if (key === "s") {
    movePlayer(player.x + 0, player.y + 1);
  }

  if (key === "a") {
    movePlayer(player.x - 1, player.y + 0);
  }
  if (key === "d") {
    movePlayer(player.x + 1, player.y + 0);
  }

  if (key === " " && state === "startScreen") {
    state = "game";
    bgMusic.loop();
  }

}

function movePlayer(x, y) {
  //dont move off grid, and only move into open tiles
  if (x < GRID_SIZE && y < GRID_SIZE && x >= 0 && y >= 0 && grid[y][x] === OPEN_TILE) {
    //previous player location
    let oldX = player.x;
    let oldY = player.y;

    //move the player
    player.x = x;
    player.y = y;
  
    grid[player.y][player.x] = PLAYER;

    //reset old location to be an empty tile
    grid[oldY][oldX] = OPEN_TILE;

    //move the player to the new spot
    grid[player.y][player.x] = PLAYER;
  }
  else {
    cantWalk.play();
  }
} 


function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  // console.log(x, y);

  // toggle self
  toggleCell(x, y);
}

function toggleCell(x, y) {
  //toggle the color of the cell
  if (x < GRID_SIZE && y < GRID_SIZE && x >= 0 && y >= 0) {
    if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = CLOSED_TILE;
    }
    else if (grid[y][x] === CLOSED_TILE){
      grid[y][x] = OPEN_TILE;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === CLOSED_TILE) {
        // fill("black");
        image(grassImg, x * cellSize, y * cellSize, cellSize);
      }
      else if (grid[y][x] === OPEN_TILE) {
        // fill("white");
        image(pavingImg, x * cellSize, y * cellSize, cellSize);
      }
      else if (grid[y][x] === PLAYER) {
        fill("red");
        square(x * cellSize, y * cellSize, cellSize);
      }
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