export var introScreen = {
    preload : function(){
        this.load.image('scene1', 'Assets/scene1.png');
        this.load.image('scene2', 'Assets/scene2.png');
        this.load.image('scene3', 'Assets/scene3.png');
        this.load.image('scene4', 'Assets/scene4.png');
        this.load.audio('introMusic', "Sound/CS_Storyboard_Music.mp3")
    },
    create : function(){
        this.images = [];
        var words = ["scene1","scene2","scene3", "scene4"];
        this.addImage = function(e){
            var image = this.add.image(400,300,e);
            image.setAlpha(0)
            this.images.push(image);
        }
        words.forEach(
            element => this.addImage(element)
        );
        this.images[0].setAlpha(1);
        
        this.lastFramePressed = false;
        var music = this.sound.add("introMusic", musicConfig);
        this.music = music;
    
        var musicConfig = {
        
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0

        }
        music.play();
        this.index = 0
        
        this.input.on('pointerup', function(scene){
            return function(){
                if(scene.index < 3){
                    scene.index += 1;
                    scene.images[scene.index].setAlpha(1);
                }else if(scene.index == 3){
                    scene.scene.manager.getScenes(false).forEach(function(e){
                        e.scene.stop();
                    });
                    scene.music.stop();
                    scene.scene.start("level0");
                }    
            }
        }(this))
        
    }
}
