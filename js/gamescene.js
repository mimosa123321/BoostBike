var GameScene = function() {
    this.tuniform, this.tobject, this.clock, this.isGameStart = false, this.shakeValue = model.player1_RPM, this.shakeValue2 = model.player2_RPM, this.addShakeValue = 1 , this.addShakeValue2 = 1, this.canvasWidth = 1000, this.canvasHeight = 500;

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ antialias: true ,alpha: false});
    //this.renderer.setClearColor( 0x193e75, 1);
    this.renderer.setSize(screen_width, screen_width);
    //this.renderer.setSize(screen_width, screen_width);
    $("#gameScene").append(this.renderer.domElement);

    this.light= new THREE.DirectionalLight( 0xff0000, 1.5 );
    this.light.position.set( -100, -100, -100 ).normalize();
    this.scene.add( this.light );

    this.light2	= new THREE.DirectionalLight( 0x0000ff, 1.5 );
    this.light2.position.set( -100, 100, -50 ).normalize();
    this.scene.add( this.light2 );

    this.camera = new THREE.PerspectiveCamera(70, screen_width / screen_width, 1, 1000);
    this.camera.position.set(0, 0, -100);
    this.camera.lookAt(this.scene.position);

    this.clock = new THREE.Clock();
    this.clock.start();

    this.initShaderToy();
    this.render();
};

GameScene.prototype.initShaderToy = function(){
    this.tuniform = {
        iGlobalTime:    { type: 'f', value: 0.1 },
        iRay: { type: 'v3', value: 0},
        iChannel0:  { type: 't', value: THREE.ImageUtils.loadTexture('images/textures/sphere2.png') },
        iResolution : { type: "v2", value : new THREE.Vector2(screen_width,screen_width) },
        iRedColor :  {type: "f", value :0.0 },
        iColorsDist: {type: "f", value :0.0},
        iNoOfParticle: {type: "i", value: 20 },
        startZPos: {type: "f", value :0.1 }
    };

    this.tuniform.iChannel0.value.wrapS = this.tuniform.iChannel0.value.wrapT = THREE.RepeatWrapping;
    this.tuniform.iRay.needsUpdate = true;

    var mat = new THREE.ShaderMaterial(
        {
            uniforms: this.tuniform,
            vertexShader: document.getElementById("vertexShader").textContent,
            fragmentShader: document.getElementById("fragmentShader").textContent,
            side:THREE.DoubleSide
            //transparent: true,
            //lights: true
        }
    );
    //mat.transparent = true;
    //mat.lights = true;
    this.tobject = new THREE.Mesh( new THREE.PlaneGeometry(screen_height, screen_height,1,1), mat);
    this.scene.add(this.tobject);
};

GameScene.prototype.show=function() {
    console.log("show game scene");
    $('#gameScene').find('canvas').addClass("show");
    $('#gameSceneGradient').addClass("show");
};

GameScene.prototype.render = function() {
    var delta=this.clock.getDelta();

    if(this.isGameStart) {
        if(this.tuniform) {
            this.tuniform.iGlobalTime.value += delta;
        }


        /*if(this.tuniform.startZPos.value < 1.0) {
            this.tuniform.startZPos.value += 0.005;
        }*/
    }

    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene,this.camera);

    //RPM meters enterframe
    if(uielements) {
        if(uielements.rpmMeter.isStartUpdate) {
            uielements.rpmMeter.initMeterAnimation();

            this.shakeValue += this.addShakeValue;

            if( this.shakeValue >= model.player1_RPM + (Math.floor(Math.random() * 10))) {
                this.addShakeValue *= -1;
            }

            if( this.shakeValue <= model.player1_RPM - (Math.floor(Math.random() * 10))) {
                this.addShakeValue *= -1;
            }

            this.shakeValue2 += this.addShakeValue2;

            if( this.shakeValue2 >= model.player2_RPM + (Math.floor(Math.random() * 10))) {
                this.addShakeValue2 *= -1;
            }

            if( this.shakeValue2 <= model.player2_RPM - (Math.floor(Math.random() * 10))) {
                this.addShakeValue2 *= -1;
            }

            //console.log(this.shakeValue2);

            //for better swing
            uielements.rpmMeter.updateMeterValue(this.shakeValue,this.shakeValue2);

            //
            if(uielements.speedMeter.isStartUpdate) {
                uielements.speedMeter.updateValue();
            }

            //check current level
            main.updateLevel();

            //
            if(model.currentLevel === 2  && !model.isShowCongrats) {
                tutorial.onsStartShowCongrats();
                model.isShowCongrats = true;
            }

            /*engineTimer+= 1;
            if(engineTimer >= 2) {
                engine.loop();
                engineTimer = 0;
            }*/
        }
    }


};
