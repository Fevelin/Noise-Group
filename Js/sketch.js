//////////////////////////
/* EDIT VALUES BELOW TO MATCH DEVICE SLIDERS*/
const CCSLIDER1 = 2;
const CCSLIDER2 = 3;
const CCSLIDER3 = 4;
const CCSLIDER4 = 5;
const CCSLIDER5 = 6;
const CCSLIDER6 = 8;
const CCSLIDER7 = 9;
const CCSLIDER8 = 12;
//const CCSLIDER9 = 12;
const sliderData = [0,0,0,0,0,0,0,0];

// To store an array of particle objects
let particles = [];
// Number of particles
const num = 2000;
// List of color array
const colors = ["#EEEEEE", "#32E0C4", "#0D7377", "#212121", "#33C6FF"]; 

// Scale factor for noise function
const noiseScale = 0.20 / 50;
// Adjusting the swirl effect factor
const swirlFactor = 0.50; 

function setup() {
    // Using the window width and height to create the canvas so it is full screen
  createCanvas(950,1022);
  WebMidi
        .enable()
        .then(onEnabled)
        .catch(err => alert(err));
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
// gets called by MIDI library once MIDI enabled
function onEnabled() {
  // Display available MIDI input devices
  if (WebMidi.inputs.length < 1) {
      console.log("No device detected.");
  } else {
      WebMidi.inputs.forEach((device, index) => {
          console.log(`${index}: ${device.name}`);
      });
  }
  myController = WebMidi.inputs[0];
  myController.channels[1].addListener("noteon", noteOn);
  myController.channels[1].addListener("controlchange", allCC);

}
// gets called when a MIDI note its intercepted 
function noteOn(e) {
  // for APC Mini
  // console.log(e.note.name, e.note.accidental || null, e.note.octave);
  // calculate the postion of the note in the grid of notes
  let pos = returnXY(e.note.name, e.note.accidental || '', e.note.octave);
  // calculate the x y pixel equivalent 
  // add offset values to position in the middle of an notional 8 x8 grid cell
  // width / 16 = half of cell size
  let hSpace = width / 16;
  let vSpace = height / 16;
  let x = pos.x * width + hSpace;
  let y = pos.y * height + vSpace
  // TODO - use these values to draw something at the note position?
  // for example: circle(x, y, 20)
}
// gets called when a MIDI control change message is intercepted
function allCC(e) {
  console.log(e.data[2]);
  // calculate slider data as a value  0 to  1
  let ratio = e.data[2] /  127;
  switch (e.controller.number) {
      case CCSLIDER1:  
          sliderData[0] = ratio;
          break;
      case CCSLIDER2:  
          sliderData[1] = ratio;
          break;
      case CCSLIDER3:  
          sliderData[2] = ratio;
          break;
      case CCSLIDER4:  
          sliderData[3] = ratio;
          break;
      case CCSLIDER5:  
          sliderData[4] = ratio;
          break;
      case CCSLIDER6:  
          sliderData[5] = ratio;
          break;
      case CCSLIDER7:  
          sliderData[6] = ratio;
          break;
      case CCSLIDER8:  
          sliderData[7] = ratio;
          break;
  }
}
function draw() {
  for(let i = 0;i < sliderData.length;i++){
    console.log(sliderData[0])
    // Setting background color with a low opacity to create a trailing effect
  background(0, 50);
  for (let i = 0; i < num * sliderData[1]; i++) {
    // Getting the current particle object
    let p = particles[i];
    // Color fill for particle
    //fill(sliderData[0]* 255,sliderData[1]* 255,sliderData[2]* 255); 
    fill(sliderData[2]* 500,sliderData[3]* 500,sliderData[4]* 500); 
    // Drawn an ellipse at the particle's position for visualisation 

    // SCALE OF DOTS
    ellipse(p.position.x, p.position.y, 20 * sliderData[0]);

    // Calculate noise value for current particle's position and frame count 
    // AMOUNT OF PARTICLES
    let n = noise(p.position.x * noiseScale + sliderData[1], p.position.y * noiseScale + sliderData[1], frameCount * noiseScale * noiseScale + sliderData[1]);
    // SWIRL EFFECT
    n = n * sliderData[6];
    // Apply swirl effect factor by calculating the angle of swirl based on noise value and frame count

    // WAVE DIRECTION
    let angle = TAU * n + frameCount * swirlFactor * sliderData[7]; 
    // Calculating the radius with variation using noise function and the frame count
    let radius = 3 + 20 * noise(frameCount * 0.01 + i); 
    // Updating the particle's position by moving it with swirling effect
    // SPEED
    p.position.x += cos(angle) * radius * sliderData[5]; 
    p.position.y += sin(angle) * radius * sliderData[5];
  
    // Checking if particles is off-screen, if true, reset its position to a random location within canvas
    if (!onScreen(p.position)) {
      p.position.x = random(width);
      p.position.y = random(height);
    }
  }
  // rect(0, 0, width, height);
  // line(width/2, width, height/2);


  }
  
}

// Function to check if a vector is within the canvas boundaries 
function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}
