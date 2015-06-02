//Viento CSS animation library by Austin Jackson

function Viento() {
    //
}

Viento.prototype.fire = function(t) {
    //If these are undefined, set a default value to stop errors
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

    //If this is an entrance animation, wait for the animation to start to reveal the element
    if(t.animation.type === "entrance") {
        t.element.addEventListener("animationstart",function(){
            t.element.style.visibility = "visible";
        });
    }

    //Timeout function for an optional beforeDelay time
    setTimeout(function(){
        //Set the given animation properties, thus running the CSS animation
        t.withAnimation();
        t.element.style.animationName = t.animation.name;
        t.element.style.animationDuration = t.animation.duration;
        t.element.style.animationDelay = t.animation.delay;
        t.element.style.animationDirection = t.animation.direction;
        t.element.style.animationFillMode = t.animation.fillMode;
        t.element.style.animationIterationCount = t.animation.iterationCount;
        t.element.style.animationPlayState = t.animation.playState;
        t.element.style.animationTimingFunctions = t.animation.timingFunctions;
        //Style.animation will overwrite everything before it, so we only want to set it if it has data. This is to keep us from setting everything to undefined or default values.
        if(t.animation.animation !== undefined) {
            t.element.style.animation = t.animation.animation;
        }

        //Wait for the animation to end
        t.element.addEventListener("animationend",function(){

            //Timeout function for an optional afterDelay time
            setTimeout(function(){

                //If this is an exit animation, hide the element
                if(t.animation.type === "exit") {
                    t.element.style.visibility = "hidden";
                }
                //If resetAfter is enabled, reset the CSS animation properties and involved classes
                if(t.animation.resetAfter === true){
                    t.element.style.animationName = "";
                    t.element.style.animationDuration = "";
                    t.element.style.animationDelay = "";
                    t.element.style.animationDirection = "";
                    t.element.style.animationFillMode = "";
                    t.element.style.animationIterationCount = "";
                    t.element.style.animationPlayState = "";
                    t.element.style.animationTimingFunctions = "";
                    t.element.style.animation = "";
                    //If this element has an entrance animation, remove the "hidden" class from it and reset the visibility to default
                    if(t.animation.type === "entrance") {
                        $(t.element).removeClass("hidden");
                        t.element.style.visibility= "";
                    }
                }
                //Everything is done, run the callback function
                t.callback();

            },t.animation.afterDelay);

        });





    },t.animation.beforeDelay);



}