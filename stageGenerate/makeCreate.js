import * as gameParams from "../globalVar.js";
import {tileObject} from "../tileObject.js";

// Generic Create Function for puzzle stage
export function create ()
{
    this.nextInput;
    this.lastInput;
    
    // Places Level Number In Top Left Hand Corner
    if(this.levelNumber != 0){
        this.add.text(50,50, "Level " + this.levelNumber, {fontSize : '24px'})
    }
    
    // Creates this.gameMatrix = var gameMatrix used to store sprites and collision information.
    var gameMatrix = new Array(gameParams.stageWidth);

    for(var i = 0; i<gameParams.stageWidth; i++){
        gameMatrix[i] = new Array(gameParams.stageHeight);
    }
    this.gameMatrix = gameMatrix;
    
    // Creates Phaser tilemap object from tilemap loaded in Preload
    var map = this.make.tilemap({ key: "tilemap"+this.name });
    console.log(map)
    
    // Creates Good Tilemap Manager for good worldToTile and tileToWorld functions
    var goodMap = new goodTileMapManager(map,2);
    this.worldToTileX = goodMap.worldToTileX;
    this.worldToTileY = goodMap.worldToTileY;
    this.tileToWorldX = goodMap.tileToWorldX;
    this.tileToWorldY = goodMap.tileToWorldY;
    
    // Fills in information about tileObjects
    for(var i = 0; i<gameMatrix.length; i++){
        for(var j=0; j<gameMatrix[0].length; j++){
            gameMatrix[i][j] = new tileObject(this,i,j,null,goodMap);
        }
    }
    
    // Creates this.movingObjects = var movingObjects
    var movingObjects = [];
    this.movingObjects = movingObjects;
    
    // Adds flooring image
    var floorTileSet = map.addTilesetImage("Floor", "flooring");
    
    
    // Loads background sprites from tilemap as sprites
    var colorLayer = map.createStaticLayer("Color Fill", floorTileSet, 0, 0);
    if(colorLayer != null){    
        goodMap.makeGoodLayer(colorLayer);
    }
    
    var backgroundLayer = map.createStaticLayer("Background", floorTileSet, 0, 0);
    if(backgroundLayer != null){
        goodMap.makeGoodLayer(backgroundLayer);
    }
    
    // Loads water into the game
    var waterTiles = map.createFromObjects("Group", "puddle", {key: "water"});
    console.log(waterTiles);
    waterTiles.forEach(function(e){
        e.name = "water"
        goodMap.makeGoodObject(e);
        gameMatrix[goodMap.worldToTileX(e.x)][goodMap.worldToTileY(e.y)].background = "water";
    })
    
    
    // Loads rocks from tilemap as sprites
    var rocks = map.createFromObjects("Group", "rock" , {key:"rock", frame:1} );
    rocks = rocks.concat(map.createFromObjects("Group", "rocks" , {key:"rock", frame:1} ));
    this.physics.world.enable(rocks);
    
    // Places rock into gameMatrix
    for(var i = 0; i<rocks.length; i++){
        var current = rocks[i];
        current.name = "rock";
        goodMap.makeGoodObject(current);
        gameMatrix[goodMap.worldToTileX(current.x)][goodMap.worldToTileY(current.y)].foreground = current;
    }

    // Creates walls from sprites
    var wallsLayer = map.createStaticLayer("Walls",floorTileSet,0,0);
    goodMap.makeGoodLayer(wallsLayer);
    var walls = wallsLayer.getTilesWithin();
    console.log(wallsLayer);
    // Adds walls to gameMatrix
    // Note doesn't actually load sprites, just loads Object with single attribute this.name="wall"
    for(var i = 0; i<walls.length; i++){
        current = walls[i];
        if(current.index >= 0){
            gameMatrix[current.x][current.y].foreground = {name: "wall"};
        }
    }
    
    // Loads the player in from the spawn point, and places in gameMatrix.
    // Sets this.player = player and this.playerObject = gameMatrix.find(player)
    // Adds attribute this.execsCollected = 0 to player.
    const spawnPoint = map.findObject("Player", obj => obj.name === "playerSpawn");
    var player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y,'character_right',"player")
    goodMap.makeGoodObject(player);
    this.player = player;
    player.execsCollected = 0;
    

    var playerObject = gameMatrix[goodMap.worldToTileX(player.x)][goodMap.worldToTileY(player.y)];
    gameMatrix[map.worldToTileX(player.x)][goodMap.worldToTileY(player.y)].foreground = player;
    this.playerObject = playerObject;
    
    // Takes exit info from tilemap and stores it in player
    
    const exitPoint = map.findObject("Player", obj => obj.name === "exit");
    goodMap.makeGoodObject(exitPoint);
    gameMatrix[goodMap.worldToTileX(exitPoint.x)][goodMap.worldToTileY(exitPoint.y)].foreground = {name : "exit"};
    
    
    // Loads the executives and places them in the gameMatrix
    var executives = map.createFromObjects("Group", "alien" , {key: "executive"});
    executives.concat(map.createFromObjects("Group", "aliens", {key: "executive"}));
    this.executives = executives
    for(var i = 0; i<this.executives.length; i++){
        current = this.executives[i];
        goodMap.makeGoodObject(current);
        gameMatrix[goodMap.worldToTileX(current.x)][goodMap.worldToTileY(current.y)].foreground = current;
        current.name = "executive"
    }
    

    // ANIMATIONS
    
    // alien_idle animation
    this.anims.create({
        key: 'alien_idle',
        frames: this.anims.generateFrameNumbers('executive', { start: 0, end: 1 }),
        frameRate: 1,
        repeat: -1
    });
    
    // Applies alien_idle to aliens
    for(var i = 0; i<executives.length;i++){
        executives[i].anims.play("alien_idle",true);
    }
    
    // left right up down movement anims for player
    // also single animations for player turning turn_left turn_right turn_up turn_down
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
    
    // Loads music from makeCreate
    
    
    console.log(gameParams.music);
    if(gameParams.music == null){
        var music = this.sound.add("music" + this.name, musicConfig);
        gameParams.setMusic(music)
    
        var musicConfig = {
        
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        
        music.play(musicConfig);
    }

    //sound effects
    this.traversingtiles = this.sound.add("traversing_tiles", sound_effectsConfig);
    this.rockpushing = this.sound.add("rock-pushing", sound_effectsConfig);
    this.collectalien = this.sound.add("collect_alien", sound_effectsConfig);
    this.invalidmove = this.sound.add("invalid", sound_effectsConfig);




    var sound_effectsConfig = {

        mute: false,
        volume: 0.5,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    }
    
    // Adds Opening Text Scene
    if(this.textScenes != null){
        this.textScene = this.textScenes.start;    
    }
}

function findCentering(windowLength, pictureLength){
    return (windowLength-pictureLength)/2
}

function makeCenter(layer){
    console.log(layer);
    layer.x = findCentering(400,layer.widthInPixels)
    layer.y = findCentering(300,layer.heightInPixels)
    console.log(layer.x,layer.y)
}

function goodTileMapManager(tilemap, scale){
    this.scale = scale
    this.topLeftX = findCentering(800, tilemap.widthInPixels * this.scale);
    this.topLeftY = findCentering(600, tilemap.heightInPixels * this.scale);
    this.worldToTileX = (x) => Math.floor((x-this.topLeftX)/64);
    this.worldToTileY = (y) => Math.floor((y-this.topLeftY)/64);
    this.tileToWorldX = (x) => 64*x + this.topLeftX;
    this.tileToWorldY = (y) => 64*y + this.topLeftY;
    this.tileWidth = tilemap.tileWidth * scale;
    this.tileHeight = tilemap.tileHeight * scale;
    this.makeGoodLayer = function(layer){
        layer.scale = this.scale;
        layer.x = this.topLeftX
        layer.y = this.topLeftY
    }
    this.makeGoodObject = function(a){
        a.x = 2 * a.x + this.topLeftX;
        a.y = 2 * a.y + this.topLeftY;
        a.scale = 2;
    }
}