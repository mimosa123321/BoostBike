/**
 * Created by mimosa.poon on 4/12/15.
 */
var TransitionsManager = function() {
    this.transitionsContainer = $('#transitionsContainer');
    this.transitionsContainerDomElement = document.getElementById('transitionsContainer');
    this.bgTop = $('#greenTop');
    this.bgBottom = $('#greenBottom');
    this.bgTopDomElement = document.getElementById('greenTop');
    this.bgBottomDomElement = document.getElementById('greenBottom');

    this.transition1 = new TransitionLevel1;
    this.transition2 = new TransitionLevel2;
    this.transition3 = new TransitionLevel3;
    this.endShowTransitions = this.onEndShowTransitions.bind(this);
    this.endHideTransitions = this.onEndHideTransitions.bind(this);
    this.currentTransitionId;
};

TransitionsManager.prototype.show = function(transitionId) {
    this.currentTransitionId = transitionId;
    this.transitionsContainer.attr("class","show");
    if(transitionId === 1) {
        this.transition1.show();
    }
    if(transitionId === 2) {
        this.transition2.show();
    }


    animate.addAnimationListener(this.transitionsContainerDomElement, "AnimationEnd", this.endShowTransitions);
};

TransitionsManager.prototype.onEndShowTransitions = function() {
    if(this.currentTransitionId === 2) {
        gamescene.removeTunnel_1();
        setTimeout(function(){
            console.log("change tunnel2");
            gamescene.changeTunnel();
        },100);
    }

    if(this.currentTransitionId === 3) {
        setTimeout( this.transition3.show(), 10);
    }

    animate.removeAnimationListener(this.transitionsContainerDomElement, "AnimationEnd", this.endShowTransitions);
};

TransitionsManager.prototype.hide = function(transitionId) {
    if(transitionId === 1) {
        this.transition1.hide();
    }

    if(transitionId === 3) {
        this.transition3.hide3DEngine();
    }

    setTimeout(function(){
        $('#transitionsContainer').attr("class","hide");
    },800);


    animate.addAnimationListener(this.transitionsContainerDomElement, "AnimationEnd", this.endHideTransitions);
};

TransitionsManager.prototype.onEndHideTransitions = function() {
    if(this.currentTransitionId ===1) {
        animate.removeAnimationListener(this.transitionsContainerDomElement, "AnimationEnd", this.endHideTransitions);
        tutorial.showInstructions(4);
    }
    if(this.currentTransitionId ===2) {
        uielements.rpmMeter.teamRPMMeter.startUpdate();
    }

    if(this.currentTransitionId ===3) {
        //start update after hide engine
    }
};

/*-----------------*/
var TransitionLevel1 =  function() {
    this.transition = $('#transition1');
};

TransitionLevel1.prototype.show = function() {
    this.transition.addClass("show");
    console.log("transition 1 show");
};

TransitionLevel1.prototype.hide = function() {
    this.transition.removeClass("show");
};

/*-----------------*/
var TransitionLevel2 =  function() {
    this.transition = $('#transition2');
};

TransitionLevel2.prototype.show = function() {
    this.transition.addClass("show");
    console.log("transition 2 show");
};

TransitionLevel2.prototype.hide = function() {
    this.transition.removeClass("show");
};

/*-----------------*/
var TransitionLevel3 =  function() {
    this.transition = $('#transition3');
    this.frameHeight = 722;
    this.engineTimer = 0;
    this.engine = $('#engine');
    this.engine3dPhotos = $('#photos');
    this.engineDomElement = document.getElementById('engine');
    this.engine3DDomElement = document.getElementById('photos');
    //this.finishShowEngine = this.onFinishShowEngine.bind(this);
    this.finishHide3DEngine = this.onFinishHide3DEngine.bind(this);

};

TransitionLevel3.prototype.show = function() {
    console.log("transition 3 show");
    //this.transition.addClass("show");
    this.show3DEngine();
};

TransitionLevel3.prototype.show3DEngine = function() {
    this.engine3dPhotos.addClass('show');
    setTimeout(function() {
        model.isSpinEngine = true;
    }, 1200);
    //setTimeout(this.hide3DEngine.bind(this), 8000);
};

TransitionLevel3.prototype.hide3DEngine = function() {
    model.isSpinEngine = false;
    this.engine3dPhotos.attr('class', 'hide');
    animate.addAnimationListener(this.engine3DDomElement, "AnimationEnd", this.finishHide3DEngine);
};

TransitionLevel3.prototype.onFinishHide3DEngine = function() {
    animate.removeAnimationListener(this.engine3DDomElement, "AnimationEnd", this.finishHide3DEngine);
    uielements.rpmMeter.teamRPMMeter.startUpdate();
};