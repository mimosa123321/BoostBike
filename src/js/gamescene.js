var GameScene = function() {
    this.tuniform, this.tobject, this.clock, this.shakeValue = model.player1_RPM, this.addShakeValue = 1;
    //this.bgSpeedPerRevolution = 3 / 300;
    //this.rayLenthPerRevolution = 1 / 100;
    this.lightRaySpeed = 0;

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false
    });
    //this.renderer.setClearColor( 0x193e75, 1);
    this.renderer.setSize(screen_width, screen_width);
    //this.renderer.setSize(screen_width, screen_width);
    $("#gameScene").append(this.renderer.domElement);

    this.light = new THREE.DirectionalLight(0xff0000, 1.5);
    this.light.position.set(1, 1, 0).normalize();
    this.light2 = new THREE.DirectionalLight(0x0000ff, 1.5);
    this.light2.position.set(-1, 1, 0).normalize();
    this.light3 = new THREE.PointLight(0x44FFAA, 15, 25);
    this.light3.position.set(0, -3, 0);
    this.light4 = new THREE.PointLight(0xff4400, 20, 30);
    this.light4.position.set(3, 3, 0);

    this.camera = new THREE.PerspectiveCamera(70, screen_width / screen_width, 1, 1000);
    this.camera.position.set(0, 0, -100);
    this.camera.lookAt(this.scene.position);

    this.clock = new THREE.Clock();
    this.clock.start();

    //this.initShaderToy();
    this.render();
};

GameScene.prototype.initShaderToy = function() {
    this.tuniform = {
        iGlobalTime: {
            type: 'f',
            value: 0.1
        },
        iRay: {
            type: 'v3',
            value: 0
        },
        iChannel0: {
            type: 't',
            value: THREE.ImageUtils.loadTexture('images/textures/sphere2.png')
        },
        iResolution: {
            type: "v2",
            value: new THREE.Vector2(screen_width, screen_width)
        },
        iRedColor: {
            type: "f",
            value: 0.0
        },
        iColorsDist: {
            type: "f",
            value: 0.0
        },
        iNoOfParticle: {
            type: "i",
            value: 20
        },
        startZPos: {
            type: "f",
            value: 0.1
        },
        iAccValue: {
            type: "f",
            value: 0.0
        },
        iRayLength: {
            type: "f",
            value: 0.0
        }
    };

    this.tuniform.iChannel0.value.wrapS = this.tuniform.iChannel0.value.wrapT = THREE.RepeatWrapping;
    this.tuniform.iRay.needsUpdate = true;

    var mat = new THREE.ShaderMaterial({
        uniforms: this.tuniform,
        vertexShader: document.getElementById("vertexShader").textContent,
        fragmentShader: document.getElementById("fragmentShader").textContent,
        side: THREE.DoubleSide
        //transparent: true,
        //lights: true
    });
    //mat.transparent = true;
    //mat.lights = true;
    this.tobject = new THREE.Mesh(new THREE.PlaneGeometry(screen_height, screen_height, 1, 1), mat);
    this.scene.add(this.tobject);
};

GameScene.prototype.show = function() {
    console.log("show game scene");
    $('#gameScene').find('canvas').addClass("show");
    $('#gameSceneGradient').addClass("show");
};

GameScene.prototype.render = function() {
    var delta = this.clock.getDelta();

    if (model.isGameStart) {
        //for tunnel 1
        if (model.currentTunnel == 1) {
            /*if (this.tuniform) {
                this.tuniform.iGlobalTime.value += delta + this.lightRaySpeed;

                if (model.isStartTeamRPM && model.isAccelerate) {
                    //increase the light ray speed and length
                    this.lightRaySpeed += 0.0005;
                    this.tuniform.iRayLength.value += 0.002;
                } else {
                    //speed
                    if (this.lightRaySpeed > 0) {
                        this.lightRaySpeed -= 0.001;
                    }
                    //eay length
                    if (this.tuniform.iRayLength.value > 0) {
                        this.tuniform.iRayLength.value -= 0.02;
                    }
                }
            }*/
        }

        //for meters
        if (uielements) {
            if (uielements.rpmMeter.isStartUpdate) {
                uielements.rpmMeter.initMeterAnimation();

                var randomShakeValue = Math.floor(Math.random() * 10);

                if (this.shakeValue >= model.player1_RPM + randomShakeValue || this.shakeValue <= model.player1_RPM - randomShakeValue) {
                    this.addShakeValue *= -1;
                }

                this.shakeValue += this.addShakeValue;

                //for better swing
                uielements.rpmMeter.updateMeterValue(model.player1_RPM, model.player2_RPM);

                //for Update Team Meter
                uielements.rpmMeter.updateTeamMeterValue();

                //for Update Speed Meter
                uielements.speedMeter.updateValue();
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
    }
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
};

GameScene.prototype.deleteShader = function() {
    this.scene.remove(this.tobject);
    this.tobject = null;
};

GameScene.prototype.changeTunnel = function(tunnelId) {
    if (tunnelId === 2) {
        /*this.scene.add(this.light);
         this.scene.add(this.light2);
         this.scene.add(this.light3);
         this.scene.add(this.light4);
         this.scene.fog = new THREE.FogExp2(0x000000, 0.15);
         var geometry = new THREE.CylinderGeometry(1, 1, 30, 32, 1, true);
         var texture = THREE.ImageUtils.loadTexture("images/ash_uvgrid01.jpg");
         texture.wrapT = THREE.RepeatWrapping;
         var material = new THREE.MeshLambertMaterial({
         color: 0xFFFFFF,
         map: texture
         });
         this.tobject = new THREE.Mesh(geometry, material);
         this.tobject.rotation.x = Math.PI / 2;
         this.scene.add(this.tobject);
         this.tobject.flipSided = true;*/
    }
};