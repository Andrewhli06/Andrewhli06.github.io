// Project Title
// Andrew Li
// April
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let theTargets = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  window.setInterval(spawnTargets, 500);
}

function draw() {
  background(220);
  cursor(CROSS);
  displayTargets();

}

function mousePressed() {
  theTargets.pop();
}

function displayTargets() {
  for (let target of theTargets) {
    ambientMaterial(255);
    directionalLight(target.r, target.g, target.b, target.lightX, target.lightY, target.lightZ);
    translate(target.transX, target.transY);
    sphere(target.size);
  }
}

function spawnTargets() {
  let someTarget = {
    size: 30,
    transX: random(-50, 50),
    transY: random(-50, 50),
    speed: 3,
    r: 0,
    g: 255,
    b: 255,
    lightX: 0,
    lightY: 0,
    lightZ: -100,
    timeX: random(1000000),
    timeY: random(1000000),
    dt: 0.001,
  };
  theTargets.push(someTarget);
}