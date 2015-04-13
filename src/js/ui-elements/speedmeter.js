/**
 * Created by mimosa.poon on 4/7/15.
 */

var SpeedMeter = function() {
    this.isStartUpdate = false;
    this.domElement = $('#speedMeter');
    this.speedMeter_value = $('#speed_value');
};

SpeedMeter.initialSpeedValue = 20;
SpeedMeter.totalSpeed = 200;
SpeedMeter.initialSpeedDegree = -105;
SpeedMeter.endSpeedDegree = 105;
SpeedMeter.maxAccelerateSpeed = 30;

SpeedMeter.prototype.show = function() {
    this.domElement.css('opacity', 1);
    this.indicator = $('#speedRPMIndicator');

    this.indictorCurrentDegree = SpeedMeter.initialSpeedDegree;
    this.indictorTargetDegree;
    //console.log(speedRPMIndicator)
};

SpeedMeter.prototype.startUpdate = function() {
    this.isStartUpdate = true;
};

SpeedMeter.prototype.updateValue = function(value) {

    //console.log("sped="+value);
    this.speedMeter_value.html(value);

    this.indictorTargetDegree = this.convertRPMToDegree(value);

    if (this.indictorCurrentDegree < this.indictorTargetDegree) {
        this.indictorCurrentDegree += 1;
    } else if (this.indictorCurrentDegree > this.indictorTargetDegree) {
        this.indictorCurrentDegree -= 1;
    }
    $('#speedRPMIndicator').css('-webkit-transform', 'rotate(' + this.indictorCurrentDegree + 'deg)');
};

SpeedMeter.prototype.convertRPMToDegree = function(value) {
    var offsetDegree = SpeedMeter.initialSpeedDegree;
    var totalRPMDegree = SpeedMeter.endSpeedDegree - SpeedMeter.initialSpeedDegree;
    var degreePerRPM = totalRPMDegree / SpeedMeter.totalSpeed;
    var degree = ((value * degreePerRPM) + offsetDegree);
    return Math.floor(degree);
};

SpeedMeter.prototype.checkAcceleration = function() {
    var diff;
    var tunnel;
    if(model.currentTunnel === 1) {
        tunnel = Tunnel1;
    }

    if(model.currentTunnel === 2) {
        tunnel = Tunnel2;
    }

    diff = tunnel.MAX_SPEED - tunnel.MIN_SPEED;
    var accerPerSpeed = diff / 50;

    if(model.isAllowAccel) {
        if(model.speed > 0) {
            model.accelerateSpeed = (accerPerSpeed * model.speed) + tunnel.MIN_SPEED;
        }
    }

    if(model.accelerateSpeed == 0) {
        model.accelerateSpeed = tunnel.MIN_SPEED;
    }

    if(model.accelerateSpeed >= tunnel.MAX_SPEED) {
        //model.accelerateSpeed = Tunnel1.MAX_SPEED;
    }
};
