var soundManager = {
    isGamePlaySoundPause: false
};


var attractorSound = new buzz.sound("./music/attractor", {
    formats: ["mp3"]
});

//attractorSound.setVolume(90);
//attractorSound.mute();

var gamePlaySound = new buzz.sound("./music/gameplay", {
    formats: ["mp3"]
});


//gamePlaySound.setVolume(80);
//gamePlaySound.mute();

var transitionSound = new buzz.sound("./music/transition", {
    formats: ["mp3"]
});

transitionSound.setVolume(100);

var winSound = new buzz.sound("./music/success", {
    formats: ["mp3"]
});

winSound.setVolume(100);

var countDownSound = new buzz.sound("./music/countdown", {
    formats: ["mp3"]
});

countDownSound.setVolume(100);

var loseSound = new buzz.sound("./music/lose", {
    formats: ["mp3"]
});

loseSound.setVolume(100);

var cameraSound = new buzz.sound("./music/camera", {
    formats: ["mp3"]
});
