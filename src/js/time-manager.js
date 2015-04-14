var TimeManager = {
    timeInterval: null,
    start: function() {
        console.log(" start Timer ");
        if (!TimeManager.timeInterval) {
            TimeManager.timeInterval = setInterval(function() {
                model.gameTimer -= 1;
                if (model.gameTimer === model.takePhotoMoment) {
                    model.players_souvenir_2 = GameScreenCore.getInstance().takePicture();
                }

                if (model.gameTimer > 0 && model.gameTimer <= 5) {
                    $('#endGameCountDown').css("opacity", 1);
                    $('#endGameCountDownValue').html(model.gameTimer);
                } else if (model.gameTimer <= 0) {
                    console.log("game End");
                    gamescene.isGameStart = false;
                    $('#endGameCountDown').css("opacity", 0);
                    TimeManager.stop();
                    transitionsManager.show(4);
                }
            }, 1000);
        }
    },

    stop: function() {
        console.log(" stop Timer ");
        if (TimeManager.timeInterval) {
            clearInterval(TimeManager.timeInterval);
            TimeManager.timeInterval = null;
        }
    },

    transitionsResultEndCallBack: function() {
        var totalRevolutionsExceptTutorial = model.totalRevolutions - model.revolutionPerLevel[0];
        //send call back
        GameScreenCore.getInstance().gameInformationGameEnded(
            model.currentLevel, model.speed, model.players_souvenir_2, totalRevolutionsExceptTutorial
        ); //TODO: add totalRPM (instead of the 0)
    }
};
