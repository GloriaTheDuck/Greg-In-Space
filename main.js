import * as gameParams from "./globalVar.js";
import * as levels from "./levels.js";
import {makePreload} from "./stageGenerate/makePreload.js";
import {create} from "./stageGenerate/makeCreate.js";
import {update} from "./stageGenerate/makeUpdate.js";
import {endScreen} from "./stageGenerate/endScreen.js";
import {introScreen} from "./stageGenerate/introScreen.js";

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

// Title Scene
var titleScene = {
  preload: function(){
    this.load.image("background", "Assets/planet.png")
  },
  create: function(){
    var background = this.add.image(400, 300, "background")
    this.key = "title";
    
    // Add next button
    this.input.on('pointerup', function(pointer){
        console.log("click");
        this.scene.start("introScreen");
    }, this);
  },
  update: function(){}
}


// Returns a function for starting level i
function makePointerFunction(i){
    return function(pointer){
        this.scene.scene.stop("menu");
        this.scene.scene.start(levels.default[i].sceneName);      
    }
}

// Basic configuration for test menu Screen.
var menuScene = {
    preload: function(){
        this.load.image('levelSel', "Assets/levelselect.png");
    },
    create: function(){
        this.key = "menu"
        
        var image = this.add.image(400,300,'levelSel');
        
        // Creates buttons for levels 1-10
        for(var i = 0; i<levels.default.length-1; i++){
            var currentIcon = this.physics.add.sprite(160 + 120*(i % 5), 302 + 120 * Math.floor(i/5),'temp')
            currentIcon.index = i+1;
            currentIcon.setInteractive();
            currentIcon.scale = 2;
            currentIcon.setAlpha(0.001);
            currentIcon.on('pointerup', makePointerFunction(i+1));
        }
        
        // Creates icon for tutorial
        var tutorialIcon = this.physics.add.sprite(400,180,'temp');
        tutorialIcon.scaleX = 12.6
        tutorialIcon.scaleY = 2.8
        tutorialIcon.setInteractive();
        tutorialIcon.setAlpha(0.001)
        tutorialIcon.on('pointerup', function(){
            this.scene.scene.stop("menu");
            this.scene.scene.start("level0");
        })
        
        image.on('pointerup', function(){
            this.scene.scene.stop("menu");
            this.scene.scene.start("level1");
        })
    },
    update: function(){}
}


// Configuration for the game
var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'yourgamediv',
        mode: Phaser.Scale.FIT,
        width: 800,
        height: 600
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

// starts game
var game = new Phaser.Game(config);

// Adds scenes to game
levels.default.forEach(function(lvl){
    game.scene.add(lvl.sceneName,makeConfig(lvl));
})

// Adds tutorial and tutorial text
var tutParams = levels.default[0]
game.scene.add("level0",{
    preload:makePreload(tutParams),
    create:function(){
        create.call(this);
        this.scene.run("tutorialText");
    },
    update: update
});

// Text specifically for Tutorial Text
game.scene.add("tutorialText",{
    preload: function(){},
    create: function(){
        this.text = this.add.text(48, 150, "hello", {
            fontSize : '16px',
            wordWrap: {width: 200}
        });
        this.text.setText("Press arrow Keys to move around. Collect the pink aliens and then make it to the exit.");
    },
    // Optional code for remove text functionality
    //update: function(){
    //    var keyPressed = false;
    //    var cursors = this.input.keyboard.createCursorKeys();
    //    [cursors.right,cursors.left,cursors.up,cursors.down].forEach(function(e){
    //      if(e.isDown){
    //          keyPressed = true;
    //      }  
    //    })
    //    if(keyPressed){
    //        this.scene.stop();
    //    }
    //}
});

game.scene.add()
game.scene.add("title", titleScene, true);
game.scene.add("menu",menuScene);
game.scene.add("endScene",endScreen);
game.scene.add("introScreen",introScreen);
game.scene.add("endCard",{
    preload: function(){
        this.load.image("e","Assets/endcard.png");
    },
    create: function(){
        this.physics.add.image(400,300,"e");
    }
})
