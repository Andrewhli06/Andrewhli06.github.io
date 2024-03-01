// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let g = 1; // Gravity
let jump = 15; // Jump power
let ground = 20;
let d = 20;
let dx = 3;

let x, y, vy;

function setup() {
  createCanvas(400, 400);
  
  x = width / 2;
  y = height - ground - d / 2;
  vy = 0;
}

function draw() {
  background(220);
  
  let gy = height - ground;
  line(0, gy, width, gy);
  blocks();
  circle(x,y,d);
  
  y += vy;

  
  if(y < height - ground - d / 2){ // in the air
    vy += g;
  }
  else{
    vy = 0;
    y = height - ground - d / 2;
  }
  moveChar();

}

function keyPressed(){
  if (key === " ") {
    if(y >= height - ground - d / 2){ // on the ground
      vy = -jump; 
    }
  }
}

function moveChar() {
  if (keyIsDown(65)) {
    x -= dx;
  }
  if (keyIsDown(68)) {
    x += dx;
  }
}

function blocks() {
  square(100, height-2*ground, ground)
}

function collisionDetect() {
  
}