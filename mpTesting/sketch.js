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
    fill("black");
    translate(this.transX, this.transY);
    rotate(this.rotateAngle);
    circle(this.position.x, this.position.y, this.size);
    pop();
  }
  //this is for auto aim/aim assistance if ever there is a need to integrate it.
  // rotate() {
  //   this.rotateX = mouseX - this.transX;
  //   this.rotateY = mouseY - this.transY;
  //   this.rotateAngle = atan2(this.rotateY, this.rotateX) - 90;
  // }
  move() {
    this.position.y += this.dy;
  }
}

class Player {
  constructor(x, y, dx, dy, transX, transY, size) {
    this.position = createVector(x, y);
    this.dx = dx;
    this.dy = dy;
    this.transX = transX;
    this.transY = transY;
    this.size = size;
    this.rotateX = mouseX - this.transX;
    this.rotateY = mouseY - this.transY;
    this.rotateAngle = atan2(this.rotateY, this.rotateX);
  }
  display() {
    push();
    fill("yellow");
    translate(this.transX, this.transY);
    rect(this.position.x, this.position.y, this.size * 2, this.size * 2);
    pop();
    push();
    fill("orange");
    translate(this.transX, this.transY);
    rotate(this.rotateAngle);
    rect(this.position.x, this.position.y, this.size, this.size);
    pop();
  }
  move() {
    if (keyIsDown(87)) {
      this.transY -= this.dy;
    } else if (keyIsDown(83)) {
      this.transY += this.dy;
    } else if (keyIsDown(65)) {
      this.transX -= this.dx;
    } else if (keyIsDown(68)) {
      this.transX += this.dx;
    }
  }
  rotate() {
    this.rotateX = mouseX - this.transX;
    this.rotateY = mouseY - this.transY;
    this.rotateAngle = atan2(this.rotateY, this.rotateX);
  }
  update() {
    character.move();
    character.rotate();
    character.display();
    //console.log(character.transX, character.transY);
  }
}

let dx, dy, tx, ty;
let grid;
let cellSize;
let character;
let bullets = [];
let bulletTravelDistance = 200;
function setup() {
  rectMode(CENTER);
  angleMode(DEGREES);
  createCanvas(600, 600);
  grid = generateGrid(10, 10);
  cellSize = height / 10;
  dx = 3;
  dy = 3;
  tx = width / 2;
  ty = height / 2;
  character = new Player(0, 0, dx, dy, tx, ty, 25);
}

function draw() {
  background(220);
  displayGrid();
  character.update();
  perimeterBarrierDetection();
  //perimeterBulletDeletion(); - still need to figure out
  bulletDeletion();
  for (let bullet of bullets) {
    bullet.display();
    bullet.move();
    //console.log(bullet.transX, bullet.transY);
    //console.log(bullet.rotateAngle);
  }
}

function generateGrid(cols, rows) {
  let emptyGrid = [];
  for (let y = 0; y < cols; y++) {
    emptyGrid.push([]);
    for (let x = 0; x < rows; x++) {
      emptyGrid[y].push(0);
    }
  }
  return emptyGrid;
}

function displayGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 0) {
        rect(
          x * cellSize + cellSize / 2,
          y * cellSize + cellSize / 2,
          cellSize,
          cellSize
        );
      }
    }
  }
}

function perimeterBarrierDetection() {
  if (character.transX - character.size < cellSize) {
    character.transX = cellSize + character.size;
  } else if (character.transY - character.size < cellSize) {
    character.transY = cellSize + character.size;
  } else if (character.transX + character.size > width - cellSize) {
    character.transX = width - cellSize - character.size;
  } else if (character.transY + character.size > height - cellSize) {
    character.transY = height - cellSize - character.size;
  }
}

function perimeterBulletDeletion() {
  for (let someBullet of bullets) {
    let theIndex = bullets.indexOf(someBullet);
    if (someBullet.position.y > width - cellSize) {
      bullets.splice(theIndex, 1);
    }
  }
}

function bulletDeletion() {
  for (let someBullet of bullets) {
    if (
      dist(
        someBullet.position.x,
        someBullet.position.y,
        character.position.x,
        character.position.y
      ) > bulletTravelDistance
    ) {
      let theIndex = bullets.indexOf(someBullet);
      bullets.splice(theIndex, 1);
    }
  }
}

function mousePressed() {
  bullets.push(new Bullet(0, 0, character.transX, character.transY, 1, 5, 5));
}

