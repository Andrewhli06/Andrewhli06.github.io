// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let theTargets = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  cursor(CROSS);
  generateGrid();
}

function draw() {
  // background(220);
  // displayTargets();
  
}

function mousePressed() {
  for (let i = theTargets.length - 1; i >= 0; i--) {
    if (hitTarget(mouseX, mouseY, theTargets[i])) {
      if (mouseX < theTargets[i].transX  + width/2 + theTargets[i].size && 
      mouseX > theTargets[i].transX + width/2 - theTargets[i].size && 
      mouseY < theTargets[i].transY + height/2 + theTargets[i].size && 
      mouseY > theTargets[i].transY + height/2 - theTargets[i].size) {
        theTargets.splice(i, 1);
      }
    }
  }
}

function hitTarget(x, y, someTarget) {
  let distanceAway = dist(x, y, someTarget.transX, someTarget.transY);
  let radius = someTarget.size;
  return distanceAway < radius;
}

function generateGrid() {
  spawnTargets();
  ambientMaterial(255);
  directionalLight(theTargets[0].r, theTargets[0].g, theTargets[0].b, theTargets[0].lightX, theTargets[0].lightY, theTargets[0].lightZ);
  translate(theTargets[0].transX, theTargets[0].transY);
  sphere(theTargets[0].size);
  for (let i = 1; i <= 4; i++) {
    spawnTargets();
    ambientMaterial(255);
    translate(theTargets[i].transX, theTargets[i].transY);
    sphere(theTargets[i].size);
  }
}

function spawnTargets() {
  let someTarget = {
    size: 20,
    transX: random(-170, 170),
    transY: random(-100, 150),
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