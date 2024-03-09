// Geometric Mario-esque game
// Andrew Li
// 
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x,y,d; // circle parameters
let dx, dy, g, jump; // physics parameters
let rx, ry; // rectangle parameters
let ground, gy; // ground parameters
let state, stateChar; // various states
let obstacles = []; // array generating obstacles

function setup() {
  createCanvas(windowWidth, windowHeight);
  rx = width/2;
  ry = height/2;
  ground = height/10;
  gy = height - ground;
  dx = 5;
  dy = 0;
  g = 1;
  jump = 10;
  d = 20;
  x = d/2;
  y = gy - d/2;
}

function windowResized() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  line(0, gy, width, gy);
  rect(rx, ry, 60, ry-ground);
  circle(x, y, d);
  obstacleDetect();
  moveChar();
  obstacleParameters();
  console.log(y);
}

function obstacleDetect() {
  if (collideRectCircle(rx, ry, 60, ry-ground, x, y, d) && y === gy - d /2) {
    stateChar = "groundBlock";
  }
  else if (collideRectCircle(rx, ry, 60, ry-ground, x, y, d) && y === ry - d/2)  {
    stateChar = "blockTop";
  }
  else if (collideRectCircle(rx, ry, 60, ry-ground, x, y, d) && (y !== gy - d /2 && y !== ry - d/2) && y < ry - d/2) {
    stateChar = "blockSide";
  }
  else if (collideLineCircle(0, gy, width, gy, x, y, d)) {
    stateChar = "ground";
  }
  else {
    stateChar = "air";
  }
  console.log(stateChar);
}

function moveChar() {
  y += dy;
  if ((stateChar === "groundBlock" || stateChar === "blockSide") && y < ry - ground) {
    x = rx - d/2 - dx;
  }
  else if (x < d/2) {
    x = d/2 + dx;
  }
  else if (x > width - d/2) {
    x = width - d/2 - dx;
  }
  else if (x >= d / 2 && x <= width - d / 2) {
    if (keyIsDown(65)) {
      x -= dx;
    }
    if (keyIsDown(68)) {
      x += dx;
    }
  }
}

function obstacleParameters() {
  if (stateChar === "groundBlock") {
    dy = 0;
    y = ry - d/2;
  }
  if (stateChar === "air") {
    dy += g;
    if (y > ry - d/2) {
      dy = 0;
      y = ry - d/2;
    }
    if (y > gy - d/2) {
      dy = 0;
      y = gy - d/2;
    }
  }
}

// function keyPressed(){
//   if (key === " ") {
//     if(stateChar === "block" || state === "ground"){ // on the ground
//       dy = -jump; 
//     }
//   }
// }