var GameUIElements = function() {
    this.isStartUpdate = false;
    this.rpmMeter = new RPMMeter();
    this.speedMeter = new SpeedMeter();
    this.topBarIcon = new TopBarIcon();
};

GameUIElements.prototype.startUpdate = function() {
    this.isStartUpdate = true;
};

GameUIElements.prototype.reset = function () {
    this.rpmMeter.reset();

};

//RPMMeters
var RPMMeter = function() {
    this.rpmMask1 = $('#verticalMask');
    this.rpmMask2 = $('#verticalMask2');
    this.svg1 = $('#mySVG');
    this.svg2 = $('#mySVG2');
    this.rpm_value1 = $('#player1_RPM_value');
    this.rpm_value2 = $('#player2_RPM_value');
    this.domElement = document.getElementById('rpms');
    this.rpmVerticalMeter = new RPMVerticalMeter();
    this.rpmVerticalMeter2 = new RPMVerticalMeter();
    this.teamRPMMeter = new TeamRPMMeter();
};

RPMMeter.prototype.show = function() {
    this.domElement.className = "show";
};

RPMMeter.prototype.hide = function() {
    this.domElement.attr('class','hide');
};

RPMMeter.prototype.updateMeterValue = function(shakeValue, shakeValue2) {
    this.rpmVerticalMeter.updateValue(shakeValue,this.rpmMask1,this.svg1,this.rpm_value1 );
    this.rpmVerticalMeter2.updateValue(shakeValue2,this.rpmMask2,this.svg2,this.rpm_value2);
};

RPMMeter.prototype.updateTeamMeterValue = function() {
    this.teamRPMMeter.updateValue();
};


RPMMeter.prototype.reset = function() {
    this.hide();
    this.isStartUpdate = false;
    this.rpmMask1.css('-webkit-transform', 'translateY(' + (RPMVerticalMeter.totalRPM) + 'px)');
    this.rpmMask2.css('-webkit-transform', 'translateY(' + (RPMVerticalMeter.totalRPM) + 'px)');
    this.svg1.css('-webkit-transform', 'translateY(' + (-RPMVerticalMeter.totalRPM) + 'px)');
    this.svg2.css('-webkit-transform', 'translateY(' + (-RPMVerticalMeter.totalRPM) + 'px)');
    this.teamRPMMeter.reset();
};


/*RPMVerticalMeter*/
var RPMVerticalMeter = function() {
};

RPMVerticalMeter.totalHeight = 360;
RPMVerticalMeter.totalBlocks = 20;
RPMVerticalMeter.blockHeight = 10;
RPMVerticalMeter.heightPerRPM = 360 / 450;

RPMVerticalMeter.prototype.updateValue = function(value, targetMask, targetSVG, playerRPMValue) {
    if( value >= model.maxRPM) {
        value = model.maxRPM;
    }
    var targetValue = this.convertRPMToUnit(value);
    //var maskPosY = parseInt(this.matrixToArray(targetMask.css('-webkit-transform'))[5]) - targetValue;
    //var svgPosY = parseInt(this.matrixToArray( targetSVG .css('-webkit-transform'))[5]) + targetValue;
    var maskPosY = RPMVerticalMeter.totalHeight - targetValue;
    var svgPosY = -(RPMVerticalMeter.totalHeight) + targetValue;

    targetMask.css('-webkit-transform', 'translateY(' + maskPosY + 'px)');
    targetSVG.css('-webkit-transform', 'translateY(' + svgPosY + 'px)');

    playerRPMValue.html(value);

    /*if (maskPosY > targetValue) {
        var currentPosY = maskPosY - 1;
        targetMask.css('-webkit-transform', 'translateY(' + currentPosY + 'px)');
        targetSVG.css('-webkit-transform', 'translateY(' + -currentPosY + 'px)');
    }

    if (svgPosY < targetValue) {
        //var currentSVGPosY = svgPosY + 1;
    }*/
};

RPMVerticalMeter.prototype.convertRPMToUnit = function(value) {
    //console.log("value="+value);
    var offset = RPMVerticalMeter.totalBlocks * RPMVerticalMeter.blockHeight;
    var blocksPerRPM = RPMVerticalMeter.totalHeight / model.maxRPM;
    var blockHeight = blocksPerRPM * value;
    return blockHeight;
};

RPMVerticalMeter.prototype.matrixToArray = function(str) {
    return str.match(/(-?[0-9\.]+)/g);
};

/*TeamRPMMeter*/
var TeamRPMMeter = function() {
    this.isStartUpdate = false;
    this.rpmeter = $('#teamRPM');
    this.indicator = $('#teamRPM').find('.indicator');
};

TeamRPMMeter.barLength = 1140;
TeamRPMMeter.totalRevolutionNeeded = (model.maxRPM / 60 * model.gameTimer) * 2;
//TeamRPMMeter.totalRevolutionNeeded = 640; //two people

TeamRPMMeter.prototype.show = function() {
    this.rpmeter.css('opacity', 1);
};

TeamRPMMeter.prototype.hide = function() {
    this.rpmeter.css('opacity', 0);
};

TeamRPMMeter.prototype.startUpdate = function() {
    this.isStartUpdate = true;
    TimeManager.start();
};

TeamRPMMeter.prototype.stopUpdate = function() {
    this.isStartUpdate = false;
    TimeManager.stop();
};

TeamRPMMeter.prototype.updateValue = function() {
    this.targetValue = this.convertRPMToEnergy();
    this.indicator.css('width', this.targetValue);
};

TeamRPMMeter.prototype.convertRPMToEnergy = function() {
    var lengthPerRevolution = TeamRPMMeter.barLength / TeamRPMMeter.totalRevolutionNeeded;
    var targetBarLength = lengthPerRevolution * model.totalRevolutions;

    return targetBarLength;
};

TeamRPMMeter.prototype.reset = function() {
    this.hide();
    this.isStartUpdate = false;
    this.indicator.css('width', '0');
};


var TopBarIcon =  function(){
    this.icon = $('#boost1');
    this.iconText = $('#boost1').find('span');
};

TopBarIcon.prototype.moveToNext = function() {
    this.icon.css('webkit-transform','translateX(570px)');
    this.icon.css('transform','translateX(570px)');
    this.iconText.html('x2');

};

TopBarIcon.prototype.moveToBack = function() {
    this.icon.css('webkit-transform','translateX(0px)');
    this.icon.css('transform','translateX(0px)');
    this.iconText.html('x1');
};
