// To store an array of particle objects
let particles = [];
// Number of particles
const num = 1000;
// List of color array
const colors = ["#EEEEEE", "#32E0C4", "#0D7377", "#212121", "#33C6FF"]; 

// Scale factor for noise function
const noiseScale = 0.01 / 5;
// Adjusting the swirl effect factor
const swirlFactor = 0.01; 

function setup() {
    // Using the window width and height to create the canvas so it is full screen
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < num; i++) {
    particles.push({
        // Initialising the particle position vector with random x and y coordinates within the canvas
      position: createVector(random(width), random(height)),
      // Randomly select a color from the colors array
      color: color(random(colors)) 
    });
  }

  noStroke(); 
}

function draw() {
    // Setting background color with a low opacity to create a trailing effect
  background(0, 10);
  for (let i = 0; i < num; i++) {
    // Getting the current particle object
    let p = particles[i];
    // Color fill for particle
    fill(p.color); 
    // Drawn an ellipse at the particle's position for visualisation 
    ellipse(p.position.x, p.position.y, 3);
    
    // Calculate noise value for current particle's position and frame count
    let n = noise(p.position.x * noiseScale, p.position.y * noiseScale, frameCount * noiseScale * noiseScale);
    // Apply swirl effect factor by calculating the angle of swirl based on noise value and frame count
    let angle = TAU * n + frameCount * swirlFactor; 
    // Calculating the radius with variation using noise function and the frame count
    let radius = 3 + 20 * noise(frameCount * 0.01 + i); 
    // Updating the particle's position by moving it with swirling effect
    p.position.x += cos(angle) * radius; 
    p.position.y += sin(angle) * radius;
    
    // Checking if particles is off-screen, if true, reset its position to a random location within canvas
    if (!onScreen(p.position)) {
      p.position.x = random(width);
      p.position.y = random(height);
    }
  }
}

// Function to check if a vector is within the canvas boundaries 
function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}
