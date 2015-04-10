var scene, renderer, texture;
 var camera, cameraControl;
 var accel = 0.008; //0.008
 var cameraOffsetY = 0.5;



var GameScene = function() {
    this.tuniform, this.tobject, this.clock, this.shakeValue = model.player1_RPM, this.shakeValue2 = model.player2_RPM, this.addShakeValue = 1, this.addShakeValue2 = 1, this.canvasWidth = 1000, this.canvasHeight = 500;
    //

    loadjscssfile("js/Three.js", "js");
    //model.isGameStart = true;
    model.currentTunnel = 2;
    setTimeout(this.changeTunnel.bind(this),100);
};


GameScene.prototype.changeTunnel = function(tunnelId) {

    console.log("!!");

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false
    });

    renderer.setClearColor( 0xff0000, 1 );

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('container').appendChild(renderer.domElement);


    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000 );
    //        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.set(0, 0, 7);
    camera.lookAt(scene.position);
    scene.add(camera);

    var light	= new THREE.DirectionalLight( 0xff8000, 1.5 );
    light.position.set( 1, 1, 0 ).normalize();
    scene.add( light );

    var light	= new THREE.DirectionalLight( 0xff8000, 1.5 );
    light.position.set( -1, 1, 0 ).normalize();
    scene.add( light );

    var light	= new THREE.PointLight( 0x44FFAA, 15, 25 );
    light.position.set( 0, -3, 0 );
    scene.add( light );

    var light	= new THREE.PointLight( 0xff4400, 20, 30 );
    light.position.set( 3, 3, 0 );
    scene.add( light );

    scene.fog	= new THREE.FogExp2( 0x000000, 0.15 );

    var geometry	= new THREE.CylinderGeometry( 1, 1, 30, 32, 1, true );
    texture		= THREE.ImageUtils.loadTexture( "images/ash_uvgrid01.jpg" );
    texture.wrapT	= THREE.RepeatWrapping;

    var material	= new THREE.MeshLambertMaterial({color : 0xFFFFFF, map : texture});
    var mesh	= new THREE.Mesh( geometry, material );
    mesh.rotation.x	= Math.PI/2;
    scene.add( mesh );

    console.log(mesh);

    mesh.flipSided	= true;

    //animate();
    this.render();
};


function animate() {

    // move the texture to give the illusion of moving thru the tunnel
    texture.offset.y	+= 0.008; //control the speed of tunnel
    texture.offset.y	%= 1;
    texture.needsUpdate	= true;

    // move the camera back and forth
    var seconds		= Date.now() / 1000;
    var radius		= 0.70;
    var angle		= Math.sin(0.75 * seconds * Math.PI) / 4;
    //angle	= (seconds*Math.PI)/4;
    camera.position.x	= Math.cos(angle - Math.PI/2) * radius;
    camera.position.y	= Math.sin(angle - Math.PI/2) * radius + cameraOffsetY;
    camera.rotation.z	= angle;


    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

GameScene.prototype.animate = function() {

    //requestAnimationFrame( this.animate.bind(this) );
    //this.renderer.render(this.scene, this.camera);

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
    if (model.currentTunnel == 2) {
        texture.offset.y	+= 0.008; //control the speed of tunnel
        texture.offset.y	%= 1;
        texture.needsUpdate	= true;

        // move the camera back and forth
        var seconds		= Date.now() / 1000;
        var radius		= 0.70;
        var angle		= Math.sin(0.75 * seconds * Math.PI) / 4;
        //angle	= (seconds*Math.PI)/4;
        camera.position.x	= Math.cos(angle - Math.PI/2) * radius;
        camera.position.y	= Math.sin(angle - Math.PI/2) * radius + cameraOffsetY;
        camera.rotation.z	= angle;



    }


    if (model.isGameStart) {
        //for tunnel 1
        if (model.currentTunnel == 1) {
            //var delta = this.clock.getDelta();
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
            }
            this.renderer.render(this.scene, this.camera);*/
        }



        //for meters
        if (uielements) {
            if (uielements.rpmMeter.isStartUpdate) {
                uielements.rpmMeter.initMeterAnimation();

                var randomShakeValue = Math.floor(Math.random() * 10);

                if (this.shakeValue >= model.player1_RPM + randomShakeValue || this.shakeValue <= model.player1_RPM - randomShakeValue) {
                    this.addShakeValue *= -1;
                }

                if (this.shakeValue2 >= model.player2_RPM + randomShakeValue || this.shakeValue2 <= model.player2_RPM - randomShakeValue) {
                    this.addShakeValue2 *= -1;
                }

                this.shakeValue += this.addShakeValue;
                this.shakeValue2 += this.addShakeValue2;

                //for better swing
                uielements.rpmMeter.updateMeterValue(this.shakeValue, this.shakeValue2);

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
    renderer.render( scene, camera );

};

GameScene.prototype.deleteShader = function() {
    this.scene.remove(this.tobject);
    this.tobject = null;
};

