import * as gameParams from "../globalVar.js";

export function update ()
{
    var gameMatrix = gameParams.gameMatrix;
    var player = gameParams.player;
    var cursors = this.input.keyboard.createCursorKeys();
    var playerObject = gameMatrix[Math.floor(player.x/32)][Math.floor(player.y/32)];
    var movingObjects = gameParams.movingObjects
    
    // If somethings moving, check if it needs to stop.
    if(movingObjects.length > 0){
        for(var i = 0; i<movingObjects.length; i++){
            var current = movingObjects[i];
            if(current.inGrid()){
                current.foreground.body.velocity.x = 0;
                current.foreground.body.velocity.y = 0;
                movingObjects.splice(i, 1);
                i+= -1;
                player.anims.stop();
            }
        }
    } else {
        // If nothings moving right now, the player moves according to nextInput.
        if(gameParams.nextInput != null ){ 
            player.anims.play("turn_" + gameParams.nextInput);
            playerMoveTo(playerObject, gameParams.nextInput);
            gameParams.setNextInput(null);
        
        // If there's no nextInput, find one.
        } else {
            if (cursors.right.isDown){
                gameParams.setNextInput("right")
            }
            if (cursors.left.isDown){
                gameParams.setNextInput("left")
            }
            if (cursors.up.isDown){
                gameParams.setNextInput("up")
            }
            if (cursors.down.isDown){
                gameParams.setNextInput("down")
            }
        }
    }
}

function playerMoveTo(playerTile,direction){
    var toTile = playerTile.getTile(direction);
    console.log(toTile)
    if( toTile != null){
        if(toTile.foreground == null){
            playerTile.moveDirection(direction);
        } else if(toTile.foreground.name == "rock"){
            rockPush(toTile,direction);
        } else if(toTile.foreground.name == "executive"){
            collectExec(playerTile.foreground,toTile.foreground);
            playerTile.moveDirection(direction);
        } else if(toTile.foreground.name == "exit"){
            if(playerTile.foreground.execsLeft == 0){
                winGame();
                playerTile.moveDirection(direction);
            }
        }
        
    }
}

// Tries to move the Rock to tile Rock. Does check for collision.
function rockPush(rockTile,direction){
    var toTile = rockTile.getTile(direction);
    console.log("Rock ", rockTile);
    console.log("Rock Move To ",toTile);
    if(toTile != null){
        if(toTile.foreground == null && toTile.background != "water"){
            rockTile.moveDirection(direction);
            console.log(rockTile)
        }
    }
}

// Collects the executive
function collectExec(player, executive){
    executive.destroy();
    player.execsLeft += -1
}
