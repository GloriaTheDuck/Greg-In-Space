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
export function textConfig(dialog, returnScene){
    this.preload = makePreload.call(this,dialog, returnScene);
    this.create = function(){
        this.text = this.add.text(48, 150, "", {
            fontSize : '16px',
            backgroundColor : "#1e2",
            wordWrap: {width: 130}
        });
        this.text.setFont("Roboto");
        this.text.setText(this.dialog[0].text);
        this.dialogIndex = 1;
        var player = this.physics.add.sprite(20,160,'greg');
        player.setScale(2);
        var exec = this.physics.add.sprite(200,160,'executive');
        exec.setScale(2);
    }
    this.update = function(){
        var cursors = this.input.keyboard.createCursorKeys();
        
        console.log(cursors.space.isDown,lastFramePressed)
        if(cursors.space.isDown){
            if(this.dialogIndex < dialog.length && !lastFramePressed){
                this.text.setText(this.dialog[this.dialogIndex].text);
                this.dialogIndex += 1;
                lastFramePressed = true;
            }else if(this.dialogIndex == this.dialog.length && !lastFramePressed){
                console.log(this)
                this.scene.remove("textScene")
                this.returnScene.scene.resume();
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
        this.dialog = dialog; 
        this.returnScene = returnScene;
    }
}