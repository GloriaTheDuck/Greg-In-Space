export var introScreen = {
    preload : function(){
        this.load.image('scene1', 'Assets/scene1.png');
        this.load.image('scene2', 'Assets/scene2.png');
        this.load.image('scene3', 'Assets/scene3.png');
        this.load.image('scene4', 'Assets/scene4.png');
    },
    create : function(){
        this.images = [];
        var words = ["scene1","scene2","scene3", "scene4"];
        this.addImage = function(e){
            var image = this.add.image(200,150,e);
            image.setScale(0.5);
            image.setAlpha(0)
            this.images.push(image);
        }
        words.forEach(
            element => this.addImage(element)
        );
        this.images[0].setAlpha(1);
        
        this.lastFramePressed = false;
        this.index = 0
        

        
    },
    update : function(){
        var cursors = this.input.keyboard.createCursorKeys();
        
        if(cursors.space.isDown){
            if(this.index < 3 && !this.lastFramePressed){
                this.index += 1;
                this.images[this.index].setAlpha(1);
                this.lastFramePressed = true;
            }else if(this.index == 3 && !this.lastFramePressed){
                this.scene.manager.getScenes(false).forEach(function(e){
                    e.scene.stop();
                });
                this.scene.start("menu");
            }
        }else{
            this.lastFramePressed = false;
        }
    }
}
