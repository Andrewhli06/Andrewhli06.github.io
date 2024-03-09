// Geometric Mario-esque game
// Andrew Li
// 
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x,y,d; // circle parameters
let dx, dy, g, jump; // physics parameters
let rx, ry; // rectangle parameters
let groundMag, gy, ground; // ground parameters
let state, stateChar; // various states
let obstacles = []; // array generating obstacles

function setup() {
  createCanvas(windowWidth, windowHeight);
  rx = width/2;
  ry = height/2;
  groundMag = height/10;
  gy = height - groundMag;
  dx = 5;
  dy = 0;
  g = 0.5;
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
  rect(rx, ry, 60, ry-groundMag);
  circle(x, y, d);
  gravity();
  obstacleDetect();
  moveChar();
  obstacleParameters();
  groundDef();
  console.log(dy);
  y += dy;
}

function obstacleDetect() {
  if (collideRectCircle(rx, ry, 60, ry-groundMag, x, y, d) && y === gy - d /2) {
    stateChar = "groundBlock";
  }
  else if (collideRectCircle(rx, ry, 60, ry-groundMag, x, y, d) && y === ry - d/2)  {
    stateChar = "blockTop";
  }
  else if (collideRectCircle(rx, ry, 60, ry-groundMag, x, y, d) && (y > gy - d/2 && y < ry - d/2)) {
    stateChar = "blockSide";
  }
  else if (collideLineCircle(0, gy, width, gy, x, y, d)) {
    stateChar = "ground";
  }
  else if (!collideRectCircle(rx, ry, 60, ry-groundMag, x, y, d) && !collideLineCircle(0, gy, width, gy, x, y, d)) {
    stateChar = "air";
  }
  console.log(stateChar);
}

function moveChar() {
  if (stateChar === "groundBlock" || stateChar === "blockSide") {
    if (x <= rx - d/2) {
      x = rx - d/2 - dx;
    }
    else if (x >= rx + 60 + d/2) {
      x = rx + d/2 + dx;
    }
  }
  else if (stateChar === "air") {
    if (x < rx - d/2 || x > rx + 60 + d / 2) {
      if (keyIsDown(65)) {
        x -= dx;
      }
      if (keyIsDown(68)) {
        x += dx;
      }
    }
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
}

function groundDef() {
  if (stateChar === "ground") {
    ground = gy - d/2;
  }
  else if (stateChar === "blockTop") {
    ground = ry - d/2;
  }
  else if (stateChar === "air" && (x > rx + 60 + d / 2 || x < rx - d / 2)) {
    ground = gy - d / 2;
  }
}

function gravity() {
  if (stateChar === "air" && y < ground) {
    y += dy;
    dy += g;
  }
  if (y > ground) {
    dy = 0;
    y = ground;
  }
}

function keyPressed(){
  if (key === " ") {
    if(y >= ground){ // on the ground
      dy = -jump; 
    }
  }
}
