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

SpeedMeter.prototype.stopUpdate = function() {
    this.isStartUpdate = false;
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
    var targetAccelSpeed;
    var changeValue;
    if (model.currentTunnel === 1) {
        tunnel = Tunnel1;
        changeValue = 0.0005;
    }

    if (model.currentTunnel === 2) {
        tunnel = Tunnel2;
        changeValue = 0.001;
    }

    diff = tunnel.MAX_SPEED - tunnel.MIN_SPEED;
    var accerPerSpeed = diff / (SpeedMeter.totalSpeed);
    var afterAccelSpeed;
    if (model.isAllowAccel) {
        if (model.speed >= 0) {
            targetAccelSpeed = (accerPerSpeed * model.speed) + tunnel.MIN_SPEED;
            if (model.accelerateSpeed < targetAccelSpeed) {
                afterAccelSpeed = model.accelerateSpeed + changeValue;

                if (afterAccelSpeed >= targetAccelSpeed) {
                    model.accelerateSpeed = targetAccelSpeed;
                    return;
                } else {
                    model.accelerateSpeed += changeValue;
                }

            } else if (model.accelerateSpeed > targetAccelSpeed) {
                afterAccelSpeed = model.accelerateSpeed - changeValue;

                if (afterAccelSpeed <= targetAccelSpeed) {
                    model.accelerateSpeed = targetAccelSpeed;
                    return;
                } else {
                    model.accelerateSpeed -= changeValue;
                }
            }
        }
    }

    //set Limitation.
    if (model.accelerateSpeed <= tunnel.MIN_SPEED) {
        model.accelerateSpeed = tunnel.MIN_SPEED;
    }

    if (model.accelerateSpeed >= tunnel.MAX_SPEED) {
        model.accelerateSpeed = tunnel.MAX_SPEED;
    }

};



SpeedMeter.prototype.getMaxSpeed = function() {
    if (model.playersMaxSpeed < model.speed) {
        model.playersMaxSpeed = model.speed;
    }
};
