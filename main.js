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
            cursors.up.isDown = false;
            this.game.scene.pause("menu");
            this.game.scene.switch("menu","tut")
        }
        
        if(cursors.down.isDown){
            this.game.scene.switch("menu","level1")
        }
        
        if(cursors.left.isDown){
            this.game.scene.switch("menu","level6")
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
    }
};

// starts game
var game = new Phaser.Game(config);

// Adds scenes to game
game.scene.add("level6",makeConfig(levels.default.testLevel));
game.scene.add("tut",makeConfig(levels.default.tutorial));
game.scene.add("level1",makeConfig(levels.default.level1));
game.scene.add("menu",menuScene,true);
game.scene.add("endScene",endScreen);
