// Perlin noise terrain generation demo; Object notation and arrays

let terrain = [];
let numberofRects;
let rectWidth;

function setup() {
  createCanvas(windowWidth, windowHeight);
  numberofRects = 1000;
  rectWidth = width/numberofRects;
  generateTerrain();
}

function draw() {
  background(220);

  for (let someRect of terrain) {
    rect(someRect.x, someRect.y, someRect.w, someRect.h);
  }
}

function generateTerrain() {
  let time = 0;
  let dt = 0.005;

  for (let x = 0; x < width; x += rectWidth) {
    let theHeight = noise(time) * height;
    spawnRectangle(x, theHeight);
    time += dt;
  }
}

function spawnRectangle(leftSide, rectHeight) {
  let thisRect = {
    x: leftSide,
    y: height - rectHeight,
    w: rectWidth,
    h: rectHeight,
  };
  terrain.push(thisRect);
}
