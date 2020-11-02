import * as gameParams from "../globalVar.js";
import {textConfig} from "./makeText.js";



export function update ()
{
    var gameMatrix = this.gameMatrix;
    var player = this.player;
    var cursors = this.input.keyboard.createCursorKeys();
    var playerObject = this.gameMatrix[this.worldToTileX(player.x)][this.worldToTileY(player.y)];
    var movingObjects = this.movingObjects
    var restartKey = this.input.keyboard.addKey('R');
    
    if(restartKey.isDown){
        gameParams.music.stop();
        this.scene.restart()
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
        // If nothings moving right now, the player moves according to nextInput. 
        
        if(this.textScene != null){
            this.scene.add("textScene",new textConfig(this.textScene,this, this.endLevel), true);
            console.log(this.scene.manager);
            this.scene.pause();
            this.framesSincePause = 0
            this.textScene = null;
        }
        
        if(this.endLevel == true){
            if(this.framesSincePause < 2){
                this.framesSincePause += 1;
            } else {
                gameParams.music.stop();
                this.scene.manager.getScenes(false).forEach(function(e){
                    e.scene.stop();
                });
                this.scene.start("menu");   
            }
        }
        
        if(this.nextInput != null ){ 
            player.anims.play("turn_" + this.nextInput);
            playerMoveTo(this,playerObject, this.nextInput);
            this.nextInput = null;
        
        // If there's no nextInput, find one.
        } else {
            if (cursors.right.isDown){
                this.nextInput = "right";
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
            //calls walking sound effect
            scene.traversingtiles.play();
            if(toTile.background != "water" || player.execsCollected == 0){
                playerTile.moveDirection(direction);
                player.anims.play(direction);
            }
        } else if(toTile.foreground.name == "rock"){
            //calls rock pushing sound effect
            scene.rockpushing.play();
            rockPush(toTile,direction);
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

// Tries to move the Rock to tile Rock. Does check for collision.
function rockPush(rockTile,direction){
    var toTile = rockTile.getTile(direction);
    if(toTile != null){
        if(toTile.foreground == null && toTile.background != "water"){
            rockTile.moveDirection(direction);
        }
    }
}

// Collects the executive
function collectExec(player, executive){
    executive.destroy();
    player.execsCollected += 1
}
