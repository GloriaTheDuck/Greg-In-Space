var dialog = [
    {
        
        speaker: "greg",
        spealerSprite: "player",
        speakerLocation: "left",
        text: "sampleText1 sampleText1 sampleText1 sampleText1 sampleText1 sampleText1 ",
    },
    {
        speaker: "greg",
        spealerSprite: "player",
        speakerLocation: "left",
        text: "sampleText2",
    }
];
var lastFramePressed = false;

export var endScreen = {
    preload: function(){
        console.log(this.game);
        this.load.spritesheet('greg', 'sprite_right.png', { frameWidth: 32, frameHeight: 32 } );
        this.load.spritesheet('executive', 'aliensprite_idle.png',{ frameWidth: 32, frameHeight: 32 });
    },
    create: function(){
        this.text = this.add.text(48, 150, dialog[0], {
            fontSize : '16px',
            backgroundColor : "#1e2",
            wordWrap: {width: 10}
        });
        this.text.setText(dialog[0].text);
        this.dialogIndex = 0;
        var player = this.physics.add.sprite(20,160,'greg');
        player.setScale(2);
        var exec = this.physics.add.sprite(200,160,'executive');
        exec.setScale(2);
    },
    update: function(){
        var cursors = this.input.keyboard.createCursorKeys();
        
        if(cursors.right.isDown){
            if(this.dialogIndex < dialog.length && !lastFramePressed){
                this.dialogIndex += 1;
                this.text.setText(dialog[this.dialogIndex].text);
            }
            lastFramePressed = true;
        }
        else{
            lastFramePressed = false;
        }
    }
}