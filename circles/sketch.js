// Arrays and Object Notation
// Circles demo

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  moveBalls();
  displayBalls();
}

function mousePressed() {
  spawnBalls(mouseX, mouseY);
}

function moveBalls() {
  for (let ball of ballArray) {
    ball.x += ball.dx;
    ball.y += ball.dy;
  
    // teleport across screen if needed
    if (ball.y - ball.radius > windowHeight) {
      ball.y = 0;
    }
    else if (ball.y + ball.radius< 0) {
      ball.y = windowHeight;
    }
    else if (ball.x  - ball.radius > windowWidth) {
      ball.x = 0;
    }
    else if (ball.x  + ball.radius < 0) {
      ball.x = windowWidth;
    }
  }
}

function displayBalls() {
  for (let ball of ballArray) {
    fill(ball.color);
    circle(ball.x, ball.y, ball.radius*2);
  }
}

function spawnBalls(initialX, initialY) {
  let ball = {
    x: initialX,
    y: initialY,
    radius: random(15, 30),
    color: color(random(255), random(255), random(255)),
    dx: random(-5, 5),
    dy: random(-5, 5),
  };
  ballArray.push(ball);
}