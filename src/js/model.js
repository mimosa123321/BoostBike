var model = {
    players_souvenir_1: null,
    players_souvenir_2: null,
    player1_RPM: 80,
    player2_RPM: 280,
    totalRevolutions: 1,
    revolutionPerLevel: [78, 220, 520, 630],
    currentLevel: 1,
    isShowCongrats: false,
    isSpinEngine: false,
    isAccelerate: false,
    isShowTransition1: false,
    isShowTransition2: false,
    isShowTransition3: false,
    isShowEnding: false,
    isEndGame:false,
    currentTunnel:1,
    speed :60,

    onPreload: function() {
        console.log("DOM_ready - Preload Image");
        model.onLoadImages('#preload');
    },

    onLoadImages: function(target) {
        var imgLoad = imagesLoaded(document.querySelector(target), function(instance) {
            console.log(target + ': images are loaded');
            model.onReady();
        });

        imgLoad.on('progress', function(instance, image) {
            var result = image.isLoaded ? 'loaded' : 'broken';
            console.log('image is ' + result + ' for ' + image.img.src);
        });
    },

    onReady:function() {
        initMain();
        /*console.log("Start Connection");
        try {
            GameScreenCore.getInstance().init('#camera-feed'); //Init the GameScreen (required as it init the connect)

        } catch (e){
            console.log("jquery_ready_GameScreenCore_init", e, {result: 'failed'});
        }*/
    }
};


GameScreenCore.getInstance().connectedCallback = function() {
    if (GameScreenCore.getInstance().gameScreenState == GameScreenState.ScreenSaver) {
        GameScreenCore.getInstance().initGame();
        console.log("Connectioned  - init game");
    }
};

GameScreenCore.getInstance().cameraFeedCallback = function() {
    console.log("received Camera Feed - show Camera and Stop video");
    main.enterPhotoShoot();
    //
    cameraManager.show();
};

GameScreenCore.getInstance().pictureCaptureCallback = function(player_ID) {
    console.debug('in 2s the gamescreen simulate camera capture.');

    //show 5s count down here
    cameraManager.startCountDown();

    window.setTimeout(function() {
        window.players_souvenir_1 = GameScreenCore.getInstance().cameraFeedTakePicture(); //Take picture and send it
        model.players_souvenir_1 =  window.players_souvenir_1;
    }, 5000);
};

/**
 * Trigger / Callback that is triggered when the screen need to switch to the get ready
 * /!\ Note that you have to trigger it /!\
 */
GameScreenCore.getInstance().getReadyCallback = function() {
    console.log("switch to get ready screen");
    cameraManager.hide();
    main.showGetReady();
};

/**
 * Callback that is triggered when the game need to be displayed
 */
GameScreenCore.getInstance().gameStartCallback = function() {
    model.currentLevel = 1;
    main.hideWrapper();

    setTimeout(function(){
        main.enterGame();
    },500);
    //$("#game-state #state .value").html("Tutorial");
    //$("#actions-wrapper").html("<button id='end-tutorial'>End Tutorial</button>");
    /*$("#end-tutorial").click(function() {
        GameScreenCore.getInstance().gameInformationTutorialEnded();
    });*/
};

/**
 * Trigger that force the game to inut / re-init
 */
//GameScreenCore.getInstance().initGame();


/**
 * Attributes that give you the state of the game
 */
//GameScreenCore.getInstance().gameScreenState
/*
 This value can be:
 GameScreenState.ScreenSaver
 GameScreenState.CameraFeed
 GameScreenState.Tutorial
 GameScreenState.Game
 GameScreenState.Ending
 */

/**
 * Callback that is triggered when  the screen need to go to the screensaver and reset game
 */
GameScreenCore.getInstance().initializationCallback = function() {

    //window.current_level = 0;
    //window.players_maxSpeed = 0;
    //window.players_souvenir_1 = "";
    //window.players_souvenir_2 = "";
    //$("#game-state #state .value").html("ScreenSaver");
    //$("#game-state #picture-1 .value").html("Not Taken");
    //$("#game-state #picture-2 .value").html("Not Taken");
    //$("#game-state #team-number .value").html("??");
    //$("#game-state #level .value").html(window.current_level);
    //$("#game-state #max-speed .value").html("0");
    //$("#game-state #current-speed .value").html("0");

    //$("#game-state #team-number").hide();
    //$("#game-state #level").hide();
    //$("#game-state #max-speed").hide();
    //$("#game-state #current-speed").hide();
    //$("#player-1").hide();
    //$("#player-2").hide();

    /*if(GameScreenCore.getInstance().gameScreenState == GameScreenState.ScreenSaver) {
        main.stopVideo();
    }*/

    console.log("initialization");
};

