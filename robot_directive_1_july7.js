let brushImages = [];
let robotImages = [];
let totalBrush = 37;
let totalRobot = 5;

let currentBrushIndex = 0;
let currentRobotIndex = 0;

let frameInterval = 15;
let lastBrushSwitch = 0;
let lastRobotSwitch = 0;

let clickCount = 0;
let frozen = false;
let instructionReady = false;

let t = "", n = "", s = "", p = "", w = "";
let link;

function preload() {
  for (let i = 1; i <= totalBrush; i++) {
    brushImages.push(loadImage(`images/computer${i}.jpg`));
  }
  for (let i = 1; i <= totalRobot; i++) {
    robotImages.push(loadImage(`images/robot${i}.png`));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(16);
  rectMode(CENTER);
  imageMode(CENTER);
}

function draw() {
  background(242, 159, 185);
  fill(255);

  // Instruction text at top
  if (clickCount === 0) {
    text("Click once to freeze images.", width / 2, 30);
  } else if (clickCount === 1) {
    text("Click again to reveal instructions.", width / 2, 30);
  } else {
    text("Instruct the human robot to perform the task in the image below", width / 2, 30);
  }

  // Image size responsive
  let imgSize = min(width, height) * 0.25;

  // Update image indices if not frozen
  if (!frozen && frameCount - lastBrushSwitch >= frameInterval) {
    currentBrushIndex = (currentBrushIndex + 1) % brushImages.length;
    lastBrushSwitch = frameCount;
  }
  if (!frozen && frameCount - lastRobotSwitch >= frameInterval) {
    currentRobotIndex = (currentRobotIndex + 1) % robotImages.length;
    lastRobotSwitch = frameCount;
  }

  // Show brush image
  image(brushImages[currentBrushIndex], width / 2, height * 0.25, imgSize, imgSize);

  // ⬇️ Show this text only after second click
  if (clickCount >= 2) {
    fill(255);
    text("at the same time as the task in the image below", width / 2, height * 0.4);
  }

  // Show robot image
  image(robotImages[currentRobotIndex], width / 2, height * 0.55, imgSize, imgSize);

  // Show instructions and link after second click
  if (instructionReady) {
    displayInstructions();
  }
}

function mousePressed() {
  if (clickCount === 0) {
    frozen = true;
    clickCount++;
  } else if (clickCount === 1) {
    generateInstructions();
    instructionReady = true;
    clickCount++;
  }
}

function generateInstructions() {
  let tOptions = ["at 9am", "at 2pm", "before bed", "in the morning", "at 4pm"];
  let nOptions = ["3 times", "7 times", "12 times", "once", "every hour"];
  let sOptions = ["slowly", "quickly", "at normal speed", "in bursts", "smoothly"];
  let pOptions = ["on the left", "in the center", "to the right", "underneath", "at the top"];
  let wOptions = ["while clapping", "while blinking", "while turning", "while jumping", "while laughing"];

  t = random(tOptions);
  n = random(nOptions);
  s = random(sOptions);
  p = random(pOptions);
  w = random(wOptions);
}

function displayInstructions() {
  fill(0);
  textAlign(CENTER, TOP);
  textStyle(BOLD);

  let startY = height * 0.7;
  let gap = 25;

  text("While constrained by the following parameters:", width / 2, startY);
  textStyle(NORMAL);
  text(`time: ${t}`, width / 2, startY + gap);
  text(`number of times: ${n}`, width / 2, startY + 2 * gap);
  text(`speed: ${s}`, width / 2, startY + 3 * gap);
  text(`position: ${p}`, width / 2, startY + 4 * gap);
  text(`while: ${w}`, width / 2, startY + 5 * gap);

  // Final message
  let finalMessageY = startY + 7 * gap;
  fill(50, 50, 200);
  textStyle(BOLD);
  text("When the robot completes the task,", width / 2, finalMessageY);

  // Add HTML link only once
  if (!link) {
    link = createA("https://example.com", "Click here to continue", "_blank");
    link.position(width / 2 - 80, finalMessageY + gap);
    link.style("font-size", "16px");
    link.style("color", "#0066cc");
    link.style("text-decoration", "underline");
  }

  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (link) {
    link.remove();  // Remove link on resize
    link = null;    // Recreate it after resize
  }
}
