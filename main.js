import * as gameParams from "./globalVar.js";
import * as levels from "./levels.js";
import {makePreload} from "./stageGenerate/makePreload.js";
import {makeCreate} from "./stageGenerate/makeCreate.js";
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
        create: makeCreate(levelsObject),
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
      this.scene.stop("title");
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
        console.log(this.game.scene.getScenes());
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
    console.log(lvl);
    game.scene.add(lvl.sceneName,makeConfig(lvl));
})



game.scene.add()
game.scene.add("title", titleScene, true);
game.scene.add("menu",menuScene);
game.scene.add("endScene",endScreen);
