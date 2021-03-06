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
export function textConfig(dialog, returnScene, endLevel){
    this.endLevel = endLevel || false;
    this.preload = makePreload.call(this, dialog, returnScene);
    this.create = function(){
        var textbox = this.physics.add.sprite(400,500,'textbox');
        this.text = this.add.text(230,480, "", {
            fontSize : '20px',
            
            wordWrap: {width: 350}
        });
        this.text.setText(this.dialog[0]);
        this.text.setColor("fff")
        this.dialogIndex = 1;
    }
    this.update = function(){
        var cursors = this.input.keyboard.createCursorKeys();
        
        console.log(cursors.space.isDown,lastFramePressed)
        if(cursors.space.isDown){
            if(this.dialogIndex < dialog.length && !lastFramePressed){
                this.text.setText(this.dialog[this.dialogIndex]);
                this.dialogIndex += 1;
                lastFramePressed = true;
            }else if(this.dialogIndex == this.dialog.length && !lastFramePressed){
                this.scene.remove("textScene")
                if(this.endLevel){
                    this.scene.manager.getScenes(false).forEach(function(e){
                        e.scene.stop();
                    });
                    this.scene.start("menu");
                } else {
                    this.returnScene.scene.resume();
                }
            }
        }else{
            lastFramePressed = false;
        }
    }
}

function makePreload(dialog,returnScene){
    return function(){
        this.load.spritesheet('greg', 'Assets/sprite_right.png', { frameWidth: 32, frameHeight: 32 } );
        this.load.spritesheet('executive', 'Assets/aliensprite_idle.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.image('textbox','Assets/textbox.png')
        this.dialog = dialog; 
        this.returnScene = returnScene;
    }
}