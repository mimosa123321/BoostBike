var main, cameraManager, screen_width, screen_height, video, gamescene, uielements, tutorial, canvas, ctx, engine;

function initMain() {
    screen_width = window.innerWidth;
    screen_height = window.innerHeight;
    main = new Main();
}

var Main = function() {
    this.initVideo();
    this.initCamera();
    this.initGameScene();
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
    //stop Video
    main.stopVideo();
    main.changeSection($('#video-wrapper'), null);
    main.hideOverlay();
};

/*----------------------------------------------------------*/

Main.prototype.initGameScene = function() {
    gamescene = new GameScene();
};

Main.prototype.startGameScene = function() {
    model.isGameStart = true;
    gamescene.show();
};

Main.prototype.initEngine = function() {
    engine = new Engine();
};

Main.prototype.initTutorial = function() {
    tutorial = new Tutorial();
    tutorial.showInstructions(1);
};

Main.prototype.initUIElements = function() {
    uielements = new GameUIElements();
};


Main.prototype.enterGame = function() {
    main.startGameScene();
    main.initUIElements();
    setTimeout(function () {
        main.initTutorial();
    }, 3000);
}


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
        //main.startGameScene();
        //main.initUIElements();
        //setTimeout(function() {
        //    main.initTutorial();
        //}, 3000);
    }

    if (key === 38) {
        if (model.isStartTeamRPM) {
            model.totalRevolutions += 1;
            model.isAccelerate = true;
        }

    }
};

var keyUpEvent = function(event) {
    //model.totalRevolutions -= 1;
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
