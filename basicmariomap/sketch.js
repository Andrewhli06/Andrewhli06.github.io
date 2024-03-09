// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rx, ry, dx, cx;

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(windowWidth,windowHeight);
  rx = width/2;
  ry = height/2;
  dx = 5;
  cx = rx;
}

function draw() {
  background(220);
  translate(cx, ry);
  obstacles();
  mapTranslation();
}

function obstacles() {
  rect(0, 0, 50, 50);
}

function mapTranslation() {
  if (keyIsDown(65)) {
    cx++;
  }
  if (keyIsDown(68)) {
    cx--;
  }
  console.log(cx);
} 