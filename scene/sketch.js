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
let dx = 1;
let obstacles = [0,0,0,0,0,0,1,1,2,2,3,3,0,0,0,0,0,0,0,0];
let r = 0;
let rx, ry, rw, rh;
let gy;
let x, y, vy;

function setup() {
  createCanvas(400, 400);
  // randomArray();
  x = d/2;
  y = height - ground - d / 2;
  vy = 0;
  gy = height - ground;
}

function draw() {
  background(220); 
  line(0, gy, width, gy);
  xValTrack();
  blockDetect();
  blocks();
  circle(x,y,d);
  gravity();
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
  if (x < d/2) {
    x = d/2;
  }
  if (x > width - d/2) {
    x = width - d/2;
  }
  if (x >= d / 2 && x <= width - d / 2) {
    if (keyIsDown(65)) {
      x -= dx;
    }
    if (keyIsDown(68)) {
      x += dx;
    }
  }
}

function blocks() {
  for (let i = 0; i < 20; i++) {
    rx = i*ground;
    ry = height-(obstacles[i]*ground+ground);
    rw = ground;
    rh = obstacles[i]*ground;
    if (obstacles[i] > 1) {
      rect(rx, ry, rw, rh);
    } 
    if (obstacles[i] === 1) {
      rect(rx, ry, rw, rh);   
    }
  }
}

function randomArray() {
  for (let i = 0; i <= 20; i++) {
    obstacles.push(floor(random(0,6)));
  }
}

function xValTrack() {
  if ((x - d / 2) % 20 === 0) {
    r = 1;
  } 
  else {
    r = 0;
  }
}

function blockDetect() {
  if (r === 1) {
    y = height - ground - d / 2 - obstacles[(x - d / 2) / 20] * ground;
  }
}

function gravity() {
  y += vy;
  if(y < height - ground - d / 2){ // in the air
    vy += g;
  }
  else{
    vy = 0;
    y = height - ground - d / 2;
  }
}

