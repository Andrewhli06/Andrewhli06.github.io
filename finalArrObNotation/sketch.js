// Aimlabs-inspired aim trainer
// Andrew Li
// April 16, 2024
//
// Extra for Experts:
// - WEBGL mode 3D objects (which includes the use of not only spheres, but ambient material, and directional light)
// - Changing the cursor (not really that special but wasn't covered in class)

// Notes/questions for future projects:
// - Orignally, I was going to include state variables for a start screen and what not, but I realized that I don't know how to implement text in WEBGL mode. I tried referencing a demo, but it did not work.
// - After discussing how to avoid targets spawning inside of eachother, I felt like I had a grasp of how to do it. But turns out I don't know how to, especially given the Z plane.
// - That being said, despite those limitations, I still believe that my assignment sufficiently fulfills the array and object notation requirements.

let theTargets = []; //an array containing the information for all the targets
let popSound; // variable for the pop sound effect

function preload() {
  popSound = loadSound("pop-sound.MP3");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); //WEBGL mode allows rendering of 3D objects
  noStroke();
  for (let i = 0; i < 5; i++) {
    spawnTargets();
  }
  cursor(CROSS); // changes cursor to ressemble crosshair
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

// destroys which ever target is clicked on, and spawns one in its place (random location)
function mousePressed() {
  for (let target of theTargets) {
    if (mouseX < target.transX  + width/2 + target.size && 
      mouseX > target.transX + width/2 - target.size && 
      mouseY < target.transY + height/2 + target.size && 
      mouseY > target.transY + height/2 - target.size) { //same functionality as a dist function, helps detect if the mouse is currently within the sphere
      let theIndex = theTargets.indexOf(target);
      theTargets.splice(theIndex, 1);
      spawnTargets();
      popSound.play();
    }
  }
}

// gives each target a unique location
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

// assigns information to a target (element in the array "theTargets"), and pushes the element into the array
function spawnTargets() {
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