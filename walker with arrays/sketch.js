//walker demo

class Walker {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.stepSize = 10;
    this.color = color;
    this.radius = 5;
  }
  display() {
    fill(this.color);
    circle(this.x, this.y, this.radius*2);
  }
  move() {
    let choice = random(100);
    if (choice < 25) {
      this.y -= this.stepSize;
    }
    else if (choice < 50) {
      this.y += this.stepSize;
    }
    else if (choice < 75) {
      this.x += this.stepSize;
    }
    else {
      this.x -= this.stepSize;
    }
  }
}

let theWalkers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
}

function draw() {
  for (let someWalker of theWalkers) {
    someWalker.move();
    someWalker.display();
  }
}

function mousePressed() {
  let theColor = color(random(255), random(255), random(255));
  let myWalker = new Walker(mouseX, mouseY, theColor);
  theWalkers.push(myWalker);
}