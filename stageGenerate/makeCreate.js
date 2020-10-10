import * as gameParams from "./globalVar.js";

function create ()
{
    const map = this.make.tilemap({ key: "tilemap" });
    
    for(var i = 0; i<gameMatrix.length; i++){
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
    
    
    var music = this.sound.add("music", musicConfig);
    
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