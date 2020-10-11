export var moveSpeed = 100;
export var tileSize = 32;

export var nextInput = null;
export var setNextInput = function(a){
    nextInput = a;
}

export var gameMatrix;
export var setGameMatrix = function(a){
    gameMatrix = a;
}
export var addToGameMatrix = function(a,x,y){
    gameMatrix[x][y] = a;
}

export var movingObjects =[];
export var getMovingObjects = function(){
    return movingObjects;
}
export var setMovingObjects = function(a){
    movingObjects = a;
}
export var addToMovingObjects = function(a){
    movingObjects.push(a);
}
export var removeFromMovingObjects = function(a){
    movingObjects.slice(a,1);
}

export var player;
export var setPlayer = function(a){
    player = a;
}


// Variable used to keep track of what keys were pressed last frame
// Used to make it so holding down buttons doesn't work.
export var lastFrameDown = {
    right:false,
    left:false,
    up:false,
    down:false
};

export var setLastFrameDown = function(direction, a){
    lastFrameDown.direction = a;
    
}

export var stageWidth = 8
export var stageHeight = 8