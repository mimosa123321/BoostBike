/**
 * Created by mimosa on 4/11/15.
 */
var Tunnel1 = function() {
    this.tuniform, this.tobject, this.clock;
    this.lightRaySpeed = 0;

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false
    });
    //this.renderer.setClearColor( 0x193e75, 1);
    this.renderer.setSize(screen_width, screen_height);
    $("#gameScene").append(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(70, screen_width / screen_height, 1, 1000);
    this.camera.position.set(0, 0, -100);
    this.camera.lookAt(this.scene.position);

    this.clock = new THREE.Clock();
    this.clock.start();

    this.initShaderToy();
};


Tunnel1.prototype.initShaderToy = function() {
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

Tunnel1.prototype.update = function() {
    var delta = this.clock.getDelta();
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
        this.renderer.render(this.scene, this.camera);
    }
};

Tunnel1.prototype.deleteShader = function() {
    this.scene.remove(this.tobject);
    this.tobject = null;
};

/*----------------------------------------------------------*/

var Tunnel2 = function() {
    this.renderer = new THREE_M.WebGLRenderer({
        antialias: true,
        alpha: false
    });

    this.renderer.setClearColor( 0xff0000, 1 );

    this.renderer.setSize( window.innerWidth, window.innerHeight );
    $("#gameScene").append(this.renderer.domElement);

    this.scene = new THREE_M.Scene();

    this.camera = new THREE_M.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000 );
//        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100);
    this.camera.position.set(0, 0, 7);
    this.camera.lookAt(this.scene.position);
    this.scene.add(this.camera);

    var light	= new THREE_M.DirectionalLight( 0xff8000, 1.5 );
    light.position.set( 1, 1, 0 ).normalize();
    this.scene.add( light );

    var light	= new THREE_M.DirectionalLight( 0xff8000, 1.5 );
    light.position.set( -1, 1, 0 ).normalize();
    this.scene.add( light );

    var light	= new THREE_M.PointLight( 0x44FFAA, 15, 25 );
    light.position.set( 0, -3, 0 );
    this.scene.add( light );

    var light	= new THREE_M.PointLight( 0xff4400, 20, 30 );
    light.position.set( 3, 3, 0 );
    this.scene.add( light );

    this.scene.fog	= new THREE_M.FogExp2( 0x000000, 0.15 );

    var geometry	= new THREE_M.CylinderGeometry( 1, 1, 30, 32, 1, true );
    this.texture	= THREE_M.ImageUtils.loadTexture( "images/textures/ash_uvgrid01.jpg" );
    this.texture.wrapT	= THREE_M.RepeatWrapping;

    var material	= new THREE_M.MeshLambertMaterial({color : 0xFFFFFF, map :  this.texture});
    var mesh	= new THREE_M.Mesh( geometry, material );
    mesh.rotation.x	= Math.PI/2;
    this.scene.add( mesh );

    mesh.flipSided	= true;
};

Tunnel2.prototype.update = function() {
    this.texture.offset.y	+= 0.008; //control the speed of tunnel
    this.texture.offset.y	%= 1;
    this.texture.needsUpdate	= true;

     // move the camera back and forth
     var seconds		= Date.now() / 1000;
     var radius		= 0.70;
     var angle		= Math.sin(0.75 * seconds * Math.PI) / 4;
     //angle	= (seconds*Math.PI)/4;
    this.camera.position.x	= Math.cos(angle - Math.PI/2) * radius;
    this.camera.position.y	= Math.sin(angle - Math.PI/2) * radius + 0.5;
    this.camera.rotation.z	= angle;
    this.renderer.render(this.scene, this.camera);
};



