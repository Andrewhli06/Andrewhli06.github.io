// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let x,y,d,dx,gy;
let ground;
let obstacleWidth;
let obstacles = [];
let state = "";
function setup() {
  createCanvas(windowWidth, windowHeight);
  state = "start";
  ground = height/8;
  obstacleWidth = width/40;
  gy = height - ground;
  
  line(0, gy, width, gy);
}

function draw() {
  background(220);
}
