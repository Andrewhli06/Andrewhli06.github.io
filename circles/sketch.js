// Arrays and Object Notation
// Circles demo

let ball;

function setup() {
  createCanvas(windowWidth, windowHeight);

  ball = {
    x: width/2,
    y: height/2,
    radius: random(15, 30),
    color: color(random(255), random(255), random(255)),
    dx: random(-5, 5),
    dy: random(-5, 5),
  };
}

function draw() {
  background(220);
}
