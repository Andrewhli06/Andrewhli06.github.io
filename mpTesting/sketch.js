class Bullet {
  constructor(x, y, transX, transY, dx, dy, size) { 
    this.position = createVector(x, y);
    this.transX = transX;
    this.transY = transY;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    // this.rotateX = mouseX - this.transX;
    // this.rotateY = mouseY - this.transY;
    // this.rotateAngle = atan2(this.rotateY, this.rotateX) - 90;
  }
  display() {
    push();
    translate(this.transX, this.transY);
    //rotate(this.rotateAngle);
    fill("black");
    circle(this.position.x, this.position.y, this.size);
    pop();
  }
  move() {
    this.transY += this.dy;
  }
}

let bullets = [];
let transX, transY;
let dx, dy;
function setup() {
  rectMode(CORNER)
  createCanvas(400, 400);
  dx = 1;
  dy = 1;
  transX = width/2
  transY = height/2
}

function draw() {
  background(220);
  for (let bullet of bullets) {
    bullet.move();
    bullet.display();
  }
  wall();
  bulletDetection();
}

function mousePressed() {
  bullets.push(new Bullet(0, 0, transX, transY, dx, dy, 5));
}

function wall() {
  rect(0, height-25, width, 25)
}

function bulletDetection() {
  for (let bullet of bullets) {
    if (collideRectCircle(0, height-25, width, 25, bullet.transX, bullet.transY, bullet.size)) {
      console.log("hit");
      bullet.dy = 0;
    }
    console.log(bullet.transX, bullet.transY);
  }

}