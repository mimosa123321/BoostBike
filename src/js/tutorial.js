var Tutorial = function() {
    this.startShowRPMS = this.onStartShowRPMS.bind(this);
};

Tutorial.prototype.showInstructions = function(pageId) {
    console.log("show page=" + pageId);
    this.instructions = $('#tutorial').find('#instruction' + pageId);
    this.instructions.addClass('show');

    if (pageId === 1) {
        //add Animation End Listener //text sentence 3
        this.showRMPText = document.getElementById('showRPMText');
        animate.addAnimationListener(this.showRMPText, "AnimationStart", this.startShowRPMS);
    } else if (pageId === 2) {
        this.onStartShowTeamRPM();
        setTimeout(this.addRevolution.bind(this, 25), 1500);
    } else if (pageId === 3) {
        this.onStartShowSpeedMeter();
        setTimeout(this.addRevolution.bind(this, 25), 800);
    } else if (pageId === 4) {}

    setTimeout(this.hideInstructions.bind(this, pageId), 5000);
};

Tutorial.prototype.hideInstructions = function(pageId) {
    this.instructions = $('#tutorial').find('#instruction' + pageId);
    this.instructions.attr('class', 'instructions hide');

    if (pageId < 3) {
        var nextPageId = parseInt(pageId) + 1;
        setTimeout(this.showInstructions.bind(this, nextPageId), 1500);
    } else if (pageId === 3) {
        this.addRevolution(27);
    } else if (pageId === 4) {
        setTimeout(function() {
            uielements.rpmMeter.teamRPMMeter.startUpdate();
        }, 1000);
    }
};

Tutorial.prototype.onStartShowRPMS = function() {
    console.log("Start Show RPMS");
    uielements.rpmMeter.show();
    setTimeout(function() {
        uielements.rpmMeter.startUpdate();
    }, 400);
    animate.removeAnimationListener(this.showRMPText, "AnimationStart", this.startShowRPMS);
};

Tutorial.prototype.onStartShowTeamRPM = function() {
    console.log("Start Show Team RPMS");
    uielements.rpmMeter.teamRPMMeter.show();
};

Tutorial.prototype.onStartShowSpeedMeter = function() {
    console.log("Start Show Speed Meter");
    uielements.speedMeter.show();

    setTimeout(function() {
        uielements.speedMeter.isStartUpdate = true;
    }, 1000);
};

Tutorial.prototype.onsStartShowCongrats = function() {
    console.log("show Congrats");
    this.congrats = $('#congratsOverlay');
    this.congrats.addClass('show');

    setTimeout(this.onHideCongrats.bind(this), 2500);
};

Tutorial.prototype.onHideCongrats = function() {
    this.congrats = $('#congratsOverlay');
    this.congrats.removeClass('show');

    animate.transitionEnd(this.congrats, this.showInstructions.bind(this, 4));
};


Tutorial.prototype.addRevolution = function(value) {
    model.totalRevolutions += value;
};

var Engine = function() {
    this.photoContainer = $('#photos');
    this.frameHeight = 722;
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
