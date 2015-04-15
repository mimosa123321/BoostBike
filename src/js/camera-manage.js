var CameraManager = function() {
    this.camera = $('#cameraFeedContainer');
    this.countDown = $('#countDownValue');
    this.takenPhoto = $('#takenPhoto');
    this.photoFlashContainer = $('#photoFlash');
    //this.frameDot = $('#frameDot');
    this.countDownInterval;
    this.callGetReadyTimeout;
    this.startCountDownValue = 5;
};

CameraManager.prototype.startCountDown = function() {
    this.countDown.addClass("show");
    this.countDownInterval = setInterval(this.countDownInterval.bind(this), 1000);
};

CameraManager.prototype.hideCountDown = function() {
    this.countDown.attr('class', 'hide');
};

CameraManager.prototype.countDownInterval = function() {
    this.startCountDownValue -= 1;
    var strCount = String(this.startCountDownValue);
    if (this.startCountDownValue > 0) {
        this.countDown.find('p').html(strCount);
    } else {
        this.photoFlash();
        this.finishPhotoFlashListener();
        this.hideCountDown();
        this.putTakenPhotoToFrame();
        clearInterval(this.countDownInterval);
        this.countDownInterval = null;
    }
    console.log("count time =" + this.startCountDownValue);
};

CameraManager.prototype.photoFlash = function() {
    this.photoFlashContainer.addClass("show");
    cameraSound.play();
};

CameraManager.prototype.finishPhotoFlashListener = function() {
    this.callGetReadyTimeout = setTimeout(function() {
        GameScreenCore.getInstance().getReadyCallback();
    }, 4000);
};

CameraManager.prototype.putTakenPhotoToFrame = function() {
    this.takenPhoto.find('img').attr('src', model.players_souvenir_1);
};

CameraManager.prototype.show = function() {
    this.camera.addClass("show");
};

CameraManager.prototype.hide = function() {
    this.camera.attr('class', 'hide');
};

CameraManager.prototype.dispose = function() {
    if (this.countDownInterval) {
        clearInterval(this.countDownInterval);
        this.countDownInterval = null;
    }
    if (this.callGetReadyTimeout) {
        this.callGetReadyTimeout = null;
    }
    this.hideCountDown();
    this.takenPhoto.find('img').attr('src', '');
    this.hide();
};

CameraManager.prototype.reset = function() {
    this.dispose();
    this.startCountDownValue = 5;
    this.countDown.find('p').html('5');
};
