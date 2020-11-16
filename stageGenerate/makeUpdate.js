import * as gameParams from "../globalVar.js";
import {textConfig} from "./makeText.js";
import * as levels from "../levels.js";


export function update ()
{
    var gameMatrix = this.gameMatrix;
    var player = this.player;
    var cursors = this.input.keyboard.createCursorKeys();
    var playerObject = this.gameMatrix[this.worldToTileX(player.x)][this.worldToTileY(player.y)];
    var movingObjects = this.movingObjects
    var restartKey = this.input.keyboard.addKey('R');
    var exitKey = this.input.keyboard.addKey('ESC');
    
    if(restartKey.isDown){
        gameParams.music.stop();
        this.scene.restart()
    }
    
    if(exitKey.isDown){
        endLevel.call(this);
    }
    
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
        // If nothings moving right now, check if you need to play a text scene
        if(this.textScene != null){
            this.scene.add("textScene",new textConfig(this.textScene,this, this.endLevel), true);
            this.scene.pause();
            this.framesSincePause = 0
            this.textScene = null;
        }
        
        // If there's no text scene to play, and you need to end the level, end the level.
        if(this.endLevel == true){
            if(this.framesSincePause < 2){
                this.framesSincePause += 1;
            } else {
                endLevel.call(this);
            }
        }
        
        // If none of the above are true, try to move the player
        if(this.nextInput != null){ 
            player.anims.play("turn_" + this.nextInput);
            playerMoveTo(this,playerObject, this.nextInput);
            this.lastInput = this.nextInput;
            this.nextInput = null;
        
        // If there's no nextInput, find one.
        } else {
            if (cursors.right.isDown){
                this.nextInput = 'right';
            }
            if (cursors.left.isDown){
                this.nextInput = "left";
            }
            if (cursors.up.isDown){
                this.nextInput = "up";
            }
            if (cursors.down.isDown){
                this.nextInput = "down";
            }
            if(this.nextInput != this.lastInput){
                this.lastInput = null;
            }
        }
    }
}

// Moves Player & checks for collision
// Arguements Scene = this, playerTile = tile containing player, direction is string for which direction thing go.
function playerMoveTo(scene,playerTile,direction){
    var toTile = playerTile.getTile(direction);
    let player = playerTile.foreground
    if( toTile != null){
        if(toTile.foreground == null){
            if(toTile.background != "water" || player.execsCollected == 0){
                //calls walking sound effect
                scene.traversingtiles.play();
                
                playerTile.moveDirection(direction);
                player.anims.play(direction);
            } else if(scene.lastInput != direction){
                scene.invalidmove.play();
            }
        } else if(toTile.foreground.name == "rock"){
            //calls rock pushing sound effect
            if(rockPush(toTile,direction)){
                scene.rockpushing.play();
            }
        } else if(toTile.foreground.name == "executive"){
            //calls collect executive sound effect
            scene.collectalien.play();
            collectExec(playerTile.foreground,toTile.foreground);
            if(player.execsCollected == 1 && scene.textScenes != null){
                scene.textScene = scene.textScenes.executive
            }
            playerTile.moveDirection(direction);
            player.anims.play(direction);
        } else if(toTile.foreground.name == "exit"){
            if(scene.executives.length == player.execsCollected){
                playerTile.moveDirection(direction);
                player.anims.play(direction);
                if(scene.textScenes != null){
                    if(scene.textScenes.endScene != null){
                        scene.textScene = scene.textScenes.endScene;
                    }
                } else {
                    scene.framesSincePause =2;
                }
                scene.endLevel = true;
            }
        }
    }
}

function endLevel(){
    this.endLevel = false;
    gameParams.music.stop();
    this.scene.manager.getScenes(false).forEach(function(e){
        e.scene.stop();
    });
    var index = 0;
    while(index < levels.default.length){
        console.log(this.name,);
        if(levels.default[index].sceneName == this.name){
            if(index != levels.default.length-1){
                this.scene.start(levels.default[index+1].sceneName)    
            } else {
                // Put End Scene Here
                this.scene.start("menu")
            }
        }
        index+=1;
    }
}


// Tries to move the Rock to tile Rock. Does check for collision.
function rockPush(rockTile,direction){
    var toTile = rockTile.getTile(direction);
    if(toTile != null){
        if(toTile.foreground == null && toTile.background != "water"){
            rockTile.moveDirection(direction);
            return true;
        }
    }
    return false;
}

// Collects the executive
function collectExec(player, executive){
    executive.destroy();
    player.execsCollected += 1
}
