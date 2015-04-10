/**
 * Created by mimosa.poon on 4/7/15.
 */

var SpeedMeter = function() {
    this.isStartUpdate = false;
    this.domElement = $('#speedMeter');
    /*this.clock = new FlipClock($('.clock'), 000, {
        clockFace: 'Counter',
        minimumDigits: 3
    });*/
};

SpeedMeter.initialSpeedValue = 20;
SpeedMeter.totalSpeed = 200;
SpeedMeter.initialSpeedDegree = -98;
SpeedMeter.endSpeedDegree = 100;

SpeedMeter.prototype.show = function() {
    this.domElement.css('opacity', 1);
    this.indicator = $('#speedRPMIndicator');

    this.indictorCurrentDegree = SpeedMeter.initialSpeedDegree;
    this.indictorTargetDegree;

    //console.log(speedRPMIndicator)
};

SpeedMeter.prototype.updateValue = function(value) {

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
