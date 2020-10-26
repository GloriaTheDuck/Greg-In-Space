// Creates custom Preload Function based upon levelParams from /levels.js
export function makePreload(levelParams){
    return function(){
        this.load.image('flooring', 'Assets/tileset.png');
        this.load.image('rock', 'Assets/addwork.png');
        this.load.spritesheet('executive', 'Assets/aliensprite_idle.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('character_right', 'Assets/sprite_right.png', { frameWidth: 32, frameHeight: 32 } );
        this.load.spritesheet('character_left', 'Assets/sprite_left.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('character_up', 'Assets/sprite_up.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('character_down', 'Assets/sprite_down.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('water', "Assets/MasterSimple.png");
        this.load.image('exit', "Assets/sprite_down.png",{ frameWidth: 32, frameHeight: 32 });
    
        //loading music
        this.load.audio('music', levelParams.music);
        
        //names scene
        this.name = levelParams.sceneName;
        
        this.textScenes = levelParams.textScenes;
        
        this.load.tilemapTiledJSON('tilemap' + this.name, levelParams.json);
        
        //loading sound effects
        this.load.audio('rock-pushing', "Sound/rock_pushing.mp3");
        this.load.audio('traversing_tiles', "Sound/traversing_tiles.mp3");
        this.load.audio('collect_alien', "Sound/collect_alien.mp3");
        this.load.audio('invalid', "Sound/invalid.mp3");
    }
}
