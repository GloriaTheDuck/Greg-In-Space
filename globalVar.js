var moveSpeed = 100;
var tileSize = 32;

var nextInput = null;
function setNextInput(){
    nextInput = a;
}

var gameMatrix;
function setGameMatrix(a){
    gameMatrix = a;
}
function addToGameMatrix(a,x,y){
    gameMatrix[x][y] = a;
}

var movingObjects =[];
function setMovingObjects(a){
    movingObjects = a;
}
function addToMovingObjects(a){
    movingObjects.push(a);
}
function removeFromMovingObjects(a){
    movingObjects.slice(a,1);
}


// Variable used to keep track of what keys were pressed last frame
// Used to make it so holding down buttons doesn't work.
var lastFrameDown = {
    right:false,
    left:false,
    up:false,
    down:false
};

function setLastFrameDown(direction, a){
    lastFrameDown.direction = a;
    
}