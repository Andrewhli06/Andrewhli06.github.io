// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let g = 1; // Gravity
let jump = 15; // Jump power
let ground = 20;
let d = 20;
let dx = 1;
let obstacles = [0,0,0,0,0,0,1,1,2,2,3,3,0,0,0,0,0,0,0,0];
let r = 0;
let rx, ry, rw, rh;
let gy;
let x, y, vy;

function setup() {
  createCanvas(400, 400);
  // randomArray();
  x = d/2;
  y = height - ground - d / 2;
  vy = 0;
  gy = height - ground;
}

function draw() {
  background(220); 
  line(0, gy, width, gy);
  //xValTrack();
  //blockDetect();
  //blocks();
  //circle(x,y,d);
  //gravity();
  //moveChar();

}

// function keyPressed(){
//   if (key === " ") {
//     if(y >= height - ground - d / 2){ // on the ground
//       vy = -jump; 
//     }
//   }
// }

// function moveChar() {
//   if (x < d/2) {
//     x = d/2;
//   }
//   if (x > width - d/2) {
//     x = width - d/2;
//   }
//   if (x >= d / 2 && x <= width - d / 2) {
//     if (keyIsDown(65)) {
//       x -= dx;
//     }
//     if (keyIsDown(68)) {
//       x += dx;
//     }
//   }
// }

// function blocks() {
//   for (let i = 0; i < 20; i++) {
//     rx = i*ground;
//     ry = height-(obstacles[i]*ground+ground);
//     rw = ground;
//     rh = obstacles[i]*ground;
//     if (obstacles[i] > 1) {
//       rect(rx, ry, rw, rh);
//     } 
//     if (obstacles[i] === 1) {
//       rect(rx, ry, rw, rh);   
//     }
//   }
// }

// function randomArray() {
//   for (let i = 0; i <= 20; i++) {
//     obstacles.push(floor(random(0,6)));
//   }
// }

// function xValTrack() {
//   if ((x - d / 2) % 20 === 0) {
//     r = 1;
//   } 
//   else {
//     r = 0;
//   }
// }

// function blockDetect() {
//   if (r === 1) {
//     y = height - ground - d / 2 - obstacles[(x - d / 2) / 20] * ground;
//   }
// }

// function gravity() {
//   y += vy;
//   if(y < height - ground - d / 2){ // in the air
//     vy += g;
//   }
//   else{
//     vy = 0;
//     y = height - ground - d / 2;
//   }
// }

// // copy of og final scene
// // let g = 1; // Gravity
// // let jump = 15; // Jump power
// // let ground = 20;
// // let d = 20;
// // let dx = 1;
// // let obstacles = [0,0,0,0,0,0,1,1,2,2,3,3,0,0,0,0,0,0,0,0];
// // let r = 0;
// // let rx, ry, rw, rh;
// // let gy;
// // let x, y, vy, oy;

// // function setup() {
// //   createCanvas(windowWidth, windowHeight);
// //   // randomArray();
// //   x = d/2;
// //   y = height - ground - d / 2;
// //   oy = height - ground - d / 2;
// //   vy = 0;
// //   gy = height - ground;
// // }

// // function draw() {
// //   background(220); 
// //   line(0, gy, width, gy);
// //   xValTrack();
// //   blockDetect();
// //   blocks();
// //   console.log(x,y,d);
// //   circle(x,y,d);
// //   // gravity();
// //   moveChar();

// // }

// // function keyPressed(){
// //   if (key === " ") {
// //     if(y >= oy){ // on the ground
// //       vy = -jump; 
// //     }
// //   }
// // }

// // function moveChar() {
// //   if (x < d/2) {
// //     x = d/2;
// //   }
// //   if (x > width - d/2) {
// //     x = width - d/2;
// //   }
// //   if (x >= d / 2 && x <= width - d / 2) {
// //     if (keyIsDown(65)) {
// //       x -= dx;
// //     }
// //     if (keyIsDown(68)) {
// //       x += dx;
// //     }
// //   }
// // }

// // function blocks() {
// //   for (let i = 0; i < 20; i++) {
// //     rx = i*ground;
// //     ry = height-(obstacles[i]*ground+ground);
// //     rw = ground;
// //     rh = obstacles[i]*ground;
// //     if (obstacles[i] > 1) {
// //       rect(rx, ry, rw, rh);
// //     } 
// //     if (obstacles[i] === 1) {
// //       rect(rx, ry, rw, rh);   
// //     }
// //   }
// // }

// // // function randomArray() {
// // //   for (let i = 0; i <= 20; i++) {
// // //     obstacles.push(floor(random(0,6)));
// // //   }
// // // }

// // function xValTrack() {
// //   if ((x - d/2) % 20 === 0) {
// //     r = 1;
// //   } 
// //   else {
// //     r = 0;
// //   }
// // }

// // function blockDetect() {
// //   if (r === 1) {
// //     y = oy - obstacles[(x - d / 2) / 20] * ground;
// //   }
// // }

// // function gravity() {
// //   y += vy;
// //   if(y < height - ground - d / 2){ // in the air
// //     vy += g;
// //   }
// //   else{
// //     vy = 0;
// //     y = height - ground - d / 2;
// //   }
// // }

// // Second iteration of final scene
// // let x,y,d; // circle parameters
// // let dx, dy, g, jump; // physics parameters
// // let rx, ry; // rectangle parameters
// // let groundMag, gy, ground; // ground parameters
// // let state, stateChar; // various states
// // let obstacles = []; // array generating obstacles

// // function setup() {
// //   createCanvas(windowWidth, windowHeight);
// //   rx = width/2;
// //   ry = height/2;
// //   groundMag = height/10;
// //   gy = height - groundMag;
// //   dx = 5;
// //   dy = 0;
// //   g = 0.5;
// //   jump = 10;
// //   d = 20;
// //   x = d/2;
// //   y = gy - d/2;
// // }

// // function windowResized() {
// //   createCanvas(windowWidth, windowHeight);
// // }

// // function draw() {
// //   background(220);
// //   line(0, gy, width, gy);
// //   rect(rx, ry, 60, ry-groundMag);
// //   circle(x, y, d);
// //   gravity();
// //   obstacleDetect();
// //   moveChar();
// //   obstacleParameters();
// //   groundDef();
// //   console.log(dy);
// //   y += dy;
// // }

// // function obstacleDetect() {
// //   if (collideRectCircle(rx, ry, 60, ry-groundMag, x, y, d) && y === gy - d /2) {
// //     stateChar = "groundBlock";
// //   }
// //   else if (collideRectCircle(rx, ry, 60, ry-groundMag, x, y, d) && y === ry - d/2)  {
// //     stateChar = "blockTop";
// //   }
// //   else if (collideRectCircle(rx, ry, 60, ry-groundMag, x, y, d) && (y > gy - d/2 && y < ry - d/2)) {
// //     stateChar = "blockSide";
// //   }
// //   else if (collideLineCircle(0, gy, width, gy, x, y, d)) {
// //     stateChar = "ground";
// //   }
// //   else if (!collideRectCircle(rx, ry, 60, ry-groundMag, x, y, d) && !collideLineCircle(0, gy, width, gy, x, y, d)) {
// //     stateChar = "air";
// //   }
// //   console.log(stateChar);
// // }

// // function moveChar() {
// //   if (stateChar === "groundBlock" || stateChar === "blockSide") {
// //     if (x <= rx - d/2) {
// //       x = rx - d/2 - dx;
// //     }
// //     else if (x >= rx + 60 + d/2) {
// //       x = rx + d/2 + dx;
// //     }
// //   }
// //   else if (x < d/2) {
// //     x = d/2 + dx;
// //   }
// //   else if (x > width - d/2) {
// //     x = width - d/2 - dx;
// //   }
// //   else if (x >= d / 2 && x <= width - d / 2) {
// //     if (keyIsDown(65)) {
// //       x -= dx;
// //     }
// //     if (keyIsDown(68)) {
// //       x += dx;
// //     }
// //   }
// // }

// // function obstacleParameters() {
// //   if (stateChar === "groundBlock") {
// //     dy = 0;
// //     y = ry - d/2;
// //   }
// // }

// // function groundDef() {
// //   if (stateChar === "ground") {
// //     ground = gy - d/2;
// //   }
// //   else if (stateChar === "blockTop") {
// //     ground = ry - d/2;
// //   }
// //   else if (stateChar === "air" && (x > rx + 60 + d / 2 || x < rx - d / 2)) {
// //     ground = gy - d / 2;
// //   }
// // }

// // function gravity() {
// //   if (stateChar === "air" && y < ground) {
// //     y += dy;
// //     dy += g;
// //   }
// //   if (y > ground) {
// //     dy = 0;
// //     y = ground;
// //   }
// // }

// // function keyPressed(){
// //   if (key === " ") {
// //     if(y >= ground){ // on the ground
// //       dy = -jump; 
// //     }
// //   }
// // }

// let x,y,d; // circle parameters
// let dx, dy, g, jump; // physics parameters
// let obX, obY, obSqHeight, obSq, obSqDistX, obSqDistY, obRectHeight, obRect; // obstacle parameters
// let tx, ty, tSpeed; // translate parameters
// let pSize; // pixel/grid parameters
// let groundMag, gy, ground; // ground parameters
// let state, stateChar, stateAir, stateObHeight; // various states

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   state = "start";
//   stateChar = "";
//   stateAir = false;
//   groundMag = height/10;
//   pSize = groundMag;
//   gy = height - groundMag;
//   tx = width/2;
//   ty = height - 5*pSize;
//   tSpeed = 10;
//   d = pSize;
//   x = 2*pSize + d/2;
//   y = gy - d / 2;
//   dy = 1;
//   dx = 2;
//   g = 1;
//   jump = 15;
//   ground = gy - d/2;
//   obSqHeight = [];
//   obSq = [];
//   obSqDistX = [];
//   obSqDistY = [];
//   obRectHeight = [];
//   obRect = [];
// }

// // resizes user window while sketch is running
// function windowResized() {
//   createCanvas(windowWidth, windowHeight);
// }

// function draw() {
//   displaySettings();
//   // console.log(obSqDistX.length, obSqDistY.length);
//   // console.log(obSq[0]*pSize, -1*obSqHeight[0]*pSize, obX, obY);
//   // console.log(tx, ty);
//   console.log(tx);
// }

// // allows for the game to have a start screen and a playing mode
// function displaySettings() {
//   if (state === "start") {
//     background(0);
//     showInstructions();
//   }
//   else if (state === "play") {
//     background(220);
//     line(0, gy, width, gy);
//     mapTranslation();
//     character();  
//   }
// }

// // tells user what to do during start screen
// function showInstructions() {
//   fill("white");
//   textSize(42);
//   textAlign(CENTER, CENTER);
//   text("Click the mouse to start!", width/2, height/2);
// }

// function mousePressed() {
//   if (state === "start") {
//     state = "play";
//   }
// }

// // generates an assortment of 124 blocks (Sq: square, Rect: rectangle), backbone of the creation of the map
// function obstacles() {
//   obSq = [0, 5, 6, 7, 7, 8, 9, 37, 38, 39, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 58, 59, 60, 61, 62, 62, 69, 70, 76, 80, 80, 84, 90, 93, 94, 95, 100, 101, 101, 102, 102, 103, 108, 109, 109, 110, 110, 110, 111, 111, 111, 111, 114, 114, 114, 114, 115, 115, 115, 116, 116, 117, 126, 127, 127, 128, 128, 128, 129, 129, 129, 129, 132, 132, 132, 132, 133, 133, 133, 134, 134, 135, 145, 146, 147, 148, 156, 157, 157, 158, 158, 158, 159, 159, 159, 159, 160, 160, 160, 160, 160, 161, 161, 161, 161, 161, 161, 162, 162, 162, 162, 162, 162, 162, 163, 163, 163, 163, 163, 163, 163, 163];
//   obSqHeight = [0, 0, 0, 0, 3, 0, 0, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, 1, -1, -1, -1, 1, 1, 1, 1, 1, -1, 1, -1, 1, -3, -3, -2, -3, -2, -1, -3, -2, -1, 0, 0, -1, -2, -3, -1, -2, -3, -2, -3, -3, -3, -3, -2, -3, -2, -1, -3, -2, -1, 0, 0, -1, -2, -3, -1, -2, -3, -2, -3, -3, -1, -1, -1, -1, -3, -3, -2, -3, -2, -1, -3, -2, -1, 0, -3, -2, -1, 0, 1, -3, -2, -1, 0, 1, 2, -3, -2, -1, 0, 1, 2, 3, -3, -2, -1, 0, 1, 2, 3, 4];
//   obRect = [14, 19, 24, 29, 141, 155];
//   obRectHeight = [1.5, 2.5, 3.5, 3.5, 0.5, 0.5];
//   for (let i = 0; i <= obSq.length; i++) {
//     rect(obSq[i]*pSize, -1*obSqHeight[i]*pSize, pSize, pSize);
//   }
//   for (let i = 0; i <= obRect.length; i++) {
//     rect(obRect[i]*pSize, 4*pSize, pSize, -1*obRectHeight[i]*pSize);
//   }
// }

// // translates the x and y values of all obstacles, creating an infinite screen. Every subsequent function is affected by the translated x and y values
// function mapTranslation() {
//   push();
//   translate(tx, ty);
//   obstacles();
//   collisionDetect();
//   groundDetect();
//   airDetect(); 
//   // blockBarrier();
//   pop();

//   if (keyIsDown(65)) { // a; when user holds "a", the screen moves right
//     tx += tSpeed;
//   }
//   if (keyIsDown(68)) { // d; when user holds "d", the screen moves left
//     tx -= tSpeed;
//   }
// }

// // draws the actual character, as well as includes the gravity that influences its dy value
// function character() {
//   circle(x, y, d);
//   y += dy;
//   gravity();
//   // if (keyIsDown(87)) {
//   //   y -= dy;
//   // }
//   // if (keyIsDown(83)) {
//   //   y += dy;
//   // }
// }


// // detect left
// // x + d/2 > tx && x < tx
// // detect right
// // x - d/2 < tx + pSize && x > tx + pSize
// // detect top
// // y + d/2 > ty && y < ty
// // detect bottom
// // y - d/2 < ty + pSize && y > ty + pSize
// // detects which side of the object the character collides with
// function collisionDetect() {
//   obSqDistX = [0, 4, 5, 6, 7, 8, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 57, 58, 59, 60, 61, 68, 69, 75, 79, 83, 89, 92, 93, 94, 99, 100, 101, 102, 107, 108, 109, 110, 113, 114, 115, 116, 125, 126, 127, 128, 131, 132, 133, 134, 144, 145, 146, 147, 155, 156, 157, 158, 159, 160, 161, 162];
//   obSqDistY = [0, 0, 0, 0, 0, 0, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -3, -2, -1, 0, 0, -1, -2, -3, -3, -2, -1, 0, 0, -1, -2, -3, -1, -1, -1, -1, -3, -2, -1,  0, 1, 2, 3, 4];
//   for (let i = 0; i <= obSqDistX.length; i++) {
//     if (collideRectCircle(tx + obSqDistX[i]*pSize, ty - obSqDistY[i]*pSize, pSize, pSize, x, y, d) && y + d/2 >= ty - obSqDistY[i]*pSize && y < ty - obSqDistY[i]*pSize) {
//       stateChar = "blockTop";
//     }
//     else if (collideRectCircle(tx + obSqDistX[i]*pSize, ty - obSqDistY[i]*pSize, pSize, pSize, x, y, d) && y - d/2 <= ty + pSize - obSqDistY[i]*pSize && y > ty + pSize - obSqDistY[i]*pSize && stateAir !== "blockTop") {
//       stateChar = "blockBottom";
//     } 
//     if (collideRectCircle(tx + obSqDistX[i]*pSize, ty - obSqDistY[i]*pSize, pSize, pSize, x, y, d) && x + d/2 >= tx + obSqDistX[i]*pSize && x < tx + obSqDistX[i]*pSize && stateChar !== "blockTop") {
//       stateChar = "blockLeft";
//     }
//     else if (collideRectCircle(tx + obSqDistX[i]*pSize, ty - obSqDistY[i]*pSize, pSize, pSize, x, y, d) && x - d/2 <= tx + pSize + obSqDistX[i]*pSize && x > tx + pSize + obSqDistX[i]*pSize && stateChar !== "blockTop") {
//       stateChar = "blockRight";
//     }
//     else if (collideLineCircle(0, gy, width, gy, x, y, d)) {
//       stateChar = "ground";
//     }
//   }
//   // console.log(stateChar);
// }

// // use of array to detect if object is "blockTop" does not work
// // state ob height 3, val = 7.5 is inaccurate
// // detects whether or not the character is in the air based on collision
// function airDetect() {
//   for (let i = 0; i <= obSqDistX.length; i++) {
//     if (collideRectCircle(tx + 7.5*pSize, ty - 4*pSize, pSize, pSize, x, y, d) && y + d/2 >= ty - 3*pSize && y < ty - 3*pSize) {
//       stateAir = false;
//       stateObHeight = 3;
//     }
//     else if (collideRectCircle(tx + 14*pSize, 4*pSize, pSize, -1*1.5*pSize) && y + d/2 > 4*pSize && y < 4*pSize) {
//       stateAir = false;
//       stateObHeight = 1.5;
//     }
//     else if (collideRectCircle(tx, ty, pSize, pSize, x, y, d) && y + d/2 >= ty && y < ty || collideLineCircle(0, gy, width, gy, x, y, d) || collideRectCircle(tx + 5*pSize, ty, pSize, pSize, x, y, d) && y + d/2 >= ty && y < ty || collideRectCircle(tx + 6*pSize, ty, pSize, pSize, x, y, d) && y + d/2 >= ty && y < ty || collideRectCircle(tx + 7*pSize, ty, pSize, pSize, x, y, d) && y + d/2 >= ty && y < ty || collideRectCircle(tx + 8*pSize, ty - 0.5*pSize, pSize, pSize, x, y, d) && y + d/2 >= ty && y < ty || collideRectCircle(tx + 8.5*pSize, ty - 0.5*pSize, pSize, pSize, x, y, d) && y + d/2 >= ty && y < ty) {
//       stateAir = false;
//       stateObHeight = 0;
//     }
//     else {
//       stateAir = true;
//     }
//   }
//   console.log(stateAir);
// }

// //detects whether of not the character is on the ground or hits the top of a block, and redefines the ground parameter appropriately 
// function groundDetect() {
//   obSqDistY = [0, 0, 0, 0, 0, 0, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -3, -2, -1, 0, 0, -1, -2, -3, -3, -2, -1, 0, 0, -1, -2, -3, -1, -1, -1, -1, -3, -2, -1,  0, 1, 2, 3, 4];
//   for (let i = 0; i <= obSqDistY.length; i++) {
//     if (stateChar === "blockTop" && !stateAir) {
//       ground = ty - stateObHeight*pSize - d/2;
//     }
//     else {
//       ground = gy - d/2;
//     }
//   }
//   // console.log(ground);
//   console.log(stateObHeight);
// }

// // allows the character to jump without forever ascending
// function gravity() {
//   if (stateAir && y < ground) {
//     y += dy;
//     dy += g;
//   }
//   else if (stateChar !== "ground" && y > ground) {
//     dy = 0;
//     y = ground;
//   }
//   else if (stateChar === "ground" && y > ground) {
//     dy = 0;
//     y = ground;
//   }
// }

// // jump function
// function keyPressed() {
//   if (key === " ") {
//     if (y >= ground) {
//       dy = -jump;
//     }
//   }
// }

// // barrier creation for 
// function blockBarrier() {
//   if (stateChar === "blockBottom") {
//     // y = ty + pSize + d/2;
//     ground = gy - d/2;
//     y += dy;
//     dy += g;
//   } 
// }