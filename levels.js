// Json for the levels. 
// Parameters used by the stageGenerate/* functions to create the level with custom music and tiled maps.
// When adding a level, please add it here.
var x = [
    //{
    //    sceneName: "testLevel",
    //    music: "Sound/lab_gameplay_music.mp3",
    //    json : "Tilemaps/Lvl6.json",
    //    textScenes : {
    //        executive: [
    //            {
    //                speaker: "greg",
    //                spealerSprite: "player",
    //                text: "Finally, you took long enough",
    //            },
    //            {
    //                speaker: "greg",
    //                spealerSprite: "player",
    //                text: "Any longer and I would have to have asked for help",
    //            }
    //        ]
    //    }
    //},
    {
        sceneName: "level0",
        music: "Sound/lab_gameplay_music.mp3",
        json : "Tilemaps/Tutorial.json"
    },
    {
        sceneName: "level3",
        music: "Sound/lab_gameplay_music.mp3",
        json : "Tilemaps/Lvl3.json"
    },
    {
        sceneName: "level4",
        music: "Sound/lab_gameplay_music.mp3",
        json : "Tilemaps/Lvl4.json"
    },
    {
        sceneName: "level6",
        music: "Sound/lab_gameplay_music.mp3",
        json : "Tilemaps/Lvl6.json"
    },
    {
        sceneName: "level7",
        music: "Sound/CS_329E_Music_2.mp3",
        json : "Tilemaps/Lvl7.json",
        textScenes : {
            executive: [
                {text: "Hey. Long mouth. Don't you dare stick me in that water or I'll get my suit wet"},
                {text: "Also my alien body will disintigrate in the water"}
            ]
        }
    }, 
    {
        sceneName: "level5",
        music: "Sound/lab_gameplay_music.mp3",
        json : "Tilemaps/Lvl5.json"
    },
    {
        sceneName: "level8",
        music: "Sound/CS_329E_Music_2.mp3",
        json : "Tilemaps/Lvl8.json"
    },    
    {
        sceneName: "level12",
        music: "Sound/CS_329E_Music_2.mp3",
        json : "Tilemaps/Lvl12.json"
    }, 
    {
        sceneName: "level11",
        music: "Sound/CS_329E_Music_2.mp3",
        json : "Tilemaps/Lvl11.json"
    },  
    {
        sceneName: "level10",
        music: "Sound/CS_329E_Music_2.mp3",
        json : "Tilemaps/Lvl10.json"
    },
    {
        sceneName: "level9",
        music: "Sound/CS_329E_Music_2.mp3",
        json : "Tilemaps/Lvl9.json"
    },

    
];

export default x;
