import * as gameParams from "./globalVar.js";
import * as levels from "./levels.js";
import {makePreload} from "./stageGenerate/makePreload.js";
import {create} from "./stageGenerate/makeCreate.js";
import {update} from "./stageGenerate/makeUpdate.js";
import {endScreen} from "./stageGenerate/endScreen.js";

// Configuration for generic end screen
var endScene = {
    preload: endScreen.preload,
    create: endScreen.create,
    update: endScreen.update
};

// Function to make levels from parameters.
// Parameters can be seen in levels.js
function makeConfig(levelsObject){
    return {
        preload: makePreload(levelsObject),
        create: create,
        update: update
    }
}

//
var titleScene = {
  preload: function(){
    this.load.image("background", "Assets/planet.png")
  },
  create: function(){
    this.add.image(400, 300, "background")
    this.key = "title";
    console.log(this.key);
  },
  update: function(){
    this.input.on('pointerdown', function(pointer){
      console.log("click");
      this.scene.start("menu");
    }, this);
  },
}

// Basic configuration for test menu Screen.
var menuScene = {
    preload: function(){},
    create: function(){
        this.key = "menu"
        console.log(this.key)
        this.add.text(0,0, 'Press arrowKeys for different levels');
    },
    update: function(){
        var cursors = this.input.keyboard.createCursorKeys();
        if(cursors.up.isDown){
            this.game.scene.stop("menu");
            this.game.scene.start("tutorial")
        }

        if(cursors.down.isDown){
            this.game.scene.stop("menu");
            this.game.scene.start("level1")
        }

        if(cursors.left.isDown){
            this.game.scene.stop("menu");
            this.game.scene.start("level7")
        }
    }
}

// Configuration for the game
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
};

// starts game
var game = new Phaser.Game(config);

// Adds scenes to game
levels.default.forEach(function(lvl){
    game.scene.add(lvl.sceneName,makeConfig(lvl));
})

var tutParams = levels.default[1]
game.scene.add("tutorial",{
    preload:makePreload(tutParams),
    create:function(){
        create.call(this);
        this.firstFrame = true;
    },
    update:function(){
        if(this.firstFrame){
            this.firstFrame = false;
            this.scene.run("tutorialText");
        }
        if(this.player.execsCollected == 1){
            
        }
        update.call(this);
        console.log(this.scene.isVisible())
    }
});

game.scene.add("tutorialText",{
    preload: function(){},
    create: function(){
        this.text = this.add.text(48, 150, "hello", {
            fontSize : '16px',
            wordWrap: {width: 200}
        });
        this.text.setText("Press arrow Keys to move around. Collect the pink aliens and then make it to the exit.");
    },
    update: function(){
        var keyPressed = false;
        var cursors = this.input.keyboard.createCursorKeys();
        [cursors.right,cursors.left,cursors.up,cursors.down].forEach(function(e){
          if(e.isDown){
              keyPressed = true;
          }  
        })
        if(keyPressed){
            this.scene.stop();
        }
    }
});

game.scene.add()
game.scene.add("title", titleScene, true);
game.scene.add("menu",menuScene);
game.scene.add("endScene",endScreen);
