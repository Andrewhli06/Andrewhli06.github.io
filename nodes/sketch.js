// Connected nodes demo

let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  points.push(new MovingPoint(width/2, height/2));
}

function draw() {
  background(0);

  for (let point of points) {
    point.update();
    point.join(points);
  }
  for (let point of points) {
    point.display();
  }
}

class MovingPoint {
  constructor(x, y) {
    this.speed = 5;
    this.radius = 15;
    this.maxRadius = 50;
    this.minRadius = 15;
    this.reach = 150;
    this.x = x;
    this.y = y;
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.01;
    this.color = color(random(255), random(255), random(255));
  }
  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius);
  }
  update() {
    this.move();
    this.wrap();
    this.adjust();
  }
  join(pointsArray) {
    for (let otherPoint of pointsArray) {
      if (this !== otherPoint) {
        let pointDistance = dist(this.x, this.y, otherPoint.x, otherPoint.y);
        if (pointDistance < this.reach) {
          stroke("white");
          line(this.x, this.y, otherPoint.x, otherPoint.y);
        }
      }
    }
  }
  move() {
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    this.dx = map(dx, 0, 1, -this.speed, this.speed);
    this.dy = map(dy, 0, 1, -this.speed, this.speed);

    this.x += this.dx;
    this.y += this.dy;

    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }
  wrap() {
    if (this.y > height) {
      this.y -= height;
    }
    else if (this.y < 0) {
      this.y += height;
    }
    else if (this.x > width) {
      this.x -= width;
    }
    else if (this.x < 0) {
      this.x += width;
    }
  }
  adjust() {
    let mouseDistance = dist(this.x, this.y, mouseX, mouseY);
    if (mouseDistance < this.reach) {
      let theSize = map(mouseDistance, 0, this.reach, this.maxRadius, this.minRadius);
      this.radius = theSize;
    }
    else {
      this.radius = this.minRadius;
    }
  }
}

function mousePressed() {
  points.push(new MovingPoint(mouseX, mouseY));
}