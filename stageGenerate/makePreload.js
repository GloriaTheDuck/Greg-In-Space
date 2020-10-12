export function makePreload(levelParams){
    return function(){
        this.load.image('flooring', 'Assets/tileset.png');
        this.load.image('rock', 'Assets/addwork.png');
        this.load.spritesheet('executive', 'Assets/aliensprite_idle.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('character_right', 'Assets/sprite_right.png', { frameWidth: 32, frameHeight: 32 } );
        this.load.spritesheet('character_left', 'Assets/sprite_left.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('character_up', 'Assets/sprite_up.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('character_down', 'Assets/sprite_down.png', { frameWidth: 32, frameHeight: 32 });
        this.load.tilemapTiledJSON('tilemap', levelParams.json);
        //this.load.image('water', "Sprint1/Water.png");
        this.load.image('exit', "Assets/sprite_down.png",{ frameWidth: 32, frameHeight: 32 });
    
        //loading music
        this.load.audio('music', levelParams.music);
    }
}