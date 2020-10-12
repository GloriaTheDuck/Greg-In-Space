import * as gameParams from "./globalVar.js";
import * as levels from "./levels.js";
import {makePreload} from "./stageGenerate/makePreload.js";
import {create} from "./stageGenerate/makeCreate.js";
import {update} from "./stageGenerate/makeUpdate.js";
import {endScreen} from "./stageGenerate/endScreen.js";

var preload = makePreload(levels.default.tutorial);

var endScene = {
    preload: endScreen.preload,
    create: endScreen.create,
    update: endScreen.update
};

var scene = {
    preload: preload,
    create: create,
    update: update
};
console.log(endScreen);

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


// starts game
var game = new Phaser.Game(config);
game.scene.add("endScene",endScreen);

console.log("after the game");