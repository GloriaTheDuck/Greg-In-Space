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


var game = new Phaser.Game(config);

function preload ()
{
    this.load.spritesheet('greg',"Sprint1/Character_Up.png",{frameWidth: 32, frameHeight:32});
    this.load.image('executive', "Sprint1/EyeBall Monster-Sheet.png")
}

function create ()
{
    player = this.physics.add.sprite(32,32,'greg');
    gameMatrix[1][1] = new tileObject(1,1,player);
    player.execsCollected = 0;
    player.name = "player";
    executive = this.physics.add.sprite(64,64,'executive');
    executive.name = "exec";
    gameMatrix[2][2] = new tileObject(2,2,executive);
}

function update ()
{
    var cursors = this.input.keyboard.createCursorKeys();
    hasMoved = false;

    playerObject = gameMatrix[Math.floor(player.x/32)][Math.floor(player.y/32)];
    
    //move Right
    if (cursors.right.isDown && !lastFrameDown.right){
        var tileRight = playerObject.getTileRight();
        if( tileRight != null){
            if(tileRight.foreground == null){
                playerObject.moveRight();
            }
            else if(tileRight.foreground.name == "rock"){
                if(tileRight.getTileRight() != null){
                    if(tileRight.getTileRight().foreground == null){
                        tileRight.moveRight();
                    }
                }
            } else if(tileRight.foreground.name == "exec"){
                collectExec(player,tileRight.foreground);
                playerObject.moveRight();
            } else if(tileRight.foreground.name == "exit"){
                if(player.execsCollected == 2){
                    this.add.text(0, 0, 'You Won', { font: '"Press Start 2P"' });
                }
            }
        }
        lastFrameDown.right = true;
    } else if(cursors.right.isDown == false){
        lastFrameDown.right = false;
    }
    
    //move Left
    if (cursors.left.isDown && !lastFrameDown.left){
        var tileLeft = playerObject.getTileLeft();
        
        if(tileLeft != null){
            if(tileLeft.foreground == null){
                playerObject.moveLeft();
            }
            else if(tileLeft.foreground.name == "rock"){
                if(tileLeft.getTileLeft() != null){
                    if(tileLeft.getTileLeft().foreground == null){
                        tileLeft.moveLeft();
                    }
                }
            } else if(tileLeft.foreground.name == "exec"){
                collectExec(player,tileLeft.foreground);
                playerObject.moveLeft();
            } else if(tileRight.foreground.name == "exit"){
                if(player.execsCollected == 2){
                    this.add.text(0, 0, 'You Won', { font: '"Press Start 2P"' });
                }
            }
            lastFrameDown.left = true;
        }
        
    } else if(cursors.left.isDown == false){
        lastFrameDown.left = false;
    }
    
    //move Up
    if (cursors.up.isDown && !lastFrameDown.up){
        var tileAbove = playerObject.getTileAbove();
        if(tileAbove != null){
            if(tileAbove.foreground == null){
                playerObject.moveUp();
            }
            else if(tileAbove.foreground.name == "rock"){
                if(tileAbove.getTileAbove() != null){
                    if(tileAbove.getTileAbove().foreground == null){
                        tileAbove.moveUp();
                    }
                }
            } else if(tileAbove.foreground.name == "exec"){
                collectExec(player,tileAbove.foreground);
                playerObject.moveUp();
            } else if(tileRight.foreground.name == "exit"){
                if(player.execsCollected == 2){
                    this.add.text(0, 0, 'You Won', { font: '"Press Start 2P"' });
                }
            }
        }
        lastFrameDown.up = true;
    } else if(cursors.up.isDown == false){
        lastFrameDown.up = false;
    }
    
    //move Down    
    if (cursors.down.isDown && !lastFrameDown.down){
        var tileBelow = playerObject.getTileBelow();
        
        if(tileBelow != null){
            if(tileBelow.foreground == null){
                playerObject.moveDown();
            }
            else if(tileBelow.foreground.name == "rock"){
                if(tileBelow.getTileBelow() != null){
                    if(tileBelow.getTileBelow().foreground == null){
                        tileBelow.moveDown();
                    }
                }
            } else if(tileBelow.foreground.name == "exec"){
                collectExec(player,tileBelow.foreground);
                playerObject.moveDown();
            } else if(tileRight.foreground.name == "exit"){
                if(player.execsCollected == 2){
                    this.add.text(0, 0, 'You Won', { font: '"Press Start 2P"' });
                }
            }
        }
        lastFrameDown.down = true;
    } else if(cursors.down.isDown == false){
        lastFrameDown.down = false;
    }


}