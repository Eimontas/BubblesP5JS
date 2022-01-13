var heightWidthRatio;
var ellipseWidth;
var ellipseHeight;

const  canvasWidth = 1000;
const canvasHeight = 1000;

var colourPtr = 0;
var colour = [
    [158,107,184], // purple
    [255,103,107], // red
    [67,238,148], //green
    [246,155,67], //orange
    [215,254,123], //yellow
    [107,203,253] //blue
];

var saveStates = [];
var numSavedStates = 0;

var prevEllipse;

function setup(){
    createCanvas(canvasWidth, canvasHeight);
    newRandParams();
    fill(colour[colourPtr]);
    colourPtr++;
    saveState();
}

function draw(){
    background(55);
    image(saveStates[numSavedStates-1],0 ,0);
    drawCursor();
    if(mouseX - (ellipseWidth/2) < 0 || mouseX + (ellipseWidth/2) > canvasWidth){

    }
}

function mouseReleased(){
    placeEllipse();
    newRandParams();
    if(colourPtr == 5){
        colourPtr = 0;
    }else{
        colourPtr++;
    }
}

function placeEllipse(){
    ellipse(mouseX ,mouseY, ellipseWidth, ellipseHeight);
    fill(colour[colourPtr]);
    saveState();
}

function newRandParams(){
    heightWidthRatio = Math.random() + 0.8;//.8 to 1.8
    ellipseWidth = Math.floor(Math.random() * 41)+80;
    ellipseHeight = ellipseWidth*heightWidthRatio;
}

function saveState(){
    saveStates[numSavedStates] = get();
    numSavedStates++;
}

//undo function

function undoToPreviousState(){
    if (!saveStates[0]) {
      return;
    }
    // else draw the background (in this case white)
    // and draw the previous state
    background(55);
    image(saveStates[numSavedStates-1], 0, 0);
    // then set previous state to null
    numSavedStates--;
  }
  
function keyPressed(e) {
    // check if the event parameter (e) has Z (keycode 90) and ctrl or cmnd
    if (e.keyCode == 90 && (e.ctrlKey || e.metaKey)) {
        undoToPreviousState();
    }
}


//create cursor ellipse
function drawCursor(){
    ellipse(mouseX ,mouseY, ellipseWidth, ellipseHeight);
}
//create offset ellipse
function drawOffsetCursor(xOffset = 0, yOffset = 0){
    ellipse(mouseX ,mouseY, ellipseWidth, ellipseHeight);
}