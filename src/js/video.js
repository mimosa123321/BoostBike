var Video = function() {
    this.domElement = document.getElementById('myVideo');
    this.player = document.getElementsByTagName('video')[0];
    this.init();
};

// Constants
Video.VIDEO_SOURCE = "./videos/ford.mp4";

Video.prototype.init = function() {
    var video = this.domElement;
    video.src = Video.VIDEO_SOURCE;
    video.load();

    video.addEventListener('loadeddata', function() {
        //finished Loaded
        console.log("video - Loadfinished");
    }, false);
};

Video.prototype.playVideo = function() {
    this.player.play();
};

Video.prototype.stopVideo = function() {
    this.player.pause();
};

Video.prototype.reset = function() {
    this.stopVideo();
    this.player.currentTime = 0;
    this.playVideo();
};
