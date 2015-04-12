var TimeManager = {
    timeInterval : null,
    start:function() {
        console.log(" start Timer ");
        if(!TimeManager.timeInterval) {
            TimeManager.timeInterval = setInterval(function(){
                model.gameTimer -= 1;
                console.log(" model.gameTimer="+ model.gameTimer);
                if(model.gameTimer <=0 ) {
                    console.log("game End");
                    TimeManager.stop();
                }
            },1000);
        }
    },

    stop:function() {
        console.log(" stop Timer ");
        if(TimeManager.timeInterval) {
            clearInterval(TimeManager.timeInterval);
            TimeManager.timeInterval = null;
        }
    }
};