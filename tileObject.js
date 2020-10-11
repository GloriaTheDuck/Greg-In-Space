import * as gameParams from "/globalVar.js";
import {gridToPixel} from "/ProofOfTech.js";

// Checks if coordinates are in bounds.
function inBounds(x,y){
    return (0<= x) && (x < gameParams.gameMatrix.length) && (0<= y) && (y < gameParams.gameMatrix[0].length);
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

export function tileObject(x,y,foreground){
    this.x = x;
    this.y = y;
    this.foreground = foreground;
    this.background = null;
    
    this.getTileAbove =  function(){
        return inBounds(this.x,this.y-1) ? gameParams.gameMatrix[this.x][this.y-1] : null;
    };
    this.getTileBelow =  function(){
        return inBounds(this.x,this.y+1) ? gameParams.gameMatrix[this.x][this.y+1] : null;
    };
    this.getTileRight =  function(){
        return inBounds(this.x+1,this.y) ? gameParams.gameMatrix[this.x+1][this.y] : null;
    };
    this.getTileLeft =  function(){
        return inBounds(this.x-1,this.y) ? gameParams.gameMatrix[this.x-1][this.y] : null;
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
            this.foreground.body.velocity.y = -this.gameParams.moveSpeed;
            if(this.foreground.name == "player"){
                this.foreground.anims.play("up",true);
            }
        }
        if(direction == "down"){ 
            this.foreground.body.velocity.y = this.gameParams.moveSpeed;
            if(this.foreground.name == "player"){
                this.foreground.anims.play("down",true);
            }}
        if(direction == "right"){
            this.foreground.body.velocity.x = this.gameParams.moveSpeed;
            if(this.foreground.name == "player"){
                this.foreground.anims.play("right",true);
            }
        }
        if(direction == "left"){ 
            this.foreground.body.velocity.x = -this.gameParams.moveSpeed;
            if(this.foreground.name == "player"){
                this.foreground.anims.play("left",true);
            }}
        this.getTile(direction).foreground = this.foreground;
        gameParams.addToMovingObjects(this.getTile(direction));
        this.foreground = null;
    }
    
    this.moveUp = function(){
        this.foreground.y += -this.gameParams.tileSize;
        this.getTileAbove().foreground = this.foreground;
        this.foreground = null;
    };
    
    this.moveDown = function(){
        this.foreground.y += this.gameParamstileSize;
        this.getTileBelow().foreground = this.foreground;
        this.foreground = null;
    };
    
    this.moveRight = function(){
        this.foreground.x += this.gameParamstileSize;
        this.getTileRight().foreground = this.foreground;
        this.foreground = null;
    };
    
    this.moveLeft = function(){
        this.foreground.x += --this.gameParamstileSize;
        this.getTileLeft().foreground = this.foreground;
        this.foreground = null;
    };
    
    //Returns whether the foreground is in the correct position
    this.inGrid = function(){
        var inX = (gridToPixel(this.x)-2 <= this.foreground.x) && (gridToPixel(this.x)+2 >= this.foreground.x)
        var inY = (gridToPixel(this.y)-2 <= this.foreground.y) && (gridToPixel(this.y)+2 >= this.foreground.y)
        return inX && inY;
    }
}