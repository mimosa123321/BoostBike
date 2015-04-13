var Tutorial = function() {
    this.startShowRPMSText = this.onStartShowRPMS.bind(this);
    this.showTutorialTimeout;
};

Tutorial.prototype.showInstructions = function(pageId) {
    console.log("show page=" + pageId);
    this.instructions = $('#instruction' + pageId);
    this.instructions.addClass('show');

    if (pageId === 1) {
        //add Animation End Listener //text sentence 3
        this.showRMPText = document.getElementById('showRPMText');
        animate.addAnimationListener(this.showRMPText, "AnimationStart", this.startShowRPMSText);
        //this.showTutorialTimeout = setTimeout(this.hideInstructions.bind(this, pageId), 5000);
    } else if (pageId === 2) {
        this.onStartShowTeamRPM();
        this.showTutorialTimeout = setTimeout(this.addRevolution.bind(this, 22), 1500);
    } else if (pageId === 3) {
        this.onStartShowSpeedMeter();
        this.showTutorialTimeout = setTimeout(this.addRevolution.bind(this, 23), 800);
    } else if (pageId === 4) {}

    this.showTutorialTimeout = setTimeout(this.hideInstructions.bind(this, pageId), 4000);
};

Tutorial.prototype.hideInstructions = function(pageId) {
    this.instructions = $('#instruction' + pageId);
    this.instructions.attr('class', 'instructions hide');

    if (pageId < 3) {
        var nextPageId = parseInt(pageId) + 1;
        this.showTutorialTimeout = setTimeout(this.showInstructions.bind(this, nextPageId), 1000);
    } else if (pageId === 3) {
        this.addRevolution(23);
    } else if (pageId === 4) {
        this.showTutorialTimeout = setTimeout(function() {
            uielements.rpmMeter.teamRPMMeter.startUpdate();
        }, 1000);
    }
};

Tutorial.prototype.onStartShowRPMS = function() {
    console.log("Start Show RPMS");
    uielements.rpmMeter.show();
    this.showTutorialTimeout = setTimeout(function() {
        uielements.startUpdate();
    }, 400);
    animate.removeAnimationListener(this.showRMPText, "AnimationStart", this.startShowRPMSText);
};

Tutorial.prototype.onStartShowTeamRPM = function() {
    console.log("Start Show Team RPMS");
    uielements.rpmMeter.teamRPMMeter.show();
};

Tutorial.prototype.onStartShowSpeedMeter = function() {
    console.log("Start Show Speed Meter");
    uielements.speedMeter.show();
    this.showTutorialTimeout = setTimeout(function() {
        uielements.speedMeter.startUpdate();
    }, 1000);
};

/*Tutorial.prototype.onsStartShowCongrats = function() {
    console.log("show Congrats");
    this.congrats = $('#congratsOverlay');
    this.congrats.addClass('show');

    this.showTutorialTimeout = setTimeout(this.onHideCongrats.bind(this), 2500);
};

Tutorial.prototype.onHideCongrats = function() {
    this.congrats = $('#congratsOverlay');
    this.congrats.removeClass('show');

    animate.transitionEnd(this.congrats, this.showInstructions.bind(this, 4));
};*/

Tutorial.prototype.addRevolution = function(value) {
    model.totalRevolutions += value;
};

Tutorial.prototype.dispose = function() {
    $('.instructions').each(function(){
        $(this).removeClass('hide');
        $(this).removeClass('show');
    });
    $('#congratsOverlay').removeClass('show');

    if(this.showTutorialTimeout){
        clearTimeout(this.showTutorialTimeout);
    }

};


/*---------*/

var Engine = function() {
    this.photoContainer = $('#photos');
    this.frameHeight = 722;
    this.engineTimer = 0;

    //
    this.engine = $('#engine');
    this.engine3D = $('#photos');
    this.engineDomElement = document.getElementById('engine');
    this.engine3DDomElement = document.getElementById('photos');
    this.bgTopDomElement = document.getElementById('engineBg');
    this.finishShowEngine = this.onFinishShowEngine.bind(this);
    this.finishHide3DEngine = this.onFinishHide3DEngine.bind(this);
    this.finishHideGreenBg = this.onFinishHideGreenBg.bind(this);
};

Engine.prototype.loop = function() {
    var posY = parseInt(this.photoContainer.css("background-position-y"));
    var newPosY = posY - this.frameHeight;

    var dest = this.frameHeight * 140;

    if (newPosY < -dest) {
        newPosY = 0;
    }
    this.photoContainer.css("background-position-y", newPosY + 'px');
};

Engine.prototype.show = function() {
    console.log("show Engine");
    this.engine.addClass("show");
    animate.addAnimationListener(this.engineDomElement, "AnimationEnd", this.finishShowEngine);

    //3d (png sequence) engine appears
    setTimeout(this.show3DEngine.bind(this), 1000);
};

Engine.prototype.onFinishShowEngine = function() {


    animate.removeAnimationListener(this.engineDomElement, "AnimationEnd", this.finishShowEngine);
};

Engine.prototype.show3DEngine = function() {
    this.engine3D.addClass('show');
    setTimeout(function() {
        model.isSpinEngine = true;
    }, 1200);
    setTimeout(this.hide3DEngine.bind(this), 8000);
};

Engine.prototype.hide3DEngine = function() {
    model.isSpinEngine = false;
    this.engine3D.attr('class', 'hide');
    animate.addAnimationListener(this.engine3DDomElement, "AnimationEnd", this.finishHide3DEngine);
};

Engine.prototype.onFinishHide3DEngine = function() {
    console.log("finish hide 3d Engine");
    this.engine3D.css('display', 'none');
    //hide engine section also
    this.hide();
    uielements.rpmMeter.teamRPMMeter.startUpdate();
    animate.removeAnimationListener(this.engine3DDomElement, "AnimationEnd", this.finishHide3DEngine);

};

Engine.prototype.hide = function() {
    this.engine.attr('class', 'hide');
//    animate.addAnimationListener(this.bgTopDomElement, "AnimationEnd", this.finishHideGreenBg);
};

Engine.prototype.onFinishHideGreenBg = function () {
//    console.log("finish hide green");
//    animate.removeAnimationListener(this.bgTopDomElement, "AnimationEnd", this.finishHideGreenBg);
//    uielements.rpmMeter.teamRPMMeter.startUpdate();
};

