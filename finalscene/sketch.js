// Geometric Mario-esque game
// Andrew Li
// 
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x,y,d;
let ground, gy;
let state, stateChar;
let obstacles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  ground = height/10;
  gy = height - ground;
}

function windowResized() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  line(0, gy, width, gy);
  rect(x, y, 60, y-ground);
  circle(mouseX, mouseY, 20);
  obstacleDetect();
}

function obstacleDetect() {
  if (collideLineCircle(0, gy, width, gy, mouseX, mouseY, 20)) {
    stateChar = "ground";
  }
  else if (collideRectCircle(x, y, 60, y-ground, mouseX, mouseY, 20)) {
    stateChar = "block";
  }
  else {
    stateChar = "air";
  }
  console.log(stateChar);
}