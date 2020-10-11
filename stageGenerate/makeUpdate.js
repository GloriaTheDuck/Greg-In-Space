import * as gameParams from "./globalVar.js";

export function update ()
{
    var cursors = this.input.keyboard.createCursorKeys();
    playerObject = gameMatrix[Math.floor(player.x/32)][Math.floor(player.y/32)];
    
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
    var toTile = playerObject.getTile(direction);
    console.log(toTile.foreground);
    if( toTile != null){
        if(toTile.foreground == null){
            playerTile.moveDirection(direction);
        } else if(toTile.foreground.name == "rock"){
            rockPush(toTile,direction);
        } else if(toTile.foreground.name == "executive"){
            collectExec(playerObject.foreground,toTile.foreground);
            playerObject.moveDirection(direction);
        } else if(toTile.foreground.name == "exit"){
            console.log(player.execsCollected);
            if(player.execsCollected == 2){
                winGame();
                playerTile.moveDirection(direction);
            }
        }
        
    }
}
