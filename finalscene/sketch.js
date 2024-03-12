// Character jumping on blocks
// Andrew Li
// 
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// use of push, translate, and pop functions to create an infinite screen
// use of windowResized function to accomodate various screen sizes
// use of arrays

// Questions to ask: how do I avoid having to individually state every block for object detection? through the use of arrays? for loops?
// QTA: should the character be able to move left and right? or is window translation enough? how to avoid the issue of the character running off screen?
// QTA: what kind of commenting do you expect?
// QTA: is this enough for extra for experts?
// Note to self: for object detection, all blocks must be individually considered. Therefore the code following line 160 will NOT be elegant.
// NTS: implement gravity
// NTS: improve start screen (create p5.element?)
// NTS: look for any hard coded numbers
// NTS: implement colours?
// NTS: implement audio?
// NTS: create the flag at the end?
// NTS: create enemies? (goomba, turtles, etc)


let x,y,d; // circle parameters
let dx, dy, g, jump; // physics parameters
let obX, obY, obSqHeight, obSq, obSqDistX, obSqDistY, obRectHeight, obRect; // obstacle parameters
let tx, ty, tSpeed; // translate parameters
let pSize; // pixel/grid parameters
let groundMag, gy, ground; // ground parameters
let state, stateChar, stateAir, stateObHeight; // various states

function setup() {
  createCanvas(windowWidth, windowHeight);
  state = "start";
  stateChar = "";
  stateAir = false;
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
  g = 1;
  jump = 15;
  ground = gy - d/2;
  obSqHeight = [];
  obSq = [];
  obSqDistX = [];
  obSqDistY = [];
  obRectHeight = [];
  obRect = [];
}

// resizes user window while sketch is running
function windowResized() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  displaySettings();
  
}

// allows for the game to have a start screen and a playing mode
function displaySettings() {
  if (state === "start") {
    background(0);
    showInstructions();
  }
  else if (state === "play") {
    background(220);
    rect(0, gy, width, gy);
    mapTranslation();
    character();  
  }
}

// tells user what to do during start screen
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

// generates an assortment of 124 blocks (Sq: square, Rect: rectangle), backbone of the creation of the map
function obstacles() {
  obSq = [0, 4, 5, 6, 7, 8, 14, 19, 24, 29, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 57, 58, 59, 60, 61, 68, 69, 75, 79, 83, 89, 92, 93, 94, 99, 100, 101, 102, 107, 108, 109, 110, 113, 114, 115, 116, 125, 126, 127, 128, 131, 132, 133, 134, 141, 144, 145, 146, 147, 155, 156, 157, 158, 159, 160, 161, 162];
  obSqHeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < obSq.length; i++) {
    rect(obSq[i]*pSize, 0, pSize, pSize);
  }
}

// translates the x and y values of all obstacles, creating an infinite screen. Every subsequent function is affected by the translated x and y values
function mapTranslation() {
  push();
  translate(tx, ty);
  obstacles();
  airDetect();
  pop();

  if (keyIsDown(65)) { // a; when user holds "a", the screen moves right
    tx += tSpeed;
  }
  if (keyIsDown(68)) { // d; when user holds "d", the screen moves left
    tx -= tSpeed;
  }
}

// draws the actual character, as well as includes the gravity that influences its dy value
function character() {
  circle(x, y, d);
  // y += dy;
  // gravity();
  if (keyIsDown(87)) {
    y -= dy;
  }
  if (keyIsDown(83)) {
    y += dy;
  }
}

function airDetect() {
  obSq = [0, 4, 5, 6, 7, 8, 14, 19, 24, 29, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 57, 58, 59, 60, 61, 68, 69, 75, 79, 83, 89, 92, 93, 94, 99, 100, 101, 102, 107, 108, 109, 110, 113, 114, 115, 116, 125, 126, 127, 128, 131, 132, 133, 134, 141, 144, 145, 146, 147, 155, 156, 157, 158, 159, 160, 161, 162];
  for (let i = 0; i < obSq.length; i++) {
    if (collideRectCircle(0, gy, width, gy, x, y, d) || collideRectCircle(tx, ty, pSize, pSize, x, y, d) && y + d/2 > ty && y < ty || collideRectCircle(tx + 4*pSize, ty, pSize, pSize, x, y, d) && y + d/2 > ty && y < ty || collideRectCircle(tx + 5*pSize, ty, pSize, pSize, x, y, d) && y + d/2 > ty && y < ty || collideRectCircle(tx + 6*pSize, ty, pSize, pSize, x, y, d) && y + d/2 > ty && y < ty || collideRectCircle(tx + 7*pSize, ty, pSize, pSize, x, y, d) && y + d/2 > ty && y < ty || collideRectCircle(tx + 8*pSize, ty, pSize, pSize, x, y, d) && y + d/2 > ty && y < ty) {
      stateAir = false;
    }
    else {
      stateAir = true;
    }
  }
  console.log(stateAir);
}

// detect left
// x + d/2 > tx && x < tx
// detect right
// x - d/2 < tx + pSize && x > tx + pSize
// detect top
// y + d/2 > ty && y < ty
// detect bottom
// y - d/2 < ty + pSize && y > ty + pSize