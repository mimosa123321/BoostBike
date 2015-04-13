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

GameScene.prototype.changeSceneGradientScale = function(value) {
    this.sceneGradient.removeClass("show");
    this.sceneGradient.css('-webkit-transform','scale('+value+')');
    this.sceneGradient.css('opacity','1');
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

                if (uielements.rpmMeter.teamRPMMeter.isStartUpdate) {
                    if( model.currentLevel > 1) {
                        //console.log("model.totalRevolutions="+model.totalRevolutions);
                        //console.log("model.revolutionPerLevel[model.currentLevel-2]="+model.revolutionPerLevel[model.currentLevel-2]);
                        if(Math.ceil(model.totalRevolutions) >= model.revolutionPerLevel[model.currentLevel-2]) {
                            //console.log("model.player1_RPM="+model.player1_RPM);
                            //console.log("this.prev_player1_RPM="+this.prev_player1_RPM);
                            if(model.player1_RPM > this.prev_player1_RPM) {
                                //console.log("accelerating");
                                model.isAccelerate = true;
                                model.totalRevolutions += 10;
                            }else if(model.player1_RPM < this.prev_player1_RPM){
                                //console.log("deccelerating");
                                model.isAccelerate = false;
                                model.totalRevolutions += 0;

                            }
                            this.prev_player1_RPM = model.player1_RPM;

                            if(model.player2_RPM > this.prev_player2_RPM) {
                                model.isAccelerate = true;
                                model.totalRevolutions += 10;
                            }else if(model.player2_RPM < this.prev_player2_RPM) {
                                model.isAccelerate = false;
                                model.totalRevolutions += 0;
                            }
                            this.prev_player2_RPM = model.player2_RPM;
                            if(model.totalRevolutions <=model.revolutionPerLevel[model.currentLevel-2]) {
                                model.totalRevolutions = model.revolutionPerLevel[model.currentLevel-2];
                            }
                        }
                    }
                }

                //for Update Team Meter
                uielements.rpmMeter.updateTeamMeterValue();

                //for Update Speed Meter
                uielements.speedMeter.updateValue(model.speed);
            }
        }

        //check current level
        main.updateLevel();

        //console.log("model.totalRevolutions="+model.totalRevolutions);

        //For Transition between Levels
        //level 2 - show Transition 1
        if (model.currentLevel === 2 && !model.isShowTransition1) {
            model.isShowTransition1 = true;
            this.manageTransitions(1,1500,5500);

            //send call back when tutorial ends
            GameScreenCore.getInstance().gameInformationTutorialEnded();

            //send call back when game level update
            GameScreenCore.getInstance().gameInformationLevel(model.currentLevel);
        }

        //level 3
        if (model.gameTimer != 0 && model.currentLevel === 3 && !model.isShowTransition2) {
            model.isShowTransition2 = true;
            this.manageTransitions(2,1000,5500); //6500
            //stop team rpm
            uielements.rpmMeter.teamRPMMeter.stopUpdate();

            //send call back when game level update
            GameScreenCore.getInstance().gameInformationLevel(model.currentLevel);
        }

        //level 4 - show Engine Layer
        if (model.gameTimer != 0 && model.currentLevel === 4 && !model.isShowTransition3) {
            model.isShowTransition3 = true;
            //show engine
            this.manageTransitions(3,1000,8500);
            //stop team rpm
            uielements.rpmMeter.teamRPMMeter.stopUpdate();

            //send call back when game level update
            GameScreenCore.getInstance().gameInformationLevel(model.currentLevel);
        }

        //for 3d Engine Spinning
        if (model.isSpinEngine) {
            engine.engineTimer += 1;
            if (engine.engineTimer >= 2) {
                engine.loop();
                engine.engineTimer = 0;
            }
        }

        //level 5 - Win
        if (model.gameTimer != 0 && model.currentLevel === 5 && !model.isShowEnding) {
            console.log("win!!");

            //stop team rpm
            uielements.rpmMeter.teamRPMMeter.stopUpdate();

            //stop Counter
            TimeManager.stop();
            $('#endGameCountDown').css("opacity",0);
            transitionsManager.show(4);

            model.isShowEnding = true;
            this.isGameStart = false;
        }
        requestAnimationFrame(this.render.bind(this));
    }
};

GameScene.prototype.manageTransitions = function(id, showTime, hideTime) {
    setTimeout(function() {
        transitionsManager.show(id);
    },showTime);

    //4 == end page
    if(id !== 4) {
        setTimeout(function() {
            transitionsManager.hide(id);
        },hideTime);
    }
};

GameScene.prototype.changeTunnel = function(tunnelId) {
    this.changeSceneGradientScale(0.8);
    this.tunnel2 = new Tunnel2();
    model.currentTunnel = 2;
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

