//walker demo

class Walker {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.stepSize = 5;
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

let character;
let char2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  character = new Walker(width/2, height/2, "red");
  char2 = new Walker(width/4, height/4, "blue");
  noStroke();
  
}

function draw() {
  character.move();
  char2.move();
  character.display();
  char2.display();
}
