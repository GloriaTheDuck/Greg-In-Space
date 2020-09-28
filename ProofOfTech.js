var stageWidth = 10;
var stageHeight = 6;
var tileSize = 32;
var playerObject;
var player;
var lastFrameDown = {
    right:false,
    left:false,
    up:false,
    down:false
};

function pixelToGrid(x){
    return Math.floor(x/tileSize);
}

function gridToPixel(x){
    return x*tileSize + Math.floor(tileSize/2);
}

var gameMatrix = new Array(stageWidth);

for(var i = 0; i<stageWidth; i++){
    gameMatrix[i] = new Array(stageHeight);
}

for(i = 0; i<stageWidth; i++){
    for(var j=0; j<stageHeight; j++){
        gameMatrix[i][j] = new tileObject(i,j,null);
    }
}

function inBounds(x,y){
    return (0<= x) && (x < stageWidth) && (0<= y) && (y <stageHeight);
}

function collectExec(player, executive){
    executive.disableBody(true,true);
    player.execsCollected += 1
}

function tileObject(x,y,sprite){
    this.x = x;
    this.y = y;
    this.foreground = sprite;
    this.background = null;
    
    this.getTileAbove =  function(){
        return inBounds(this.x,this.y-1) ? gameMatrix[this.x][this.y-1] : null;
    };
    this.getTileBelow =  function(){
        return inBounds(this.x,this.y+1) ? gameMatrix[this.x][this.y+1] : null;
    };
    this.getTileRight =  function(){
        return inBounds(this.x+1,this.y) ? gameMatrix[this.x+1][this.y] : null;
    };
    this.getTileLeft =  function(){
        return inBounds(this.x-1,this.y) ? gameMatrix[this.x-1][this.y] : null;
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
        if(direction == "up"){ this.foreground.y += -tileSize;}
        if(direction == "down"){ this.foreground.y += tileSize;}
        if(direction == "right"){ this.foreground.x += tileSize;}
        if(direction == "left"){ this.foreground.x += -tileSize;}
        console.log(direction,this.getTile(direction));
        this.getTile(direction).foreground = this.foreground;
        this.foreground = null;
    }
    
    this.moveUp = function(){
        this.foreground.y += -tileSize;
        this.getTileAbove().foreground = this.foreground;
        this.foreground = null;
    };
    
    this.moveDown = function(){
        this.foreground.y += tileSize;
        this.getTileBelow().foreground = this.foreground;
        this.foreground = null;
    };
    
    this.moveRight = function(){
        this.foreground.x += tileSize;
        this.getTileRight().foreground = this.foreground;
        this.foreground = null;
    };
    
    this.moveLeft = function(){
        this.foreground.x += -tileSize;
        this.getTileLeft().foreground = this.foreground;
        this.foreground = null;
    };
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
    scene: scene,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

function addObject(b,x,y,image,nam){
    var a = b.physics.add.sprite(tileSize * x, tileSize*y, image);
    a.name = nam;
    gameMatrix[x][y] = new tileObject(x,y,a);
    return a;
}

var game = new Phaser.Game(config);

function preload ()
{
    this.load.spritesheet('greg',"Sprint1/Character_Up.png",{frameWidth: 32, frameHeight:32});
    this.load.image('water', "Sprint1/Water.png");
    this.load.image('exec', "Sprint1/EyeBall Monster-Sheet.png");
    this.load.image('rock', "Sprint1/addwork.png");
    this.load.spritesheet('wall', 'Sprint1/tileset.png',{frameWidth: 32, frameHeight:32});
    this.load.image('exit', "Sprint1/exit.png");
    this.load.image('executive', "Sprint1/EyeBall Monster-Sheet.png");
    
    //loading music
    this.load.audio('lab_music', "Sprint1/lab_gameplay_music.mp3");
}

function create ()
{
    
    this.physics.add.sprite(96,96,"water")
    
    addObject(this,1,2,'rock',"rock");
    addObject(this,2,2,'rock',"rock");
    addObject(this,2,3,'rock',"rock");
    addObject(this,3,2,'rock',"rock");
    addObject(this,4,3,'rock',"rock");
    addObject(this,4,4,'rock',"rock");
    addObject(this,6,4,'rock',"rock");
    
    addObject(this,3,1,'exec',"exec");
    addObject(this,6,3,'exec',"exec");

    addObject(this,0,0,'wall',"wall");
    addObject(this,1,0,'wall',"wall");
    addObject(this,2,0,'wall',"wall");
    addObject(this,3,0,'wall',"wall");
    addObject(this,4,0,'wall',"wall");
    addObject(this,5,0,'wall',"wall");
    addObject(this,6,0,'wall',"wall");
    addObject(this,7,0,'wall',"wall");
    addObject(this,8,0,'wall',"wall");
    addObject(this,0,1,'wall',"wall");
    addObject(this,5,1,'wall',"wall");
    addObject(this,0,2,'wall',"wall");
    addObject(this,5,2,'wall',"wall");
    addObject(this,6,2,'wall',"wall");
    addObject(this,0,3,'exit',"exit");
    addObject(this,7,3,'wall',"wall");
    addObject(this,0,4,'wall',"wall");
    addObject(this,7,4,'wall',"wall");
    addObject(this,0,5,'wall',"wall");
    addObject(this,1,5,'wall',"wall");
    addObject(this,2,5,'wall',"wall");
    addObject(this,3,5,'wall',"wall");
    addObject(this,4,5,'wall',"wall");
    addObject(this,5,5,'wall',"wall");
    addObject(this,6,5,'wall',"wall");
    addObject(this,7,5,'wall',"wall");
    addObject(this,8,5,'wall',"wall");
    
    player = addObject(this,1,3,'greg',"player");
    player.execsCollected = 0;
    
    gameMatrix[3][3].background = "water";
    
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

function playerMoveTo(playerTile,direction){
    var toTile = playerObject.getTile(direction);
    if( toTile != null){
        if(toTile.foreground == null){
            playerTile.moveDirection(direction);
        } else if(toTile.foreground.name == "rock"){
            rockPush(toTile,direction);
        } else if(toTile.foreground.name == "exec"){
            collectExec(playerObject.foreground,toTile.foreground);
            playerObject.moveDirection(direction);
        } else if(toTile.foreground == "exit"){
            if(player.execsCollected == 2){
                this.add.text(0, 0, 'You Won', { font: '"Press Start 2P"' });
                playerTile.moveDirection(direction);
            }
        }
        
    }
}

function rockPush(rockTile,direction){
    var toTile = rockTile.getTile(direction);
    if(toTile != null){
        if(toTile.foreground == null && toTile.getTile(direction).background != "water"){
            rockTile.moveDirection(direction);
        }
    }
}

function update ()
{
    var cursors = this.input.keyboard.createCursorKeys();
    hasMoved = false;

    playerObject = gameMatrix[Math.floor(player.x/32)][Math.floor(player.y/32)];
    
    //move Right
    if (cursors.right.isDown && !lastFrameDown.right){
        playerMoveTo(playerObject,"right");
        lastFrameDown.right = true;
    } else if(cursors.right.isDown == false){
        lastFrameDown.right = false;
    }
    
    //move Left
    if (cursors.left.isDown && !lastFrameDown.left){
        playerMoveTo(playerObject,"left");
        lastFrameDown.left = true;
    } else if(cursors.left.isDown == false){
        lastFrameDown.left = false;
    }
    
    //move Up
    if (cursors.up.isDown && !lastFrameDown.up){
        playerMoveTo(playerObject,'up');
        lastFrameDown.up = true;
    } else if(cursors.up.isDown == false){
        lastFrameDown.up = false;
    }
    
    //move Down    
    if (cursors.down.isDown && !lastFrameDown.down){
        playerMoveTo(playerObject,"down");
        lastFrameDown.down = true;
    } else if(cursors.down.isDown == false){
        lastFrameDown.down = false;
    }


}
