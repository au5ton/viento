//Viento CSS animation library by Austin Jackson

function Viento() {
    //
}

Viento.prototype.fire = function(t) {

    if(t.animation.beforeDelay === undefined) {
        t.animation.beforeDelay = 0;
    }
    if(t.animation.afterDelay === undefined) {
        t.animation.afterDelay = 0;
    }
    if(t.animation.resetAfter === undefined) {
        t.animation.resetAfter = true;
    }
    if(t.callback === undefined) {
        t.callback = function() {};
    }
    if(t.withAnimation === undefined){
        t.withAnimation = function() {};
    }

    if(t.animation.type === "entrance") {
        t.element.addEventListener("animationstart",function(){
            t.element.style.visibility = "visible";
        });
    }


    setTimeout(function(){
        t.withAnimation();
        t.element.style.animationName = t.animation.name;
        t.element.style.animationDuration = t.animation.duration;
        t.element.style.animationDelay = t.animation.delay;
        t.element.style.animationDirection = t.animation.direction;
        t.element.style.animationFillMode = t.animation.fillMode;
        t.element.style.animationIterationCount = t.animation.iterationCount;
        t.element.style.animationPlayState = t.animation.playState;
        t.element.style.animationTimingFunctions = t.animation.timingFunctions;
        t.element.style.animation = t.animation.animation;

        t.element.addEventListener("animationend",function(){

            setTimeout(function(){

                if(t.animation.type === "exit") {
                    t.element.style.visibility = "hidden";
                }
                else if(t.animation.resetAfter === true){
                    t.element.style.animationName = "";
                    t.element.style.animationDuration = "";
                    t.element.style.animationDelay = "";
                    t.element.style.animationDirection = "";
                    t.element.style.animationFillMode = "";
                    t.element.style.animationIterationCount = "";
                    t.element.style.animationPlayState = "";
                    t.element.style.animationTimingFunctions = "";
                    t.element.style.animation = "";
                    if(t.animation.type === "entrance") {
                        $(t.element).removeClass("hidden");
                        t.element.style.visibility= "";
                    }
                }
                t.callback();

            },t.animation.afterDelay);

        });





    },t.animation.beforeDelay);



}

//var e = document.getElementById("watchme");
//e.addEventListener("animationstart", listener);
//e.addEventListener("animationend", listener, false);
//e.addEventListener("animationiteration", listener, false);