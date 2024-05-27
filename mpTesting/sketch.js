class Player {
  constructor(x, y, transX, transY, dx, dy, size) {
    this.position = createVector(x, y);
    this.transX = transX;
    this.transY = transY;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.rotateX = mouseX - this.transX;
    this.rotateY = mouseY - this.transY;
    this.rotateAngle = atan2(this.rotateY, this.rotateX);
  }
  display() {
    push();
    translate(this.transX, this.transY);
    rect(this.position.x, this.position.y, this.size*2, this.size*2);
    pop();
    push();
    fill("red");
    translate(this.transX, this.transY);
    rotate(this.rotateAngle);
    rect(this.position.x, this.position.y, this.size, this.size);
    pop();
  }
  pRotate() {
    this.rotateX = mouseX - this.transX;
    this.rotateY = mouseY - this.transY;
    this.rotateAngle = atan2(this.rotateY, this.rotateX);
  }
  move() {
    if (keyIsDown(87)) {
      this.transY -= this.dy;
    }
    else if (keyIsDown(83)) {
      this.transY += this.dy;
    }
    else if (keyIsDown(65)) {
      this.transX -= this.dx;
    }
    else if (keyIsDown(68)) {
      this.transX += this.dx;
    }
  }
  update() {
    character.move();
    character.pRotate()
    character.display()
  } 
}

class Bullet {
  constructor(x, y, transX, transY, dx, dy, size) { 
    this.position = createVector(x, y);
    this.transX = transX;
    this.transY = transY;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.rotateX = mouseX - this.transX;
    this.rotateY = mouseY - this.transY;
    this.rotateAngle = atan2(this.rotateY, this.rotateX) - 90;
  }
  display() {
    push();
    translate(this.transX, this.transY);
    rotate(this.rotateAngle);
    fill("black");
    circle(this.position.x, this.position.y, this.size);
    pop();
  }
  move() {
    this.position.y += this.dy;
  }
}


let character;
let bullets = [];
let transX, transY;
let dx, dy;
function setup() {
  angleMode(DEGREES);
  rectMode(CENTER);
  dx = 5;
  dy = 5;
  createCanvas(400, 400);
  transX = width/2
  transY = height/2
  character = new Player(0, 0, transX, transY, dx, dy, 20);
}

function draw() {
  background(220);
  character.update();
  wall();
  for (let bullet of bullets) {
    bullet.move();
    bullet.display();
  }
  bulletDetection();
  barrierDetection();
  movement();
}

function mousePressed() {
  bullets.push(new Bullet(0, 0, transX, transY, dx, dy, 5));
}

function movement() {
  if (keyIsDown(87)) {
    transY -= dy;
  }
  else if (keyIsDown(83)) {
    transY += dy;
  }
  else if (keyIsDown(65)) {
    transX -= dx;
  }
  else if (keyIsDown(68)) {
    transX += dx;
  }
}

function wall() {
  rect(width - 25, height/2, 50, 100);
}

function bulletDetection() {
  for (let bullet of bullets) {
    if (collideRectCircle(width - 25, height/2, 50, 100, bullet.position.x, bullet.position.y, bullet.size)) {
      console.log("hit");
    }
  }

}

function barrierDetection() {
  if (collideRectRect(character.position.x, character.position.y, character.size*2, character.size*2, width - 25, height/2, 50, 100)) {
    console.log("wall");
  }
}