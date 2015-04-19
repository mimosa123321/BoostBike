var Tutorial = function() {
    this.startShowRPMSText = this.onStartShowRPMS.bind(this);
    this.showTutorialTimeout;
    this.addRevolutionValue = model.revolutionPerLevel[0] / 3;

    this.rpmArrow = $('#rpmArrow');
    this.teamArrow = $('#teamArrow');
    this.speedArrow = $('#speedArrow');

    this.tutorialTitle = $('#tutorialTitle');
};

Tutorial.prototype.showInstructions = function(pageId) {
    this.instructions = $('#instruction' + pageId);
    this.instructions.addClass('show');
    var transitionTime;

    if (pageId === 1) {
        //show Tutorial title
        this.showTutorialTitle();
        //add Animation End Listener //text sentence 3
        this.showRMPText = document.getElementById('showRPMText');
        animate.addAnimationListener(this.showRMPText, "AnimationStart", this.startShowRPMSText);
        transitionTime = 5000;
        //this.showTutorialTimeout = setTimeout(this.hideInstructions.bind(this, pageId), 5000);
    } else if (pageId === 2) {
        this.onStartShowTeamRPM();
        this.showTutorialTimeout = setTimeout(this.addRevolution.bind(this, this.addRevolutionValue), 1500);
        transitionTime = 7000;
    } else if (pageId === 3) {
        this.onStartShowSpeedMeter();
        this.showTutorialTimeout = setTimeout(this.addRevolution.bind(this, this.addRevolutionValue), 800);
        transitionTime = 8000;
    } else if (pageId === 4) {
        uielements.rpmMeter.teamRPMMeter.startUpdate();
        transitionTime = 3000;
    }

    this.showTutorialTimeout = setTimeout(this.hideInstructions.bind(this, pageId), transitionTime);
};

Tutorial.prototype.hideInstructions = function(pageId) {
    this.instructions = $('#instruction' + pageId);
    this.instructions.attr('class', 'instructions hide');

    if (pageId === 1) {
        this.rpmArrow.attr("class", "hide");
    }

    if (pageId === 2) {
        this.teamArrow.attr("class", "hide");
    }

    if (pageId < 3) {
        var nextPageId = parseInt(pageId) + 1;
        this.showTutorialTimeout = setTimeout(this.showInstructions.bind(this, nextPageId), 1000);
    } else if (pageId === 3) {
        this.addRevolution(this.addRevolutionValue);
        this.speedArrow.attr("class", "hide");
        this.hideTutorialTitle();

    } else if (pageId === 4) {
        /*this.showTutorialTimeout = setTimeout(function() {
            uielements.rpmMeter.teamRPMMeter.startUpdate();
        }, 1000);*/
    }
};

Tutorial.prototype.showTutorialTitle = function() {
    console.log("show");
    console.log(this.tutorialTitle);
    this.tutorialTitle.addClass("show");
};

Tutorial.prototype.hideTutorialTitle = function() {
    this.tutorialTitle.attr('class', "hide");
};

Tutorial.prototype.onStartShowRPMS = function() {
    console.log("Start Show RPMS");

    uielements.rpmMeter.show();
    this.rpmArrow.addClass("show");

    this.showTutorialTimeout = setTimeout(function() {
        uielements.startUpdate();
    }, 400);
    animate.removeAnimationListener(this.showRMPText, "AnimationStart", this.startShowRPMSText);
};

Tutorial.prototype.onStartShowTeamRPM = function() {
    console.log("Start Show Team RPMS");
    uielements.rpmMeter.teamRPMMeter.show();
    this.teamArrow.addClass("show");
};

Tutorial.prototype.onStartShowSpeedMeter = function() {
    console.log("Start Show Speed Meter");
    uielements.speedMeter.show();
    this.speedArrow.addClass("show");

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
    $('.instructions').each(function() {
        $(this).removeClass('hide');
        $(this).removeClass('show');
    });
    $('#congratsOverlay').removeClass('show');

    if (this.showTutorialTimeout) {
        clearTimeout(this.showTutorialTimeout);
    }

};
