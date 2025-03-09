let currentColor = 'black'; // Default drawing color
let drawing = false; // To track if we are drawing
let points = [];

function setup() {
  createCanvas(600, 400);
  // Attach event listeners to buttons
  document.getElementById('red').addEventListener('click', () => changeColor('red'));
  document.getElementById('green').addEventListener('click', () => changeColor('green'));
  document.getElementById('blue').addEventListener('click', () => changeColor('blue'));
  document.getElementById('yellow').addEventListener('click', () => changeColor('yellow'));
  
  // Set up mouse press/release for drawing
  let canvasElement = select('canvas');
  canvasElement.mousePressed(startDrawing);
  canvasElement.mouseReleased(stopDrawing);
}

function draw() {
  background(255); // Clear background
  
  stroke(currentColor);
  strokeWeight(5);
  for (let i = 0; i < points.length; i++) {
    point(points[i].x, points[i].y);
  }
  
  // Draw while mouse is pressed
  if (drawing) {
    points.push(createVector(mouseX, mouseY));
  }
}

function startDrawing() {
  drawing = true;
}

function stopDrawing() {
  drawing = false;
}

function changeColor(color) {
  currentColor = color;
}