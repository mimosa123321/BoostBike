var model = {
    player1_RPM: 80,
    player2_RPM: 280,
    totalRevolutions: 1,
    revolutionPerLevel: [78, 296, 516, 640],
    currentLevel: 1,
    isShowCongrats: false,
    isShowEngine: false,
    isSpinEngine: false,
    isGameStart: false,
    isStartTeamRPM: false,
    isAccelerate: false,
    currentTunnel: 1,

    onReady: function() {
        model.onLoadImages('#preload');
    },

    onLoadImages: function(target) {
        var imgLoad = imagesLoaded(document.querySelector(target), function(instance) {
            console.log(target + ': images are loaded');
            initMain();
        });

        imgLoad.on('progress', function(instance, image) {
            var result = image.isLoaded ? 'loaded' : 'broken';
            console.log('image is ' + result + ' for ' + image.img.src);
        });

    }
};
