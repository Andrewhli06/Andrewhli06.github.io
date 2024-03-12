// Mario-coloured parkour simulator
// Andrew Li
// March 11th, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// use of push, translate, and pop functions to create an infinite screen
// use of windowResized function to accomodate various screen sizes
// use of arrays, exploration of p5.collide2D

// Note: line 148 gives a warning message "tokenization for long lines for performance reasons", but the code still runs perfectly fine
// Note: I was wondering if you could give me feedback regarding line 148, seeing as all the numbers used correspond to the array above, but break the code when I try to use an array. Is that a syntax issue?
// Note: I was wondering if you could give me some suggestions on what to further explore in the realm of computer science for projects like this? especially considering I am going to UBC in the fall as a comp sci major. Thanks.


let x,y,d; // circle parameters
let dy, g, jump; // physics parameters
let squares; // obstacle parameters
let transX, transY, transSpeed; // translate parameters
let pixelSize; // pixel/grid parameters
let groundMagnitude, groundY, ground; // ground parameters
let state, stateChar, stateAir; // various states

function setup() {
  createCanvas(windowWidth, windowHeight);
  state = "start";
  stateChar = "";
  stateAir = false;
  groundMagnitude = height/10;
  pixelSize = groundMagnitude;
  groundY = height - groundMagnitude;
  transX = width/2;
  transY = height - 5*pixelSize;
  transSpeed = 8;
  d = pixelSize;
  x = 2*pixelSize + d/2;
  y = groundY - d / 2;
  dy = 0;
  g = 1;
  jump = 20;
  ground = groundY - d/2;
  squares = [];
}

// resizes user window while sketch is running
function windowResized() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  displaySettings();
  
}

// allows for the game to have a start screen, a playing mode, and an end screen
function displaySettings() {
  if (state === "start") {
    background(0);
    showInstructions();
    transX = 400;
  }
  else if (state === "play") {
    background(135, 206, 235);
    fill(19, 109, 21);
    rect(0, groundY, width, groundY);
    mapTranslation();
    character();  
  }
  else if (state === "end") {
    background(0);
    showInstructions();
  }
}

// tells user what to do during various screens/states
function showInstructions() {
  if (state === "start") {
    fill("white");
    textSize(42);
    textAlign(CENTER, CENTER);
    text("Click the mouse to start!", width/2, height/2);
    textSize(36);
    textAlign(CENTER, CENTER);
    text("Move left with A and right with D, jump with SPACEBAR!", width/2, height - height/4);
  }
  else if (state === "end") {
    fill("white");
    textSize(42);
    textAlign(CENTER, CENTER);
    text("Thanks for playing! Click the mouse to restart!", width/2, height/2);
  }
}

function mousePressed() {
  if (state === "start") {
    state = "play";
  }
  else if (state === "end") {
    state = "start";
  }
}

// generates blocks at "squares"*pixelSize intervals
function obstacles() {
  squares = [0, 4, 5, 6, 7, 8, 14, 19, 24, 29, 36, 37, 38, 41, 42, 43, 44, 47, 48, 49, 50, 51, 52, 57, 58];
  for (let i = 0; i < squares.length; i++) {
    fill(188, 74, 60);
    rect(squares[i]*pixelSize, 0, pixelSize, pixelSize);
  }
}

// responsible for translating everything at the same pace with variables transX & transY
function mapTranslation() {
  push();
  translate(transX, transY);
  screenMovement();
  obstacles();
  airDetect();
  groundDetect();
  pop();
}

// changes the value of transX to move obstacles
function screenMovement() {
  if (keyIsDown(65)) { // a; when user holds "a", the screen moves right
    transX += transSpeed;
  }
  if (keyIsDown(68)) { // d; when user holds "d", the screen moves left
    transX -= transSpeed;
  }
  if (transX <= -3600) {
    state = "end";
  }
}

// draws the actual character and includes the gravity that influences its dy value
function character() {
  fill(255, 0, 0);
  circle(x, y, d);
  y += dy;
  gravity();
}

// detects whether or not the character is in the air
function airDetect() {
  squares = [0, 4, 5, 6, 7, 8, 14, 19, 24, 29, 36, 37, 38, 41, 42, 43, 44, 47, 48, 49, 50, 51, 52, 57, 58];
  for (let i = 0; i < squares.length; i++) {
    if (collideRectCircle(transX, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 4*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 5*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 6*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 7*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 8*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 14*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 19*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 24*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 29*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 36*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 37*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 38*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 41*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY ||collideRectCircle(transX + 42*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 43*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 44*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 47*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 48*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 49*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 50*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 51*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 52*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 57*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY || collideRectCircle(transX + 58*pixelSize, transY, pixelSize, pixelSize, x, y, d) && y + d/2 >= transY && y < transY) {
      stateAir = false;
      stateChar = "blockTop";
    }
    else if (collideRectCircle(0, groundY, width, groundY, x, y, d)) {
      stateAir = false;
    }
    else {
      stateAir = true;
      stateChar = "";
    }
  }
  console.log(stateAir);
  console.log(stateChar);
}

// changes the value of the "ground" based on if the character is on a block or not
function groundDetect() {
  squares = [0, 4, 5, 6, 7, 8, 14, 19, 24, 29, 36, 37, 38, 41, 42, 43, 44, 47, 48, 49, 50, 51, 52, 57, 58];
  for (let i = 0; i < squares.length; i++) {
    if (stateChar === "blockTop" && !stateAir) {
      ground = transY - d/2;
    }
    else {
      ground = groundY - d/2;
    }
  }
  console.log(ground);
}

// jump function
function keyPressed() {
  if (key === " ") {
    if (y >= ground) {
      dy = -jump;
    }
  }
}

// prohibits forever ascent from jump function
function gravity() {
  if (stateAir && y < ground) {
    dy += g;
  }
  else if (y >= ground) {
    dy = 0;
    y = ground;
  }
}

