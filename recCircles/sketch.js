// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  recursiveCircle(width/2, height/2, mouseX)
}

function recursiveCircle(x, y, r) {
  circle(x, y, r*2)

  if (r > 30) {
    recursiveCircle(x - r/2, y, r/2)
    recursiveCircle(x + r/2, y, r/2)
    recursiveCircle(x, y - r/2, r/2)
    recursiveCircle(x, y + r/2, r/2)
  } 
}