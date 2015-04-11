
var CameraManager = function() {
    this.camera = $('#cameraFeedContainer');
    this.countDown = $('#countDownValue');
    this.takenPhoto = $('#takenPhoto');
    this.photoFlashContainer = $('#photoFlash');
    this.frameDot = $('#frameDot');
    this.countDownInterval;
    this.startCountDownValue = 5;
    this.finishPhotoFlash = this.finishPhotoFlashListener.bind(this);
};


CameraManager.prototype.startCountDown= function() {
    this.countDown.addClass("show");
    this.countDownInterval = setInterval(this.countDownInterval.bind(this),1000);
};

CameraManager.prototype.hideCountDown= function() {
    this.countDown.attr('class','hide');
    this.frameDot.css('display','none');
};

CameraManager.prototype.countDownInterval = function() {
    this.startCountDownValue -=1;
    var strCount = String(this.startCountDownValue);
    this.countDown.find('p').html(strCount);
    if(this.startCountDownValue <=0 ) {
        clearInterval(this.countDownInterval);
        this.countDownInterval = null;
        this.photoFlash();
        this.finishPhotoFlashListener();
        this.hideCountDown();
        this.putTakenPhotoToFrame();
    }
    console.log("count time =" +  this.startCountDownValue);
};

CameraManager.prototype.photoFlash= function() {
    this.photoFlashContainer.addClass("show");
};

CameraManager.prototype.finishPhotoFlashListener = function() {
    console.log("finishPhotoFlashListener!!!!!!");
    setTimeout(function() {
        GameScreenCore.getInstance().getReadyCallback();
    },4000);
};

CameraManager.prototype.putTakenPhotoToFrame = function() {
    this.takenPhoto.find('img').attr('src',model.players_souvenir_1);
};


CameraManager.prototype.show = function() {
    this.camera.addClass("show");
};

CameraManager.prototype.hide = function() {
    this.camera.attr('class','hide');
};