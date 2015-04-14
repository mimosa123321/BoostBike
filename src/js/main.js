var main, cameraManager, video, gamescene, uielements, tutorial, engine, transitionsManager;
var screen_width, screen_height;
var stats;

function initMain() {
    screen_width = window.innerWidth;
    screen_height = window.innerHeight;
    main = new Main();
}

var Main = function() {
    this.initStats();
    this.initVideo();
    this.initCamera();
    this.initGameScene();
};

Main.prototype.initStats = function() {
    stats = new Stats();
    stats.domElement.style.position	= 'absolute';
    stats.domElement.style.bottom	= '0px';
    document.body.appendChild( stats.domElement );
};

Main.prototype.initVideo = function() {
    video = new Video();
};

Main.prototype.stopVideo = function() {
    video.stopVideo();
};

Main.prototype.initCamera = function() {
    cameraManager= new CameraManager();
};

Main.prototype.showGetReady = function() {
    $('#getReadyContainer').addClass('show');
};

Main.prototype.hideGetReady = function() {
    $('#getReadyContainer').attr('class','hide');
};

Main.prototype.enterPhotoShoot = function() {
    main.stopVideo();
    main.changeSection($('#video-wrapper'), null);
    main.hideOverlay();
};

/*---------------------Game Scene-------------------------------------*/
Main.prototype.initGameScene = function() {
    gamescene = new GameScene();
};

Main.prototype.startGameScene = function() {
    gamescene.start();
    gamescene.show();
};

/*---------------------Tutorial---------------------------------------*/
Main.prototype.initTutorial = function() {
    tutorial = new Tutorial();
    tutorial.showInstructions(1);
};

/*-------------------TransitionManager--------------------------------*/
Main.prototype.initTransitionsManager = function() {
    transitionsManager = new TransitionsManager();
};

/*---------------------UI---------------------------------------------*/
Main.prototype.initUIElements = function() {
    uielements = new GameUIElements();
};

Main.prototype.enterGame = function() {
    model.isAllowAccel = true;
    main.startGameScene();
    main.initUIElements();
    main.initTransitionsManager();
    main.initEngine();
    setTimeout(function () {
        main.initTutorial();
    }, 3000);
};

/*---------------------Engine-------------------------------------*/
Main.prototype.initEngine = function() {
    engine = new Engine();
};


/*---------------------------------------------------------------*/


Main.prototype.updateLevel = function() {
    if (model.totalRevolutions >= model.revolutionPerLevel[model.currentLevel - 1]) {
        model.currentLevel += 1;
    }
};

Main.prototype.changeSection = function(currentSection, nextSection) {
    main.hideScene(currentSection);
};

Main.prototype.changeTunnel = function(targetChannelId) {

    gamescene.changeTunnel(targetChannelId);
    model.currentTunnel = targetChannelId;
};

Main.prototype.showScene = function(scene) {};

Main.prototype.hideScene = function(scene) {
    scene.css("opacity", 0);
    animate.transitionEnd(scene, function() {
        scene.css('display', 'none');
    });
};

Main.prototype.showOverlay = function() {
    var overlay = $('#mainOverlay');

};

Main.prototype.hideOverlay = function() {
    var overlay = $('#mainOverlay');
    overlay.css("opacity", 0);
    animate.transitionEnd(overlay, function() {
        overlay.css('display', 'none');
    });
};

Main.prototype.showWrapper = function() {
    $('#wrapper').addClass('show');
};

Main.prototype.hideWrapper = function() {
    $('#wrapper').attr('class','hide');
};

Main.prototype.restartGame = function() {
    video.reset();

};

// keyboard event
var keyEvent = function(event) {
    var key = event.keyCode || event.which;
    var keychar = String.fromCharCode(key);
    if (keychar.toUpperCase() === "V") {
        main.enterPhotoShoot();
        model.currentLevel = 1;
        main.hideWrapper();

        setTimeout(function(){
            main.enterGame();
        },500);
    }

    if (keychar.toUpperCase() === "R") {
        console.log("reset");
        video.reset();
    }

    if (key === 38) {
        if (uielements.rpmMeter.teamRPMMeter.isStartUpdate) {
            model.totalRevolutions += 5;
            model.isAccelerate = true;
            model.accelerateSpeed += 0.0002;
        }
    }
};

var keyUpEvent = function(event) {
    model.isAccelerate = false;
};

//animate Event
var animate = {
    transitionEnd: function(ele, callbackFunc) {
        $(ele).unbind('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd');
        $(ele).bind('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd', function() {
            $(ele).unbind('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd');
            if (callbackFunc) {
                callbackFunc.apply();
            }
        });
    },

    addAnimationListener: function(ele, event, callbackFunc) {
        prefixedEventListener(ele, event, callbackFunc);
    },

    removeAnimationListener: function(ele, event, callbackFunc) {
        prefixedRemoveEventListener(ele, event, callbackFunc);
    }
};

//fix for different version // detect animation events
var pfx = ["webkit", "moz", "MS", "o", ""];
var prefixedEventListener = function(element, type, callback) {
    for (var p = 0; p < pfx.length; p++) {
        if (!pfx[p]) type = type.toLowerCase();
        element.addEventListener(pfx[p] + type, callback, false);
    }
};

var prefixedRemoveEventListener = function(element, type, callback) {
    for (var p = 0; p < pfx.length; p++) {
        if (!pfx[p]) type = type.toLowerCase();
        element.removeEventListener(pfx[p] + type, callback);
    }
};

//window.addEventListener('DOMContentLoaded', model.onReady);
window.addEventListener('load', model.onPreload);


/*get*/
