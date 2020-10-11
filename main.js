const fs = require('fs');

var gameParams = JSON.parse(fs.readFileSync('/Levels/testLevel.json'));

import {makePreload} from "/stageGenerate/makePreload.js"
import {create} from "/stageGenerate/makeCreate.js"
import {update} from "/stageGenerate/makeUpdate.js"

preload = makePreload(gameParams);
console.log("Why isn't this working?")

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