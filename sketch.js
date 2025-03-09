let shapes = []; // Array to store drawn shapes

// Shape class to define each shape
class Shape {
  constructor(x, y, w, h, type, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;
    this.color = color;
    this.isHovered = false; // To track if the mouse is over the shape
    this.growing = false; // For animation (expanding effect)
    this.rotation = 0; // Rotation for larger shapes
  }

  // Check if the mouse is over the shape
  isMouseOver() {
    if (this.type === 'rect') {
      return mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h;
    } else if (this.type === 'circle') {
      let d = dist(mouseX, mouseY, this.x, this.y);
      return d < this.w / 2;
    }
    return false;
  }

  
  update() {
    this.isHovered = this.isMouseOver();
    if (this.isHovered && !this.growing) {
      this.growing = true; // Start expanding when hovered over
    }
    if (this.w > 100) { // If the shape is large enough, start rotating it
      this.rotation += 0.05; // Rotate the shape
    }
  }

  // Draw the shape
  display() {
    if (this.isHovered) {
      // Change color when hovered
      fill(255, 0, 0);
    } else {
      fill(this.color);
    }

    push();
    translate(this.x + this.w / 2, this.y + this.h / 2);
    rotate(this.rotation);
    translate(-this.w / 2, -this.h / 2);

    if (this.type === 'rect') {
      rect(0, 0, this.w, this.h);
    } else if (this.type === 'circle') {
      ellipse(0, 0, this.w, this.h);
    }

    pop();

    // Handle the growing effect when hovered
    if (this.growing) {
      this.w += 2; // Expand the width
      this.h += 2; // Expand the height
      if (this.w > 150) { // Stop growing after a certain size
        this.growing = false;
      }
    }
  }
}

function setup() {
  createCanvas(600, 400);
  noStroke();
}

function draw() {
  background(220);

  // Update and display all shapes
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].update();
    shapes[i].display();
  }
}


function mousePressed() {
  if (mouseButton === LEFT) {
    let numShapes = int(random(3, 6)); // Draw 3 to 5 random shapes at once

    // Loop to create multiple shapes at random positions
    for (let i = 0; i < numShapes; i++) {
      let shapeType = random(['rect', 'circle']); // Randomly choose a shape
      let shapeColor = color(random(255), random(255), random(255)); // Random color
      let size = random(30, 60); // Random size for the shape
      let xPos = random(width);
      let yPos = random(height);

      // Create the shape and push it into the array
      if (shapeType === 'rect') {
        shapes.push(new Shape(xPos, yPos, size, size, 'rect', shapeColor));
      } else {
        shapes.push(new Shape(xPos, yPos, size, size, 'circle', shapeColor));
      }
    }
  }
}