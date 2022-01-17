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

var bottomEllipses = [];
var bottomEllipsesPtr = 0;
var bottomEllipse = false;

var activeCursor = true;

function setup(){
    createCanvas(canvasWidth, canvasHeight);
    newRandParams();
    fill(colour[colourPtr]);
    colourPtr++;
    saveState();
    noStroke();
}

function draw(){
    background(55);
    image(saveStates[numSavedStates-1],0 ,0);
    if(activeCursor){
        drawCursor();
        var oneSide = false;
        var oneCorner = false;
        if(mouseX - (ellipseWidth/2) < 0){
            cursorRightSideOffset();
            oneSide=true;
        }else if(mouseX + (ellipseWidth/2) > canvasWidth){
            bottomEllipse = false;
            cursorLeftSideOffset();
            oneSide = true;
        }else{
            bottomEllipse = false;
        }
        if(mouseY - (ellipseHeight/2) < 0){
            bottomEllipse = true;
            cursorBottomSideOffset();
            if(oneSide){
                oneCorner = true;
            }
        }else if(mouseY + (ellipseHeight/2) > canvasHeight){
            cursorTopSideOffset();
            if(oneSide){
                oneCorner = true;
            }
        }
        if(oneCorner){
            renderCornerCursors();
        }
        renderBottomSide();
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
    if(bottomEllipse){
        cursorBottomSideOffset(true);
    }
    fill(colour[colourPtr]);
    saveState();
}

function newRandParams(){
    heightWidthRatio = Math.random() + 0.9;//.8 to 1.8
    ellipseWidth = Math.floor(Math.random() * 51)+150; // random num 100-200 
    ellipseHeight = ellipseWidth*heightWidthRatio;
}

function saveState(){
    saveStates[numSavedStates] = get();
    numSavedStates++;
}

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
    if(e.keyCode == 32){
        activeCursor = !activeCursor;
    }
}

function drawCursor(){
    ellipse(mouseX ,mouseY, ellipseWidth, ellipseHeight);
}
//create offset ellipse
function drawOffsetCursor(xOffset = 0, yOffset = 0){
    ellipse(mouseX ,mouseY, ellipseWidth, ellipseHeight);
}

function cursorLeftSideOffset(){
    ellipse(mouseX-canvasWidth,mouseY, ellipseWidth, ellipseHeight);
}

function cursorRightSideOffset(){
    ellipse(mouseX+canvasWidth,mouseY, ellipseWidth, ellipseHeight);
}

function cursorTopSideOffset(){
    ellipse(mouseX,mouseY-canvasHeight, ellipseWidth, ellipseHeight);
}

function cursorBottomSideOffset(render = false){
    ellipse(mouseX,mouseY+canvasHeight, ellipseWidth, ellipseHeight);
    if(render){
        bottomEllipses[bottomEllipsesPtr] = [mouseX,mouseY+canvasHeight, ellipseWidth, ellipseHeight, colourPtr];
        bottomEllipsesPtr++;
    }
}

function renderCornerCursors(render = false){
    ellipse(mouseX + canvasWidth, mouseY + canvasHeight, ellipseWidth, ellipseHeight);
    ellipse(mouseX + canvasWidth, mouseY - canvasHeight, ellipseWidth, ellipseHeight);
    ellipse(mouseX - canvasWidth, mouseY + canvasHeight, ellipseWidth, ellipseHeight);
    ellipse(mouseX - canvasWidth, mouseY - canvasHeight, ellipseWidth, ellipseHeight);
}

function renderBottomSide(){
    var tempColour = colourPtr;
    for(var i = 0; i < bottomEllipses.length; i++){
        fill(colour[bottomEllipses[i][4]]);
        ellipse(bottomEllipses[i][0], bottomEllipses[i][1], bottomEllipses[i][2], bottomEllipses[i][3]);
    }
    fill(colour[tempColour]);
}