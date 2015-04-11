var GameScene = function() {
    this.shakeValue = model.speed, this.addShakeValue = 1;
    this.tunnel1 = new Tunnel1();
    this.tunnel2;
};


GameScene.prototype.show = function() {
    console.log("show game scene");
    $('#gameScene').find('canvas').addClass("show");
    $('#gameSceneGradient').addClass("show");
    this.render();
};

GameScene.prototype.render = function() {
    if (model.isGameStart) {
        //for tunnel 1

        if (model.currentTunnel == 1) {
            this.tunnel1.update();
        }

        if (model.currentTunnel == 2) {
            this.tunnel2.update();
        }

        //for meters
        if (uielements) {
            if (uielements.rpmMeter.isStartUpdate) {
                uielements.rpmMeter.initMeterAnimation();

                //for Update RPM Meter
//                uielements.rpmMeter.updateMeterValue(model.player1_RPM, model.player2_RPM);

                //for better swing
                var randomShakeValue = Math.floor(Math.random() * 10);

                if (this.shakeValue >= model.speed + randomShakeValue || this.shakeValue <= model.speed - randomShakeValue) {
                    this.addShakeValue *= -1;
                }

                this.shakeValue += this.addShakeValue;

                //for Update Team Meter
                uielements.rpmMeter.updateTeamMeterValue();

                //for Update Speed Meter
                uielements.speedMeter.updateValue(this.shakeValue);
            }
        }

        //check current level
        main.updateLevel();

        //For Transition between Levels
        //level 2 - show Congrats Layer
        if (model.currentLevel === 2 && !model.isShowCongrats) {
            setTimeout(function() {
                tutorial.onsStartShowCongrats();
            }, 1700);
            model.isShowCongrats = true;
        }

        //level 3 - show Engine Layer
        if (model.currentLevel === 3 && !model.isShowEngine) {
            //show engine
            main.initEngine();
            engine.show();

            //stop team rpm
            model.isStartTeamRPM = false;
            model.isShowEngine = true;
        }

        //for 3d Engine Spinning
        if (model.isSpinEngine) {
            engine.engineTimer += 1;
            if (engine.engineTimer >= 2) {
                engine.loop();
                engine.engineTimer = 0;
            }
        }
        requestAnimationFrame(this.render.bind(this));
    }
};

GameScene.prototype.removeTunnel_1 = function() {
    this.tunnel1.deleteShader();
    $('#gameScene').empty();
};

GameScene.prototype.changeTunnel = function(tunnelId) {
    this.tunnel2 = new Tunnel2();
    model.currentTunnel = 2;
};

