var model = {
    maxRPM: 450,
    players_souvenir_1: null,
    players_souvenir_2: null,
    player1_RPM: 0,
    player2_RPM: 0,
    player1_name: null,
    player2_name: null,
    speed :0,
    accelerateSpeed:0,
    isAllowAccel:false,
    players_maxSpeed: 100,
    totalRevolutions: 0,
    revolutionPercentagePerLevel:[0.1,0.25,0.5,0.15],
    revolutionPerLevel: [],
    currentLevel: 1,
    isSpinEngine: false,
    isAccelerate: false,
    isShowTransition1: false,
    isShowTransition2: false,
    isShowTransition3: false,
    isShowEnding: false,
    isEndGame:false,
    currentTunnel:1,
    gameTimer: 45,
    takePhotoMoment: 45 - 10,
    ranking:null,

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
        model.calcRevPerLevel();
        initMain();
        console.log("Start Connection");
        /*try {
            GameScreenCore.getInstance().init('#camera-feed'); //Init the GameScreen (required as it init the connect)

        } catch (e){
            console.log("jquery_ready_GameScreenCore_init", e, {result: 'failed'});
        }*/
    },

    calcRevPerLevel:function() {
        for(var i=0; i<model.revolutionPercentagePerLevel.length; i++) {
            var totalTeamRevNeeded = ((model.maxRPM / 60) * model.gameTimer) * 2;
            var revolutionsNeeded;
            if(i == 0) {
                revolutionsNeeded = (totalTeamRevNeeded * model.revolutionPercentagePerLevel[i]);
            }else {
                revolutionsNeeded =  (totalTeamRevNeeded * model.revolutionPercentagePerLevel[i]) + model.revolutionPerLevel[i-1];
            }

            model.revolutionPerLevel.push(revolutionsNeeded);
            console.log(model.revolutionPerLevel);
        }
        console.log("totalTeamRevNeeded="+totalTeamRevNeeded);
        console.log("revolutionPerLevel="+model.revolutionPerLevel);
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
 * Callback that is triggered when the game tutorial is done
 */
GameScreenCore.getInstance().gameTutorialEndedCallback = function() {
    /* */
    /*// INJECT CODE HERE //*/
    /* */
    /*$("#game-state #state .value").html("Game");

     $("#game-state #team-number").show();
     $("#game-state #level").show();
     $("#game-state #max-speed").show();
     $("#game-state #current-speed").show();
     $("#player-1").show();
     $("#player-2").show();

     $("#actions-wrapper").html("<button id='update-level'>Update level</button><button id='take-picture'>Take picture</button><button id='end-game'>End Game</button>");

     $("#update-level").click(function() {
     window.current_level++;
     $("#game-state #level .value").html(window.current_level);
     GameScreenCore.getInstance().gameInformationLevel(window.current_level);
     });

     $("#take-picture").click(function() {
     window.players_souvenir_2 = GameScreenCore.getInstance().takePicture();
     $("#game-state #picture-2 .value").html("Taken");
     });

     $("#end-game").click(function() {
     if (window.players_souvenir_2  != "") {
     GameScreenCore.getInstance().gameInformationGameEnded(
     window.current_level, window.players_maxSpeed, window.players_souvenir_2
     );
     } else {
     console.debug('take a picture first');
     }
     });*/

};

GameScreenCore.getInstance().updateUserInformationCallback =
    function(
        player1_name,
        player2_name,
        players_teamNumber
    ) {
        $("#player-1 .name .value").html(player1_name);
        $("#player-2 .name .value").html(player2_name);
        $("#game-state #team-number").html(players_teamNumber);

        model.player1_name = player1_name;
        model.player2_name = player2_name;

    };

GameScreenCore.getInstance().updateGameInformationCallback =
    function(
        player1_name, player1_rpm, player1_kmh,
        player2_name, player2_rpm, player2_kmh,
        players_teamNumber
    ) {
        /* */
        /*// INJECT CODE HERE //*/
        /* */

        model.player1_RPM = (player1_rpm);
        model.player2_RPM = (player2_rpm);

        if ((player1_kmh + player2_kmh) > window.players_maxSpeed) {
            window.players_maxSpeed = (player1_kmh + player2_kmh);
            model.speed = window.players_maxSpeed;
            //$("#game-state #max-speed .value").html(window.players_maxSpeed);
        }
        model.speed = player1_kmh + player2_kmh;
        //$("#game-state #current-speed .value").html(player1_kmh + player2_kmh);
    };
/**
 * Callback that is triggered when the game is ended
 */
GameScreenCore.getInstance().gameEndedCallback = function(position) {
    //console.log("end screen position="+position);
    model.ranking = position;

    transitionsManager.endGamePanel.getData();
    model.isShowEnding = true;
    gamescene.isGameStart = false;
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

    console.log("initialization / re-initialization");
    main.restartGame();
};

