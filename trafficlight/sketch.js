// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let g = 3000;
let y = 1000;
let r = 2000;
let state = "";

function setup() {
  createCanvas(100, 300);
  state = "green";
}

function draw() {
  background(255);
  drawOutlineOfLights();
  trafficLight();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width / 2, height / 2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width / 2, height / 2 - 65, 50, 50); //top
  ellipse(width / 2, height / 2, 50, 50); //middle
  ellipse(width / 2, height / 2 + 65, 50, 50); //bottom
}

function trafficLight() {
  if (state === "green") {
    if (millis() < g) {
      fillCircle();
    } else {
      state = "yellow";
      y = 1000 + millis();
    }
  }
  if (state === "yellow") {
    if (millis() < y) {
      fillCircle();
    } else {
      state = "red";
      r = 2000 + millis();
    }
  }
  if (state === "red") {
    if (millis() < r) {
      fillCircle();
    } else {
      state = "green";
      g = 3000 + millis();
    }
  }
}

function fillCircle() {
  fill(state)
  if (state === "green") {
    ellipse(width / 2, height / 2 + 65, 50, 50);
  }
  else if (state === "yellow") {
    ellipse(width / 2, height / 2, 50, 50);
  }
  else {
    ellipse(width / 2, height / 2 - 65, 50, 50);
  }
}
