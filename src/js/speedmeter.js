/**
 * Created by mimosa.poon on 4/7/15.
 */

var SpeedMeter = function() {
    this.isStartUpdate = false;
    this.domElement = $('#speedMeter');
    this.clock = new FlipClock($('.clock'), 000, {
        clockFace: 'Counter',
        minimumDigits: 3
    });
};

SpeedMeter.prototype.show = function() {
    this.domElement.css('opacity', 1);
};

SpeedMeter.prototype.updateValue = function() {
    this.clock.setValue(123);
};
