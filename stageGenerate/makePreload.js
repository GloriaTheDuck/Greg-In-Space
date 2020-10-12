export function makePreload(levelParams){
    return function(){
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
        this.load.image('flooring', 'Sprint1/tileset.png');
        this.load.image('rock', 'Sprint1/addwork.png');
        this.load.spritesheet('executive', 'aliensprite_idle.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('character_right', 'sprite_right.png', { frameWidth: 32, frameHeight: 32 } );
        this.load.spritesheet('character_left', 'sprite_left.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('character_up', 'sprite_up.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('character_down', 'sprite_down.png', { frameWidth: 32, frameHeight: 32 });
        this.load.tilemapTiledJSON('tilemap', levelParams.json);
        //this.load.image('water', "Sprint1/Water.png");
        this.load.image('exit', "Sprint1/sprite_down.png",{ frameWidth: 32, frameHeight: 32 });
    
        //loading music
        this.load.audio('music', levelParams.music);
    }
}