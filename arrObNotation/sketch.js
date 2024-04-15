// Aimlabs inspired target practice game
// Andrew Li
// April
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let theTargets = [];


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  for (let i = 0; i < 5; i++) {
    spawnTargets();
  }
  cursor(CROSS);
}

function windowResized() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  cursor(CROSS);
}


function draw() {
  background(220);
  displayTargets();
}

function mousePressed() {
  for (let target of theTargets) {
    if (mouseX < target.transX  + width/2 + target.size && 
      mouseX > target.transX + width/2 - target.size && 
      mouseY < target.transY + height/2 + target.size && 
      mouseY > target.transY + height/2 - target.size) {
      let theIndex = theTargets.indexOf(target);
      theTargets.splice(theIndex, 1);
      spawnTargets();
    }
  }
}

function displayTargets() {
  for (let target of theTargets) {
    push();
    ambientMaterial(255);
    directionalLight(target.r, target.g, target.b, target.lightX, target.lightY, target.lightZ);
    translate(target.transX, target.transY);
    sphere(target.size);
    pop();
  }
}


function spawnTargets() {
  let someTarget = {
    size: 20,
    transX: random(-100, 100),
    transY: random(-100, 100),
    // speed: 3,
    r: 0,
    g: 255,
    b: 255,
    lightX: 0,
    lightY: 0,
    lightZ: -100,
  };
  theTargets.push(someTarget);
}