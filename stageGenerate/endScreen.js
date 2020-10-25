import * as gameParams from "../globalVar.js";

// temporary test for the dialog function
var dialog = [
    {
        speaker: "greg",
        spealerSprite: "player",
        speakerLocation: "left",
        text: "Finally, you took long enough",
    },
    {
        speaker: "greg",
        spealerSprite: "player",
        speakerLocation: "left",
        text: "Any longer and I would have to have asked for help",
    }
];
var lastFramePressed = false;

// Gives generic configuration for end screen
export var endScreen = {
    preload: function(){
        this.load.spritesheet('greg', 'Assets/sprite_right.png', { frameWidth: 32, frameHeight: 32 } );
        this.load.spritesheet('executive', 'Assets/aliensprite_idle.png',{ frameWidth: 32, frameHeight: 32 });
    },
    create: function(){
        this.text = this.add.text(48, 150, dialog[0], {
            fontSize : '16px',
            backgroundColor : "#1e2",
            wordWrap: {width: 130}
        });
        this.text.setText(dialog[0].text);
        this.dialogIndex = 1;
        var player = this.physics.add.sprite(20,160,'greg');
        player.setScale(2);
        var exec = this.physics.add.sprite(200,160,'executive');
        exec.setScale(2);
    },
    update: function(){
        var cursors = this.input.keyboard.createCursorKeys();
        
        if(cursors.space.isDown){
            if(this.dialogIndex < dialog.length && !lastFramePressed){
                this.text.setText(dialog[this.dialogIndex].text);
                this.dialogIndex += 1;
                lastFramePressed = true;
            }else if(this.dialogIndex == dialog.length && !lastFramePressed){
                this.scene.manager.getScenes(false).forEach(function(e){
                    gameParams.music.stop();
                    e.scene.stop();
                });
                this.scene.run("menu")
            }
        }else{
            lastFramePressed = false;
        }
    }
}
