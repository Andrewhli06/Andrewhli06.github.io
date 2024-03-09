// Geometric Mario-esque game
// Andrew Li
// 
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x,y,d; // circle parameters
let dx, dy, g, jump; // physics parameters
let rx, ry; // rectangle parameters
let groundMag, gy, ground; // ground parameters
let state, stateChar; // various states
let obstacles = []; // array generating obstacles

function setup() {
  createCanvas(windowWidth, windowHeight);
  groundMag = height/10;
  gy = height - groundMag;
}

function draw() {
  background(220);
  line(0, gy, width, gy);
}