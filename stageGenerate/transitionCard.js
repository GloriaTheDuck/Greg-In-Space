import * as gameParams from "../globalVar.js";

export function makeTransitionCard(nextScene){
    console.log(nextScene)
    return {
        preload : function(){
            this.load.image("continue","asdf");
            this.load.image("exitMenu","asdf");
            this.load.image("tCard","Assets/transitioncard.png")
;        },
        create : function(nextScene){
            return function(){
                this.add.image(400,300,"tCard");
                
                var menu = this.physics.add.sprite(270,408,"continue");
                makeButton(menu, "menu");
                menu.scaleX = 9.2
                menu.scaleY = 2.3
                
                var nextLevel = this.physics.add.sprite(560,408,"exitMenu");
                
                makeButton(nextLevel, nextScene);
                nextLevel.scaleX = 7
                nextLevel.scaleY = 2.3
            }
        }(nextScene),
        update : function(){}
    }
}

function makeButton(button,nextName){
    button.setInteractive();
    button.setAlpha(0.001)
    button.on('pointerup', function(nextSceneName){
        return function(){
            this.scene.scene.manager.getScenes(false).forEach(function(e){
                e.scene.stop();
            });
            if(gameParams.music != null){
                gameParams.music.stop();
                gameParams.setMusic(null);
            }
            console.log(nextSceneName)
            this.scene.scene.start(nextSceneName);
            this.scene.scene.remove("transitionCard");
        }
    }(nextName)
    );
}