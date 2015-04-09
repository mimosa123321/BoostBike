var GameUIElements = function() {
    this.rpmMeter = new RPMMeter();
    this.speedMeter = new SpeedMeter();
};

//RPMMeters
var RPMMeter = function() {
    this.rpmCurveMeter = new RPMCurveMeter();
    //this.rpmVerticalMeter = new RPMVerticalMeter();
    this.teamRPMMeter = new TeamRPMMeter();

    this.domElement = document.getElementById('rpms');
    this.isStartUpdate = false;
};

RPMMeter.prototype.show = function() {
    this.domElement.className = "show";
};

RPMMeter.prototype.startUpdate = function() {
    this.isStartUpdate = true;
};

RPMMeter.prototype.initMeterAnimation = function() {
    this.rpmCurveMeter.animateDraw();
};

RPMMeter.prototype.updateMeterValue = function(shakeValue, shakeValue2) {
    this.rpmCurveMeter.updateValue(shakeValue);
    //this.rpmVerticalMeter.updateValue(shakeValue2);
};

RPMMeter.prototype.updateTeamMeterValue = function() {
    this.teamRPMMeter.updateValue();
};


//CurveMeter
var RPMCurveMeter = function() {
    this.indicator = $('#curveRPMIndicator');
    this.indictorCurrentDegree = RPMCurveMeter.initialRPMDegree;
    this.indictorTargetDegree;
};

//CONTANT
RPMCurveMeter.initialEnergyDegree = 180; //180;
RPMCurveMeter.endEnergyDegree = 360; //353
RPMCurveMeter.currentEnergyDegree = 187; //187
RPMCurveMeter.centerPointX = 150;
RPMCurveMeter.centerPointY = 145;
RPMCurveMeter.radius = 110;

RPMCurveMeter.totalRPM = 300;
RPMCurveMeter.initialRPMDegree = -83;
RPMCurveMeter.endRPMDegree = 83;

RPMCurveMeter.prototype.draw = function() {
    var initialRadians = RPMCurveMeter.initialEnergyDegree * Math.PI / 180;
    var currentRadians = RPMCurveMeter.currentEnergyDegree * Math.PI / 180;
    if (ctx) {
        ctx.beginPath();
        ctx.arc(RPMCurveMeter.centerPointX, RPMCurveMeter.centerPointY, RPMCurveMeter.radius, initialRadians, currentRadians, false);
        ctx.lineTo(RPMCurveMeter.centerPointX, RPMCurveMeter.centerPointY);
        ctx.fillStyle = "#FF0000";
        var grd = ctx.createLinearGradient(0, 0, 170, 0);
        grd.addColorStop(0, "#43ff41");
        grd.addColorStop(0.5, "#ffff43");
        grd.addColorStop(1, "#fe4342");
        ctx.fillStyle = grd;
        ctx.fill();
    }
};

RPMCurveMeter.prototype.animateDraw = function() {
    if (RPMCurveMeter.currentEnergyDegree <= RPMCurveMeter.endEnergyDegree) {
        ctx.clearRect(0, 0, 300, 150);
        RPMCurveMeter.currentEnergyDegree += 3;
        this.draw();
    }
};

RPMCurveMeter.prototype.updateValue = function(value) {
    this.indictorTargetDegree = this.convertRPMToDegree(value);
    if (this.indictorCurrentDegree < this.indictorTargetDegree) {
        this.indictorCurrentDegree += 1;
    } else if (this.indictorCurrentDegree > this.indictorTargetDegree) {
        this.indictorCurrentDegree -= 1;
    }
    this.indicator.css('-webkit-transform', 'rotate(' + this.indictorCurrentDegree + 'deg)');
};

RPMCurveMeter.prototype.convertRPMToDegree = function(value) {
    var offsetDegree = RPMCurveMeter.initialRPMDegree;
    var totalRPMDegree = RPMCurveMeter.endRPMDegree - RPMCurveMeter.initialRPMDegree;
    var degreePerRPM = totalRPMDegree / RPMCurveMeter.totalRPM;
    var degree = ((value * degreePerRPM) + offsetDegree);
    return Math.floor(degree);
};


//VerticalMeter
var RPMVerticalMeter = function() {
    this.verticalMask = $('#verticalMask');
    this.mySVG = $('#mySVG');
    this.targetValue;
};

RPMVerticalMeter.totalRPM = 300;
RPMVerticalMeter.totalBlocks = 30;
RPMVerticalMeter.blockHeight = 10;

RPMVerticalMeter.prototype.updateValue = function(value) {
    this.targetValue = this.convertRPMToUnit(value);
    var maskPosY = parseInt(this.matrixToArray(this.verticalMask.css('-webkit-transform'))[5]);
    var svgPosY = parseInt(this.matrixToArray(this.mySVG.css('-webkit-transform'))[5]);
    if (maskPosY > this.targetValue) {
        var currentPosY = maskPosY - 1;
        this.verticalMask.css('-webkit-transform', 'translateY(' + currentPosY + 'px)');
    }

    if (svgPosY < -this.targetValue) {
        var currentSVGPosY = svgPosY + 1;
        this.mySVG.css('-webkit-transform', 'translateY(' + currentSVGPosY + 'px)');
    }
};

RPMVerticalMeter.prototype.convertRPMToUnit = function(value) {
    var offset = RPMVerticalMeter.totalBlocks * RPMVerticalMeter.blockHeight;
    var blocksPerRPM = RPMVerticalMeter.totalBlocks / RPMVerticalMeter.totalRPM;
    var noOfBlocks = blocksPerRPM * value;
    var targerValue = offset - (noOfBlocks * RPMVerticalMeter.blockHeight);
    return targerValue;
};

RPMVerticalMeter.prototype.matrixToArray = function(str) {
    return str.match(/(-?[0-9\.]+)/g);
};


/**/
var TeamRPMMeter = function() {
    this.rpmeter = $('#teamRPM');
    this.indicator = $('#teamRPM').find('.indicator');
};


TeamRPMMeter.barLength = 780;
//TeamRPMMeter.totalRevolutionNeeded = 320;
TeamRPMMeter.totalRevolutionNeeded = 640; //two people


TeamRPMMeter.prototype.show = function() {
    this.rpmeter.css('opacity', 1);
};

TeamRPMMeter.prototype.startUpdate = function() {
    model.isStartTeamRPM = true;
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
