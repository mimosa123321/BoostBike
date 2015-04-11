var GameScene = function() {
    this.shakeValue = model.speed, this.addShakeValue = 1;
    this.tunnel1 = new Tunnel1();
    this.tunnel2;
    this.isGameStart = false;
    this.scene = $('#gameScene');
    this.sceneCanvas = $('#gameScene').find('canvas');
    this.sceneGradient = $('#gameSceneGradient');
};

GameScene.prototype.show = function() {
    console.log("show game scene");
    this.sceneCanvas.addClass("show");
    this.sceneGradient.addClass("show");
};

GameScene.prototype.start = function() {
    this.isGameStart = true;
    this.render();
};

GameScene.prototype.render = function() {
    if (this.isGameStart) {
        if (model.currentTunnel == 1) {
            this.tunnel1.update();
        }

        if (model.currentTunnel == 2) {
            this.tunnel2.update();
        }

        //for meters
        if (uielements) {
            if (uielements.isStartUpdate) {
                //for Update RPM Meter
                uielements.rpmMeter.updateMeterValue(model.player1_RPM, model.player2_RPM);

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

            if( uielements.rpmMeter.teamRPMMeter.isStartUpdate == true && !model.isAccelerate) {
                console.log(model.totalRevolutions);
                console.log(model.revolutionPerLevel[model.currentLevel-1]);
                if( model.currentLevel > 1) {
                    if(model.totalRevolutions > model.revolutionPerLevel[model.currentLevel-2]) {
                        console.log("---");
                        model.totalRevolutions -=1;
                    }
                }
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

        //level 3
        if (model.currentLevel === 3 && !model.isShowTransition2) {

            transitionManager.show(2);

            //stop team rpm
            uielements.rpmMeter.teamRPMMeter.isStartUpdate = false;
            model.isShowTransition2 = true;
        }

        //level 4 - show Engine Layer
        if (model.currentLevel === 4 && !model.isShowTransition3) {
            //show engine
            transitionManager.show(3);
            engine.show();

            //stop team rpm
            uielements.rpmMeter.teamRPMMeter.isStartUpdate = false;
            model.isShowTransition3 = true;
        }

        //for 3d Engine Spinning
        if (model.isSpinEngine) {
            engine.engineTimer += 1;
            if (engine.engineTimer >= 2) {
                engine.loop();
                engine.engineTimer = 0;
            }
        }

        //level 4 - show Engine Layer
        if (model.currentLevel === 5 && !model.isShowEnding) {

            uielements.rpmMeter.teamRPMMeter.isStartUpdate = false;
            model.isShowEnding = true;
        }



        requestAnimationFrame(this.render.bind(this));
    }
};

GameScene.prototype.changeTunnel = function(tunnelId) {
    this.tunnel2 = new Tunnel2();
    model.currentTunnel = 2;
};

GameScene.prototype.removeTunnel_1 = function() {
    this.tunnel1.deleteShader();
    this.scene.empty();
};

GameScene.prototype.removeTunnel_2 = function() {
    this.scene.empty();
};

GameScene.prototype.reset = function() {
    this.isGameStart = false;
    this.tunnel1 = null;
    this.tunnel2 = null;
    this.removeTunnel_1();
    this.removeTunnel_2();
    this.tunnel1 = new Tunnel1();
    this.shakeValue = model.speed;
};

