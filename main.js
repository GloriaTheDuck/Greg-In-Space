import * as gameParams from "/Levels/testLevel.js";

import {makePreload} from "/stageGenerate/makePreload.js"
import {create} from "/stageGenerate/makeCreate.js"
import {update} from "/stageGenerate/makeUpdate.js"

preload = makePreload(gameParams);

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