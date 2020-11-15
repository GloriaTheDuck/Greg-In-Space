import * as gameParams from "./globalVar.js";

// Checks if coordinates are in bounds.
function inBounds(x,y,gameMatrix){
    return (0<= x) && (x < gameMatrix.length) && (0<= y) && (y < gameMatrix[0].length);
}

// Object with 4 attributes:
// x and y keep track of tileObject's location in gameMatrix
// foreground is sprite object used to indicate foreground object at x,y. null if no object in foregorund.
// background is string used to indicate background. "water" if water tile and null otherwise.

// Important methods:
// getTile(direction) returns tile in direction of "up", "down", "left", or "right". Also getTileAbove(), getTileBelow(), getTileRight(), and getTileLeft().
// moveDirection(direction) sets foreground of getTile(direction) to this.foreground, and this.foreground to null. Does not check for collision.
// moveUp(), moveDown(), moveLeft(), and moveRight() does similar thing.
// inGrid() returns whether or not the in game x,y positions of the foreground sprite match the x,y positions of the background sprite.

export function tileObject(scene,x,y,foreground,map){
    this.x = x;
    this.y = y;
    this.foreground = foreground;
    this.background = null;
    this.scene = scene;
    this.map = map;
    this.scale = 2
    
    this.getTileAbove =  function(){
        return inBounds(this.x,this.y-1,this.scene.gameMatrix) ? this.scene.gameMatrix[this.x][this.y-1] : null;
    };
    this.getTileBelow =  function(){
        return inBounds(this.x,this.y+1,this.scene.gameMatrix) ? this.scene.gameMatrix[this.x][this.y+1] : null;
    };
    this.getTileRight =  function(){
        return inBounds(this.x+1,this.y,this.scene.gameMatrix) ? this.scene.gameMatrix[this.x+1][this.y] : null;
    };
    this.getTileLeft =  function(){
        return inBounds(this.x-1,this.y,this.scene.gameMatrix) ? this.scene.gameMatrix[this.x-1][this.y] : null;
    };
    
    
    this.getTile = function(direction){
        if(direction == "up"){
            return this.getTileAbove()
        }
        if(direction == "down"){
            return this.getTileBelow()
        }
        if(direction == "left"){
            return this.getTileLeft()
        }
        if(direction == "right"){
            return this.getTileRight()
        }
    }
    
    this.moveDirection = function(direction){
        if(direction == "up"){ 
            this.foreground.body.velocity.y = -gameParams.moveSpeed;
            if(this.foreground.name == "player"){
                this.foreground.anims.play("up",true);
            }
        }
        if(direction == "down"){ 
            this.foreground.body.velocity.y = gameParams.moveSpeed;
            if(this.foreground.name == "player"){
                this.foreground.anims.play("down",true);
            }}
        if(direction == "right"){
            this.foreground.body.velocity.x = gameParams.moveSpeed;
            if(this.foreground.name == "player"){
                this.foreground.anims.play("right",true);
            }
        }
        if(direction == "left"){ 
            this.foreground.body.velocity.x = -gameParams.moveSpeed;
            if(this.foreground.name == "player"){
                this.foreground.anims.play("left",true);
            }}
        this.getTile(direction).foreground = this.foreground;
        this.scene.movingObjects.push(this.getTile(direction));
        this.foreground = null;
    }
    
    //Returns whether the foreground is in the correct position
    this.inGrid = function(){
        var trueX = map.tileToWorldX(this.x);
        var trueY = map.tileToWorldY(this.y);
        console.log(map.tileWidth, map.tileHeight)
        
        var inX = (trueX-4 <= this.foreground.x - map.tileWidth/2) && (trueX+4 >= this.foreground.x - map.tileWidth/2)
        var inY = (trueY-4 <= this.foreground.y - map.tileHeight/2) && (trueY+4 >= this.foreground.y - map.tileHeight/2)
        return inX && inY;
    }
}

// Converts pixel coords to grid coords
function pixelToGrid(x){
    return Math.floor(x/gameParams.tileSize);
}

// Converts grid coords to pixel coords
function gridToPixel(x){
    return x*gameParams.tileSize + Math.floor(gameParams.tileSize/2);
}