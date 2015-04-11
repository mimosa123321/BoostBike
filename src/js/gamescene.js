var GameScene = function() {
    this.tuniform, this.tobject, this.clock, this.shakeValue = model.speed, this.addShakeValue = 1;
    this.texture;
    this.lightRaySpeed = 0;

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false
    });
    //this.renderer.setClearColor( 0x193e75, 1);
    this.renderer.setSize(screen_width, screen_height);
    //this.renderer.setSize(screen_width, screen_width);
    $("#gameScene").append(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(70, screen_width / screen_height, 1, 1000);
    this.camera.position.set(0, 0, -100);
    this.camera.lookAt(this.scene.position);

    this.clock = new THREE.Clock();
    this.clock.start();

    this.initShaderToy();
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
            value: new THREE.Vector2(screen_width, screen_height)
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
    this.tobject = new THREE.Mesh(new THREE.PlaneGeometry(screen_width, screen_height, 1, 1), mat);
    this.scene.add(this.tobject);
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
        var delta = this.clock.getDelta();
        if (model.currentTunnel == 1) {
            if (this.tuniform) {
                this.tuniform.iGlobalTime.value += delta + this.lightRaySpeed;
                //this.tuniform.iGlobalTime.value += delta;

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
            }
        }

        //for meters
        /*if (uielements) {
            if (uielements.rpmMeter.isStartUpdate) {
                uielements.rpmMeter.initMeterAnimation();

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
        }*/
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);

    }

};

GameScene.prototype.deleteShader = function() {
    this.scene.remove(this.tobject);
    this.tobject = null;
    $('#gameScene').empty();

};

GameScene.prototype.changeTunnel = function(tunnelId) {
    model.currentTunnel = tunnelId;
    if (tunnelId === 2) {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false
        });

        this.renderer.setClearColor( 0xff0000, 1 );
        this.renderer.setSize( screen_width, screen_height );
        $("#gameScene").append(this.renderer.domElement);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(40, screen_width / screen_height, 1, 10000 );
        this.camera.position.set(0, 0, 7);
        this.camera.lookAt(this.scene.position);
        this.scene.add(this.camera);

        var light	= new THREE.DirectionalLight( 0xff8000, 1.5 );
        light.position.set( 1, 1, 0 ).normalize();
        this.scene.add( this.light );

        var light	= new THREE.DirectionalLight( 0xff8000, 1.5 );
        light.position.set( -1, 1, 0 ).normalize();
        this.scene.add( this.light );

        var light	= new THREE.PointLight( 0x44FFAA, 15, 25 );
        light.position.set( 0, -3, 0 );
        this.scene.add( this.light );

        var light	= new THREE.PointLight( 0xff4400, 20, 30 );
        light.position.set( 3, 3, 0 );
        this.scene.add( this.light );

        this.scene.fog	= new THREE.FogExp2( 0x000000, 0.15 );

        var geometry	= new THREE.CylinderGeometry( 1, 1, 30, 32, 1, true );
        this.texture		= THREE.ImageUtils.loadTexture( "images/ash_uvgrid01.jpg" );
        this.texture.wrapT	= THREE.RepeatWrapping;

        var material	= new THREE.MeshLambertMaterial({color : 0xFFFFFF, map : this.texture});
        var mesh	= new THREE.Mesh( geometry, material );
        mesh.rotation.x	= Math.PI/2;
        this.scene.add( mesh );

        mesh.flipSided	= true;
    }
};