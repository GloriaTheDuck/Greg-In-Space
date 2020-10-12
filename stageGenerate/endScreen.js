var dialog = [
    {
        
        speaker: "greg",
        spealerSprite: "player",
        speakerLocation: "left",
        text: "sampleText1",
    },
    {
        speaker: "greg",
        spealerSprite: "player",
        speakerLocation: "left",
        text: "sampleText2",
    }
];

export var endScreen = {
    preload: function(){
        this.load.spritesheet('greg', 'sprite_right.png', { frameWidth: 32, frameHeight: 32 } );
        this.load.spritesheet('executive', 'aliensprite_idle.png',{ frameWidth: 32, frameHeight: 32 });
    },
    create: function(){
        this.text = this.add.text(48, 150, dialog[0].text, {
            fontSize : '25px',
            backgroundColor : "#1e2",
        });
        this.dialogIndex = 0;
        var player = this.physics.add.sprite(6,150,'greg');
        player.setScale(2);
        var exec = this.physics.add.sprite(300,150,'executive');
        exec.setScale(2);
    },
    update: function(){
        var cursors = this.input.keyboard.createCursorKeys();
        
        if(cursors.right.isDown){
            if(this.dialogIndex < dialog.length){
                this.dialogIndex += 1;
                this.text.setText(dialog[this.dialogIndex].text);
            }
        }
    }
}