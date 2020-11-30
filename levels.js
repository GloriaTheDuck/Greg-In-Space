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
        json : "Tilemaps/Tutorial.json",
        textScenes : {
            start: ["You there!  (Press Space to Continue)", 
                    "I need you to get me outta this place NOW.",
                    "Well, what are you waiting for? The rocks aren't going to move themselves"],
            executive: [
                "Took you long enough to get here!",
                "What is this. Your first level?"
            ]
        }
    },
    {
        sceneName: "level3",
        music: "Sound/lab_gameplay_music.mp3",
        json : "Tilemaps/Lvl3.json",
        textScenes : {
            executive : [
                "Hmph. A worker.",
                "Normally I wouldn't be caught dead talking to you.",
                "Also, I don't want to die. Please save me."
                ]
        }
    },
    {
        sceneName: "level4",
        music: "Sound/lab_gameplay_music.mp3",
        json : "Tilemaps/Lvl4.json",
        textScenes : {
            text: "Pick it up slowpoke. I've got a meeting at 5"
        }
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
            start : ["Hey, long mouth. Keep me out of that water or I'll get my suit wet.",  "Also, I'll probably drown."],
            executive: [
                "Ugh, you're wet." ,  "If you want to make it up in this company, be dry next time you save my life."
            ],
            water : ["Don't even think about it Greenie"]
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
