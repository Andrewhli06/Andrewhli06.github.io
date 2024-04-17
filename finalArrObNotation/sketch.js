// Aimlabs-inspired aim trainer
// Andrew Li
// April
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// NTS: make custom graphics?

let theTargets = [];
let popSound;
let setupState = "";
let state = "";
let WEBGL_text;

function preload() {
  popSound = loadSound("pop-sound.MP3");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  cursor(CROSS);
  state = "startScreen";
}

function windowResized() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  cursor(CROSS);
}


function draw() {
  displaySettings();
}

function displaySettings() {
  if (state === "startScreen") {
    showInstructions();
  }
}

function showInstructions() {
  background(0);
  WEBGL_text = createGraphics(windowWidth, windowHeight);
  WEBGL_text.textFont("Source Code Pro");
  WEBGL_text.textAlign(CENTER);
  WEBGL_text.textSize(42);
  WEBGL_text.fill(255);
  WEBGL_text.text("test", width/2, height/2);
}

function targetSetup() {
  if (setupState === "singleShot") {
    spawnTargets();
    setupState = "play";
  }
  else if (setupState === "gridShot") {
    for (let i = 0; i < 5; i++) {
      spawnTargets();
    }
    setupState = "play";
  }
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
      popSound.play();
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