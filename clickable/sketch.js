//clickable demo

let button;

function setup() {
  createCanvas(windowWidth, windowHeight);
  button = new Clickable();
  button.locate(width/2, height/2)

}

function draw() {
  background(220);

  button.draw();
}
