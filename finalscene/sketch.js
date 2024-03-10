// Geometric Mario-esque game *based on level 1-1 of Super Mario Bros NES
// Andrew Li
// 
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x,y,d; // circle parameters
let dx, dy, g, jump; // physics parameters
let obX, obY, obSqHeight, obSq, obSqDistX, obSqDistY, obRectHeight, obRect; // obstacle parameters
let tx, ty, tSpeed; // translate parameters
let pSize; // pixel/grid parameters
let groundMag, gy, ground; // ground parameters
let state, stateChar, stateAir; // various states

function setup() {
  createCanvas(windowWidth, windowHeight);
  state = "start";
  stateChar = "";
  stateAir - "";
  groundMag = height/10;
  pSize = groundMag;
  gy = height - groundMag;
  tx = width/2;
  ty = height - 5*pSize;
  tSpeed = 10;
  d = pSize;
  x = 2*pSize + d/2;
  y = gy - d / 2;
  dy = 1;
  dx = 2;
  ground = gy - d/2;
  obSqHeight = [];
  obSq = [];
  obSqDistX = [];
  obSqDistY = [];
  obRectHeight = [];
  obRect = [];
}

function windowResized() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  displaySettings();
  // console.log(obSq.length, obSqHeight.length);
  // console.log(obSq[0]*pSize, -1*obSqHeight[0]*pSize, obX, obY);
  // console.log(tx, ty);
}

function displaySettings() {
  if (state === "start") {
    background(0);
    showInstructions();
  }
  else if (state === "play") {
    background(220);
    line(0, gy, width, gy);
    mapTranslation();
    character();
    
  }
}

function showInstructions() {
  fill("white");
  textSize(42);
  textAlign(CENTER, CENTER);
  text("Click the mouse to start!", width/2, height/2);
}

function mousePressed() {
  if (state === "start") {
    state = "play";
  }
}

function obstacles() {
  obSq = [0, 5, 6, 7, 7, 8, 9, 37, 38, 39, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 58, 59, 60, 61, 62, 62, 69, 70, 76, 80, 80, 84, 90, 93, 94, 95, 100, 101, 101, 102, 102, 103, 108, 109, 109, 110, 110, 110, 111, 111, 111, 111, 114, 114, 114, 114, 115, 115, 115, 116, 116, 117, 126, 127, 127, 128, 128, 128, 129, 129, 129, 129, 132, 132, 132, 132, 133, 133, 133, 134, 134, 135, 145, 146, 147, 148, 156, 157, 157, 158, 158, 158, 159, 159, 159, 159, 160, 160, 160, 160, 160, 161, 161, 161, 161, 161, 161, 162, 162, 162, 162, 162, 162, 162, 163, 163, 163, 163, 163, 163, 163, 163];
  obSqHeight = [0, 0, 0, 0, 3, 0, 0, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, 1, -1, -1, -1, 1, 1, 1, 1, 1, -1, 1, -1, 1, -3, -3, -2, -3, -2, -1, -3, -2, -1, 0, 0, -1, -2, -3, -1, -2, -3, -2, -3, -3, -3, -3, -2, -3, -2, -1, -3, -2, -1, 0, 0, -1, -2, -3, -1, -2, -3, -2, -3, -3, -1, -1, -1, -1, -3, -3, -2, -3, -2, -1, -3, -2, -1, 0, -3, -2, -1, 0, 1, -3, -2, -1, 0, 1, 2, -3, -2, -1, 0, 1, 2, 3, -3, -2, -1, 0, 1, 2, 3, 4];
  obRect = [14, 19, 24, 29, 141, 155];
  obRectHeight = [1.5, 2.5, 3.5, 3.5, 0.5, 0.5];
  for (let i = 0; i <= obSq.length; i++) {
    rect(obSq[i]*pSize, -1*obSqHeight[i]*pSize, pSize, pSize);
  }
  for (let i = 0; i <= obRect.length; i++) {
    rect(obRect[i]*pSize, 4*pSize, pSize, -1*obRectHeight[i]*pSize);
  }
}

function mapTranslation() {
  push();
  translate(tx, ty);
  obstacles();
  collisionDetect();
  groundDetect();
  airDetect(); 
  pop();

  if (keyIsDown(65)) {
    tx += tSpeed;
  }
  if (keyIsDown(68)) {
    tx -= tSpeed;
  }
}

function character() {
  circle(x, y, d);
  // if (keyIsDown(65)) {
  //   x -= dx;
  // }
  // if (keyIsDown(68)) {
  //   x += dx;
  // }
  if (keyIsDown(87)) {
    y -= dy;
  }
  if (keyIsDown(83)) {
    y += dy;
  }
}

// detect left
// x + d/2 > tx && x < tx
// detect right
// x - d/2 < tx + pSize && x > tx + pSize
// detect top
// y + d/2 > ty && y < ty
// detect bottom
// y - d/2 < ty + pSize && y > ty + pSize

function collisionDetect() {
  obSqDistX = [0, 4, 5, 6, 7, 8];
  obSqDistY = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i <= obSqDistX.length; i++) {
    if (collideRectCircle(tx + obSqDistX[i]*pSize, ty - obSqDistY[i]*pSize, pSize, pSize, x, y, d) && x + d/2 > tx + obSqDistX[i]*pSize && x < tx + obSqDistX[i]*pSize) {
      stateChar = "blockLeft";
    }
    else if (collideRectCircle(tx + obSqDistX[i]*pSize, ty - obSqDistY[i]*pSize, pSize, pSize, x, y, d) && x - d/2 < tx + pSize + obSqDistX[i]*pSize && x > tx + pSize + obSqDistX[i]*pSize) {
      stateChar = "blockRight";
    }
    else if (collideRectCircle(tx + obSqDistX[i]*pSize, ty - obSqDistY[i]*pSize, pSize, pSize, x, y, d) && y + d/2 > ty - obSqDistY[i]*pSize && y < ty - obSqDistY[i]*pSize) {
      stateChar = "blockTop";
    }
    else if (collideRectCircle(tx + obSqDistX[i]*pSize, ty - obSqDistY[i]*pSize, pSize, pSize, x, y, d) && y - d/2 < ty + pSize - obSqDistY[i]*pSize && y > ty + pSize - obSqDistY[i]*pSize) {
      stateChar = "blockBottom";
    } 
    else if (collideLineCircle(0, gy, width, gy, x, y, d)) {
      stateChar = "ground";
    }
  }
  console.log(stateChar);
}

function airDetect() {
  obSqDistX = [0, 4, 5, 6, 7, 8];
  obSqDistY = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i <= obSqDistX.length; i++) {
    if (collideRectCircle(tx + obSqDistX[i]*pSize, ty - obSqDistY[i]*pSize, pSize, pSize, x, y, d) && y + d/2 > ty - obSqDistY[i]*pSize && y < ty - obSqDistY[i]*pSize || collideLineCircle(0, gy, width, gy, x, y, d)) {
      stateAir = "false";
    }
    else {
      stateAir = "true";
    }
  }
  console.log(stateAir);
}


function groundDetect() {
  obSqDistY = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i <= obSqDistY.length; i++) {
    if (stateChar === "blockTop") {
      ground = ty; 
    }
    else {
      ground = gy - d/2;
    }
  }
  // console.log(ground);
}