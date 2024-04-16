// Aimlabs-inspired aim trainer
// Andrew Li
// April
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// NTS: make custom graphics?

let theTargets = [];
let state = "";

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  state = "startScreen";
}

function windowResized() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  cursor(CROSS);
}

function draw() {
  displaySettings();
  gameModes();
  console.log(state);
}

function displaySettings() {
  if (state === "startScreen") {
    background(0);
  }
  else if (state === "gameModeChoice") {
    background(220);
  }
}

function gameModes() {
  if (state === "singleShot") {
    noLoop();
    spawnTargets();
    displayTargets();
  }
}

function mousePressed() {
  if (state === "startScreen") {
    state = "gameModeChoice";
  }
  else if (state === "gameModeChoice" && mouseX < width/2) { // change the parameter to conform to graphic later. width/2 is just a temp param
    state = "singleShot";
    cursor(CROSS);
  }
  else if (state === "gameModeChoice" && mouseX > width/2) { // change the parameter to conform to graphic later. width/2 is just a temp param
    state = "gridShot";
    cursor(CROSS);
  }
  else if (state === "singleShot") {
    for (let target of theTargets) {
      if (mouseX < target.transX  + width/2 + target.size && 
        mouseX > target.transX + width/2 - target.size && 
        mouseY < target.transY + height/2 + target.size && 
        mouseY > target.transY + height/2 - target.size) {
        theTargets.pop();
        spawnTargets();
      }
    }
  }
}

function displayTargets() {
  if (state === "singleShot") {
    for (let target of theTargets) {
      push();
      ambientMaterial(255);
      directionalLight(target.r, target.g, target.b, target.lightX, target.lightY, target.lightZ);
      translate(target.transX, target.transY);
      sphere(target.size);
      pop();
    }
  }
}

function spawnTargets() {
  if (state === "singleShot") {
    let someTarget = {
      size: 20,
      transX: random(-100, 100),
      transY: random(-100, 100),
      r: 0,
      g: 255,
      b: 255,
      lightX: 0,
      lightY: 0,
      lightZ: -100,
    };
    theTargets.push(someTarget);
  }
}