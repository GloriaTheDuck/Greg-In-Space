import * as gameParams from "./globalVar.js"
import * as testLevel from "/Levels/testLevel.js";
import {makePreload} from "/stageGenerate/makePreload.js"
import {create} from "/stageGenerate/makeCreate.js"
import {update} from "/stageGenerate/makeUpdate.js"
var movingObjects;


console.log(testLevel.default);
var preload = makePreload(testLevel.default);

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

// starts game
var game = new Phaser.Game(config);