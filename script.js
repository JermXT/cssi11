// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions. 
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, sqrt, round */

let backgroundColor, spherePosition, rectPosition, gameOver = false, win = false, end = false;
let invisibleObjects;
function setup() {
  // Canvas & color settings
  createCanvas(500, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  // This variable contains a JSON object
  spherePosition = {
    "x": random(150,width-150),
    "y": random(100,height-100)
  };
  rectPosition = {
    "x": 130,
    "y": 140
  };
}

function draw() {
  background(backgroundColor);
  //---------------------------------------------------------------------------------------------------------
  //ellipse(spherePosition.x, spherePosition.y, 200,200);
  //-----------------------------------------------------uncomment above to see ellipse------------------------------
  //rect(rectPosition.x, rectPosition.y, 20, 20);
  //line(spherePosition.x, spherePosition.y, rectPosition.x, rectPosition.y);
  push()
  fill(0,0,0)
  rect(450,0,500,height)
  noStroke()
  //fill(60,10,100)
  rect(0,395,500,400)
  rect (0,0,500, 5)
  fill(240,80,80)
  rect(450,5,40,390)
  pop()
  let distance1 = computeDistance(spherePosition, rectPosition);
  //text(`The circle and sphere are ${round(distance1)} units apart.`, 20, 20);
  text("the circle is of radius 100",20,20)
  text("Avoid the circle and reach the end, and no going out of bounds! Click to restart",20,60)
  let mousePosition = {
    "x": mouseX,
    "y": mouseY
  }

  let distance2 = computeDistance(spherePosition, mousePosition);
  let distanceDescription = computeCategoryOfDistance(spherePosition, mousePosition);
  text(`The circle and your mouse are ${round(distance2)} units apart; you're ${distanceDescription}.`, 20, 40);
  if(collideCircleCircle(mouseX, mouseY, 15, spherePosition.x, spherePosition.y, 200) && !end){
    gameOver = true
    end = true
  }
  if(mouseX>450 && mouseX<490 && mouseY>5 && mouseY <390 && !end){
    win = true
    end = true
  }
  let bounds = mouseX >0 && mouseX<500
  if((mouseY< 5 && mouseY>-50 && bounds) || (mouseY>395 && mouseY<450 && bounds) ||(mouseX>495 && mouseX<550 && mouseY>0 && mouseY<400)){
    gameOver = true
    end = true
  }
  
  if(win == true){
    textSize(40)
    text("you won", width/4, height/2)
    textSize(12)
  }else if(gameOver == true){
    textSize(40)
    text("GAME OVER", width/4, height/2)
    textSize(12)
  }
}

function mousePressed() {
  spherePosition.x = random(150,width-150);
  spherePosition.y = random(100,height-100);
  end = false
  gameOver = false
  win = false
}

function computeDistance(point1, point2) {
  let deltaX = point1.x - point2.x;
  let deltaY = point1.y - point2.y;
  let distance = sqrt((deltaX ** 2) + (deltaY ** 2));
  return distance;  // returns a number
}

function computeCategoryOfDistance(point1, point2) {
  let distance = computeDistance(point1, point2);
  distance = distance - 100
  if(distance>240)distance = 240
  backgroundColor = color(distance, 10,100)
  if (distance > 200) {
    //backgroundColor = color(240, 10, 100);
    return "cold";
  } else if (distance > 50) {
    //backgroundColor = color(120, 10, 100);
    return "warmer";
  } else {
    //backgroundColor = color(0, 10, 100);
    return "red hot";
  }
}
