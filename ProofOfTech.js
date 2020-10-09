var stageWidth = 10;
var stageHeight = 10;
var moveSpeed = 100;
var tileSize = 32;
var playerObject;
var player;
var movingObjects = [];
var framesBetweenMoves = 2;
var framesSinceMoved = framesBetweenMoves;
var inputQueue = new queue()
var assetsFile = "Sprint1/"

// Creates the game matrix which stores the tile objects.
var gameMatrix = new Array(stageWidth);

for(var i = 0; i<stageWidth; i++){
    gameMatrix[i] = new Array(stageHeight);
}

//creates gameParams used by outside methods
var gameParams = {
    gameMatrix: gameMatrix,
    moveSpeed: moveSpeed,
    tilesSize: tileSize,
    movingObjects : movingObjects
};

import {tileObject} from "./tileObject.js";

//import {update} from "./update.js"

// Variable used to keep track of what keys were pressed last frame
// Used to make it so holding down buttons doesn't work.
var lastFrameDown = {
    right:false,
    left:false,
    up:false,
    down:false
};

// Converts pixel coords to grid coords
function pixelToGrid(x){
    return Math.floor(x/tileSize);
}

// Converts grid coords to pixel coords
function gridToPixel(x){
    return x*tileSize + Math.floor(tileSize/2);
}




// Collects the executive
function collectExec(player, executive){
    executive.destroy();
    player.execsCollected += 1
}

// Queue used for button inputs
function queue(){
    this.list = [];
    this.enqueue = function(e){
        this.list.push(e);
    }
    this.dequeue = function(){
        return this.list.shift();
    }
    this.length = function(){
        return this.list.length;
    }
}


var scene = {
    preload: preload,
    create: create,
    update: update
};

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: scene
};

//  here.adds a sprite with image image and name name at grid coords x and y.
//  Puts the sprite at gameMatrix[x][y]
function addObject(here,x,y,image,name){
    var a = here.physics.add.sprite(gridToPixel(x), gridToPixel(y), image);
    a.name = name;
    gameMatrix[x][y] = new tileObject(x,y,a,gameParams);
    return a;
}


function preload ()
{
    this.load.image('flooring', 'Sprint1/tileset.png');
    this.load.image('rock', assetsFile + 'addwork.png');
    this.load.spritesheet('executive', 'aliensprite_idle.png',{ frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('character_right', 'sprite_right.png', { frameWidth: 32, frameHeight: 32 } );
    this.load.spritesheet('character_left', 'sprite_left.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('character_up', 'sprite_up.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('character_down', 'sprite_down.png', { frameWidth: 32, frameHeight: 32 });
    this.load.tilemapTiledJSON('tilemap', assetsFile + 'Lvl6.json');
    //this.load.image('water', "Sprint1/Water.png");
    this.load.image('exit', "Sprint1/sprite_down.png",{ frameWidth: 32, frameHeight: 32 });
    
    //loading music
    this.load.audio('lab_music', "Sprint1/lab_gameplay_music.mp3");

}


function create ()
{
    const map = this.make.tilemap({ key: "tilemap" });
    
    for(i = 0; i<gameMatrix.length; i++){
        for(var j=0; j<gameMatrix[0].length; j++){
            gameMatrix[i][j] = new tileObject(i,j,null,gameParams);
        }
    }
    
    const floorTileSet = map.addTilesetImage("Floor", "flooring");
    
    
    
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const colorLayer = map.createStaticLayer("Color Fill", floorTileSet, 0, 0);
    const backgroundLayer = map.createStaticLayer("Background", floorTileSet, 0, 0);
    backgroundLayer.forEachTile
    var rocks = map.createFromObjects("Group", "rock" , {key:"rock", frame:1} );
    this.physics.world.enable(rocks);
    
    for(var i = 0; i<rocks.length; i++){
        var current = rocks[i];
        gameMatrix[pixelToGrid(current.x)][pixelToGrid(current.y)].foreground = current;
    }

    
    var wallsLayer = map.createStaticLayer("Walls",floorTileSet,0,0);
    var walls = wallsLayer.getTilesWithin();
    for(var i = 0; i<walls.length; i++){
        current = walls[i];
        if(current.index >= 0){
            gameMatrix[current.x][current.y].foreground = {name: "wall"};
        }
    }

    //for(var i =0; i<backgroundData.length; i++){
    //    for(var j=0; j<backgroundData[i].length; j++){
    //        current = backgroundData[i][j].index;
    //        if(current == 2 || current == 8 || current == 13){
    //            gameMatrix[j][i].foreground = backgroundLayer.getTileAt(j,i);
    //            gameMatrix[j][i].foreground.name = "wall";
    //        }
    //    }
    //}
    

    //backgroundLayer.setCollisionByProperty( {collides : true} );

    const spawnPoint = map.findObject("Player", obj => obj.name === "playerSpawn");
    player = addObject(this,pixelToGrid(spawnPoint.x),pixelToGrid(spawnPoint.y),'character_right',"player");
    console.log(spawnPoint.x,spawnPoint.y);
    player.execsCollected = 0;
    
    const exitPoint = map.findObject("Player", obj => obj.name === "exit");
    console.log(exitPoint);
    gameMatrix[pixelToGrid(exitPoint.x)][pixelToGrid(exitPoint.y)].foreground = {name : "exit"};
    
    player.setCollideWorldBounds(true);
    
    const executives = map.createFromObjects("Group", "alien" , {key: "executive"});
    console.log(executives);
    for(var i = 0; i<executives.length; i++){
        current = executives[i];
        gameMatrix[pixelToGrid(current.x)][pixelToGrid(current.y)].foreground = current;
        current.name = "executive"
    }
    
    this.anims.create({
        key: 'alien_idle',
        frames: this.anims.generateFrameNumbers('executive', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    });
    
    for(var i = 0; i<executives.length;i++){
        executives[i].anims.play("alien_idle",true);
    }
    
    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('character_left', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'turn_left',
        frames: this.anims.generateFrameNumbers('character_left', { start: 0, end: 0 }),
        frameRate: 0,
    });

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers("character_up", { start: 0, end: 3 } ),
        frameRate: 10
    });
    
    this.anims.create({
        key: 'turn_up',
        frames: this.anims.generateFrameNumbers('character_up', { start: 0, end: 0 }),
        frameRate: 0,
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('character_right', { start: 0, end: 3 } ),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'turn_right',
        frames: this.anims.generateFrameNumbers('character_right', { start: 0, end: 0 }),
        frameRate: 0,
    });

    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('character_down', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'turn_down',
        frames: this.anims.generateFrameNumbers('character_down', { start: 0, end: 0 }),
        frameRate: 0,
    });
    
    
    var music = this.sound.add("lab_music", musicConfig);
    
    var musicConfig = {
        
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0

    }

    music.play(musicConfig);
}

// Tries to move playerTile in direction direction.
// Does check for collision.
// Where win condition contained.
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

function winGame(){
    console.log("WINNNER");
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

function update ()
{
    var cursors = this.input.keyboard.createCursorKeys();
    playerObject = gameMatrix[Math.floor(player.x/32)][Math.floor(player.y/32)];

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
    }
    
    if(inputQueue.length() != 0 && movingObjects.length == 0){
        var direction = inputQueue.dequeue(); 
        player.anims.play("turn_" + direction);
        playerMoveTo(playerObject,direction);
        framesSinceMoved = 0;
    }
    framesSinceMoved += 1;
    
    
    //move Right
    if (cursors.right.isDown && !lastFrameDown.right){
        inputQueue.enqueue("right");
        lastFrameDown.right = true;
    } else if(cursors.right.isDown == false){
        lastFrameDown.right = false;
    }
    
    //move Left
    if (cursors.left.isDown && !lastFrameDown.left){
        inputQueue.enqueue("left");
        lastFrameDown.left = true;
    } else if(cursors.left.isDown == false){
        lastFrameDown.left = false;
    }
    
    //move Up
    if (cursors.up.isDown && !lastFrameDown.up){
        inputQueue.enqueue("up");
        lastFrameDown.up = true;
    } else if(cursors.up.isDown == false){
        lastFrameDown.up = false;
    }
    
    //move Down    
    if (cursors.down.isDown && !lastFrameDown.down){
        inputQueue.enqueue("down");
        lastFrameDown.down = true;
    } else if(cursors.down.isDown == false){
        lastFrameDown.down = false;
    }

}

export {gridToPixel, pixelToGrid}

// starts game
var game = new Phaser.Game(config);