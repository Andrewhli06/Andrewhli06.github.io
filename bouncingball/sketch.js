// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let x;
let y;
let dx;
let dy;
let radius = 25;
let randR;
let randG;
let randB;
let state = "start screen";

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  noStroke();
  randColor();
  randVelo();
}

function draw() {
  if (state === "start screen") {
    background("black");
    showInstructions();
  }
  else if (state === "bouncing ball") {
    background(220);
    drawCircle();
    moveCircle();
    bounceCircle();
  }
}

function showInstructions() {
  fill("white");
  textSize(42);
  textAlign(CENTER, CENTER);
  text("Click the mouse to start!", width/2, height/2);
}

function mousePressed() {
  if (state === "start screen") {
    state = "bouncing ball";
  }
  else if (state === "bouncing ball") {
    state = "start screen";
  }
}

function drawCircle() {
  // display circle
  fill(randR, randG, randB);
  circle(x, y, 2*radius);
}

function moveCircle() {
  // move circle
  x += dx;
  y += dy;
}

function bounceCircle() {
  //bounce circle
  if (x + radius >= width || x - radius <= 0) {
    randColor();
    dx = -1 * dx;
  }
  if (y + radius >= height || y - radius <= 0) {
    randColor();
    dy= -1 * dy;
  }
}

//randomly change velocity everytime program runs
function randVelo() {
  dx = random(1,25);
  dy = random(1,25);
}
//randomly change circle colour upon wall contact
function randColor() {
  randR = random(0,255);
  randG = random(0,255);
  randB = random(0,255);
}