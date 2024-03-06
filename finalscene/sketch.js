// Geometric Mario-esque game
// Andrew Li
// 
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let x, y, d, dx;
let ground, gx, gy;
let obsWidth, obsHeight, numOb;
let obstacles = [];
let state = "";
function setup() {
  createCanvas(windowWidth, windowHeight);
  state = "start";
  numOb = 20;
  ground = height/10;
  obsWidth = width/numOb;
  obsHeight = obsWidth;
  dx = 5;
  gx = 0;
  gy = height - ground;
  d = obsWidth;
  x = d/2;
  y = gy - d/2; 
}

function draw() {
  background(220);
  line(gx, gy, width, gy);
  randomArray();
  blocks();
  circle(x,y,d);
  moveChar();
}

function blocks() {
  for (let i = 0; i <= numOb; i++) {
    if (obstacles[i] > 0) {
      rect(i*obsWidth, gy-obstacles[i]*obsHeight, obsWidth, obstacles[i]*obsHeight);
    }
  }
}

function randomArray() {
  for (let i = 0; i <= numOb; i++) {
    obstacles.push(floor(random(0,6)));
  }
}

function moveChar() {
  if (x < d/2) {
    x = d/2;
  }
  if (x > width - d/2) {
    x = width - d/2;
  }
  if (x >= d / 2 && x <= width - d / 2) {
    if (keyIsDown(65)) {
      x -= dx;
    }
    if (keyIsDown(68)) {
      x += dx;
    }
  }
}
