var x = {
    preload: function(){
        scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
        
    },
    create: function(){
        var textBox = scene.rexUI.add.textBox({
            x: 0,
            y: 0,
            anchor: undefined,
            width: undefined,
            height: undefined,
            orientation: 0,
        });
        this.textBox = textBox;
    },
    update: function(){
        
    }
}
           
export default x;
