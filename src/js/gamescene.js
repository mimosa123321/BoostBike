var GameScene = function() {
    this.shakeValue = model.speed, this.addShakeValue = 1;
    this.tunnel1 = new Tunnel1();
    this.tunnel2;
    this.isGameStart = false;
    this.scene = $('#gameScene');
    this.sceneCanvas = $('#gameScene').find('canvas');
    this.sceneGradient = $('#gameSceneGradient');
    this.sceneGradientDOMElement = document.getElementById("gameSceneGradient");
    this.prev_player1_RPM = 0;
    this.prev_player2_RPM = 0;
    this.hideSceneGradient = this.onHideSceneGradient.bind(this);
};

GameScene.prototype.show = function() {
    console.log("show game scene");
    this.sceneCanvas.addClass("show");
    this.sceneGradient.attr("class", "show");
    animate.addAnimationListener(this.sceneGradientDOMElement, "AnimationEnd", this.hideSceneGradient);
};

GameScene.prototype.start = function() {
    this.isGameStart = true;
    this.render();
};

GameScene.prototype.onHideSceneGradient = function() {
    animate.removeAnimationListener(this.sceneGradientDOMElement, "AnimationEnd", this.hideSceneGradient);
    this.sceneGradient.attr("class", "hide");
};

GameScene.prototype.changeSceneGradientScale = function(value) {
    this.sceneGradient.attr("class", "");
    this.sceneGradient.css('-webkit-transform', 'scale(' + value + ')');
    this.sceneGradient.css('opacity', '0.8');
};

GameScene.prototype.render = function() {
    if (this.isGameStart) {
        requestAnimationFrame(this.render.bind(this));

        var now = Date.now();
        delta = now - then;
        var secondPerFrame = (delta / 1000);

        if (model.currentTunnel == 1) {
            this.tunnel1.update();
        }

        if (model.currentTunnel == 2) {
            this.tunnel2.checkRayLength();
            this.tunnel2.update();
        }

        //for meters
        if (uielements) {
            if (uielements.isStartUpdate) {
                //for Update RPM Meter
                uielements.rpmMeter.updateMeterValue(model.player1_RPM, model.player2_RPM);

                if (uielements.rpmMeter.teamRPMMeter.isStartUpdate) {
                    if (model.currentLevel > 1) {
                        // execute "accumulatedTeamRPM" every one second
                        if (secondPerFrame > 0) {
                            timetick += secondPerFrame;
                            if (timetick >= 1) {
                                //myTimer += 1; for tracking
                                uielements.rpmMeter.teamRPMMeter.accumulatedTeamRPM();
                                timetick = 0;
                            }
                        }
                    }
                }

                //for Update Team Meter
                uielements.rpmMeter.updateTeamMeterValue();

                if (uielements.speedMeter.isStartUpdate) {
                    //for Update Speed Meter
                    uielements.speedMeter.updateValue(Math.ceil(model.speed * model.boostSpeed));
                    uielements.speedMeter.checkAcceleration();
                    uielements.speedMeter.getMaxSpeed();
                }
            }
        }

        //check current level
        main.updateLevel();

        //console.log("model.accelerateSpeed="+model.accelerateSpeed);

        //For Transition between Levels
        //level 2 - show Transition 1
        if (model.currentLevel === 2 && !model.isShowTransition1) {
            model.isShowTransition1 = true;
            this.manageTransitions(1, 1500, 5500);

            //send call back when tutorial ends
            GameScreenCore.getInstance().gameInformationTutorialEnded();

            //send call back when game level update
            GameScreenCore.getInstance().gameInformationLevel(model.currentLevel);
        }

        //level 3
        if (model.gameTimer != 0 && model.currentLevel === 3 && !model.isShowTransition2) {
            model.isShowTransition2 = true;
            model.boostSpeed = 1.8;
            this.manageTransitions(2, 1000, 5500); //6500

            //stop team rpm
            uielements.rpmMeter.teamRPMMeter.stopUpdate();

            //stop speed meter
            uielements.speedMeter.stopUpdate();

            //send call back when game level update
            GameScreenCore.getInstance().gameInformationLevel(model.currentLevel);
        }

        //level 4 - show Engine Layer
        if (model.gameTimer != 0 && model.currentLevel === 4 && !model.isShowTransition3) {
            model.isShowTransition3 = true;
            model.boostSpeed = 2.8;
            //show engine
            this.manageTransitions(3, 1000, 7000);
            //stop team rpm
            uielements.rpmMeter.teamRPMMeter.stopUpdate();

            //stop speed meter
            uielements.speedMeter.stopUpdate();

            //send call back when game level update
            GameScreenCore.getInstance().gameInformationLevel(model.currentLevel);
        }

        //for 3d Engine Spinning
        /*if (model.isSpinEngine) {
            engine.engineTimer += 1;
            if (engine.engineTimer >= 2) {
                engine.loop();
                engine.engineTimer = 0;
            }
        }*/

        //level 5 - Win
        if (model.gameTimer != 0 && model.currentLevel === 5 && !model.isShowEnding) {
            model.isWin = true;

            //stop team rpm
            uielements.rpmMeter.teamRPMMeter.stopUpdate();

            //stop Counter
            TimeManager.stop();
            $('#endGameCountDown').css("opacity", 0);
            transitionsManager.show(4);

            model.isShowEnding = true;
            this.isGameStart = false;
        }

        // update stats
        stats.update();

        then = now;
    }
};

GameScene.prototype.manageTransitions = function(id, showTime, hideTime) {
    setTimeout(function() {
        transitionsManager.show(id);
    }, showTime);

    //4 == end page
    if (id !== 4) {
        setTimeout(function() {
            transitionsManager.hide(id);
        }, hideTime);
    }
};

GameScene.prototype.changeTunnel = function(tunnelId) {
    this.changeSceneGradientScale(1);
    this.tunnel2 = new Tunnel2();
    model.currentTunnel = 2;

    //restore the speed here
    model.isAllowAccel = false;
    model.accelerateSpeed = 0;
};

GameScene.prototype.removeTunnel_1 = function() {
    this.tunnel1.remove();
    this.scene.empty();
};

GameScene.prototype.removeTunnel_2 = function() {
    this.tunnel2.deleteShader();
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
