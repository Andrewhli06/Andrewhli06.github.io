// bubble movement demo
// object notation and arrays
// march 25, 2024

let theBubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  for (let i = 0; i < 5; i++) {
    spawnBubble();
  }

  // spawn new bubble every half second
  window.setInterval(spawnBubble, 500);
}

function draw() {
  background(220);

  // moveBubbles();
  noiseMovement();
  displayBubbles();
}

function mousePressed() {
  for (let i = theBubbles.length - 1; i >= 0; i--) {
    if (clickedInBubble(mouseX, mouseY, theBubbles[i])) {
      theBubbles.splice(i, 1);
    }
  }
}

function clickedInBubble(x, y, someBubble) {
  let distanceAway = dist(x, y, someBubble.x, someBubble.y);
  let radius = someBubble.size/2;
  return distanceAway < radius;
}

function noiseMovement() {
  for (let bubble of theBubbles) {
    let x = noise(bubble.timeX) * width;
    let y = noise(bubble.timeY) * height;

    bubble.x = x;
    bubble.y = y;

    bubble.timeX += bubble.dt;
    bubble.timeY += bubble.dt;
  }
}


function moveBubbles() {
  for (let bubble of theBubbles) {
    let choice = random(100);
    if (choice < 25) {
      // move up
      bubble.y -= bubble.speed;
    }
    else if (choice < 50) {
      bubble.y += bubble.speed;
    }
    else if (choice < 75) {
      bubble.x += bubble.speed;
    }
    else {
      bubble.x -= bubble.speed;
    }
  }
}

function displayBubbles() {
  for (let bubble of theBubbles) {
    fill(bubble.r, bubble.g, bubble.b, bubble.alpha);
    circle(bubble.x, bubble.y, bubble.size);
  }
}

function spawnBubble() {
  let someBubble = {
    size: random(10, 30),
    x: random(width),
    y: random(height),
    speed: 3,
    r: random(255),
    g: random(255),
    b: random(255),
    alpha: random(255),
    timeX: random(1000000),
    timeY: random(1000000),
    dt: 0.0001,
  };
  theBubbles.push(someBubble);
}