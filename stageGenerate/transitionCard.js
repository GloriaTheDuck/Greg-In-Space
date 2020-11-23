import * as gameParams from "../globalVar.js";

export function makeTransitionCard(nextScene){
    console.log(nextScene)
    return {
        preload : function(){
            this.load.image("continue","Assets/addwork.png");
            this.load.image("exitMenu","Assets/addwork.png");
        },
        create : function(nextScene){
            return function(){
                var nextLevel = this.physics.add.sprite(200,200,"continue");
                makeButton(nextLevel, nextScene);
                
                var menu = this.physics.add.sprite(400,200,this.physics.add.sprite("exitMenu",400,200))
                makeButton(menu, "menu");
            }
        }(nextScene),
        update : function(){}
    }
}

function makeButton(button,nextName){
    button.setInteractive();
    button.on('pointerup', function(nextSceneName){
        return function(nextSceneName){
            this.scene.scene.manager.getScenes(false).forEach(function(e){
                e.scene.stop();
            });
            gameParams.music.stop();
            console.log(nextSceneName)
            this.scene.scene.start(nextSceneName);
            this.scene.scene.remove("transitionCard");
        }
    }(nextName)
    );
}