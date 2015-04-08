var Tutorial = function() {
    this.startShowRPMS = this.onStartShowRPMS.bind(this);
};

Tutorial.prototype.showInstructions = function(pageId) {
    console.log("show page="+pageId);
    if(pageId === 1) {
        this.instructions = $('#tutorial').find('#instruction1');
        this.instructions.addClass('show');

        //add Animation End Listener //text sentence 3
        this.showRMPText = document.getElementById('showRPMText');
        animate.addAnimationListener(this.showRMPText,"AnimationStart",this.startShowRPMS);

        setTimeout(this.hideInstructions.bind(this,1),8000);
    }

    if(pageId === 2) {
        this.instructions = $('#tutorial').find('#instruction2');
        this.instructions.addClass('show');
        this.onStartShowTeamRPM();

        setTimeout(this.hideInstructions.bind(this,2),8000);
    }

    if(pageId === 3) {
        this.instructions = $('#tutorial').find('#instruction3');
        this.instructions.addClass('show');
        this.onStartShowSpeedMeter();

        setTimeout(this.hideInstructions.bind(this,3),8000);
    }

    if(pageId === 4) {
        this.instructions = $('#tutorial').find('#instruction4');
        this.instructions.addClass('show');

        setTimeout(this.hideInstructions.bind(this,4),6000);
    }
};

Tutorial.prototype.hideInstructions = function(pageId) {
    if(pageId === 1) {
        this.instructions = $('#tutorial').find('#instruction1');
        this.instructions.attr('class','instructions hide');

        setTimeout(this.showInstructions.bind(this,2),1000);
    }

    if(pageId === 2) {
        this.instructions = $('#tutorial').find('#instruction2');
        this.instructions.attr('class','instructions hide');

        setTimeout(this.showInstructions.bind(this,3),1000);
    }

    if(pageId === 3) {
        this.instructions = $('#tutorial').find('#instruction3');
        this.instructions.attr('class','instructions hide');

        setTimeout(this.showInstructions.bind(this,4),1000);
    }

    if(pageId === 4) {
        this.instructions = $('#tutorial').find('#instruction4');
        this.instructions.attr('class','instructions hide');
    }
};

Tutorial.prototype.onStartShowRPMS = function() {
    console.log("Start Show RPMS");
    uielements.rpmMeter.show();
    setTimeout(function() {
        uielements.rpmMeter.startUpdate();
    },400);
    animate.removeAnimationListener(this.showRMPText,"AnimationStart",this.startShowRPMS);
};

Tutorial.prototype.onStartShowTeamRPM = function() {
    console.log("Start Show Team RPMS");
    uielements.rpmMeter.teamRPMMeter.show();
};

Tutorial.prototype.onStartShowSpeedMeter = function() {
    console.log("Start Show Speed Meter");
    uielements.speedMeter.show();

    setTimeout(function(){
        uielements.speedMeter.isStartUpdate = true;
    },1000);
};

Tutorial.prototype.onsStartShowCongrats = function() {
    console.log("show Congrats");
    this.congrats = $('#congratsOverlay');
    this.congrats.addClass('show');
};

var Engine = function() {
    this.photoContainer = $('#photos');
    this.frameHeight = 722;

};

Engine.prototype.loop = function() {
    var posY = parseInt(this.photoContainer.css("background-position-y"));
    var newPosY = posY - this.frameHeight;

    var dest = this.frameHeight * 140;

    if(newPosY < -dest) {
        newPosY = 0;
    }
    this.photoContainer.css("background-position-y",newPosY + 'px');
};




