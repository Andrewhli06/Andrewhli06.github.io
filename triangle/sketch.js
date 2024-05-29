// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let initialTriangle, depth;

function setup() {
  createCanvas(windowWidth, windowHeight);
  initialTriangle = [
    {x: 700, y: 20},
    {x: 100, y: 780},
    {x: 1300, y: 780}
  ];
  depth = 0;
}

function draw() {
  background(220);
  sierpinski(initialTriangle, depth);
}

function sierpinski(points, depth) {
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);

  if (depth > 0) {
    sierpinski([midpoint(points[0], points[1]), midpoint(points[1], points[2]), points[1]], depth-1);
    sierpinski([midpoint(points[0], points[1]), midpoint(points[0], points[2]), points[0]], depth-1);
    sierpinski([midpoint(points[0], points[2]), midpoint(points[1], points[2]), points[2]], depth-1);
  }
  
}

function midpoint(point1, point2) {
  let x = (point1.x + point2.x) /2;
  let y = (point1.y + point2.y) /2;
  return {x: x, y: y};
}

function mousePressed() {
  if (depth < 7) {
    depth++;
  }
}