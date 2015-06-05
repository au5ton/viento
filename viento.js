//Viento CSS animation library by Austin Jackson

function Viento() {
    //
}

Viento.prototype.callInteration = 0;
Viento.prototype.t = undefined;

Viento.prototype.fire = function(t) {
    console.log("call iteration: "+Viento.prototype.callInteration);
    Viento.prototype.callInteration++;

    Viento.prototype.t = t;

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
        if(t.element.getAttribute("data-v-hasAnimationStartListener") === "true"){
            console.log("Element with id "+t.element.getAttribute("id")+" already has an animationStart listener.");
        }
        else {
            t.element.setAttribute("data-v-hasAnimationStartListener","true");
            var onAnimationStart = function(event){
                event.target.style.visibility = "visible";
            };
            t.element.addEventListener("animationstart",onAnimationStart);
            t.element.addEventListener("webkitAnimationStart",onAnimationStart);
            t.element.addEventListener("oanimationstart",onAnimationStart);
            t.element.addEventListener("MSAnimationStart",onAnimationStart);
        }
    }

    function f1() {
        //Set the given animation properties, thus running the CSS animation
        //t.withAnimation();
        //Standard
        t.element.style.animationName = t.animation.name;
        t.element.style.animationDuration = t.animation.duration;
        t.element.style.animationDelay = t.animation.delay;
        t.element.style.animationDirection = t.animation.direction;
        t.element.style.animationFillMode = t.animation.fillMode;
        t.element.style.animationIterationCount = t.animation.iterationCount;
        t.element.style.animationPlayState = t.animation.playState;
        t.element.style.animationTimingFunctions = t.animation.timingFunctions;
        //-webkit-
        t.element.style.webkitAnimationName = t.animation.name;
        t.element.style.webkitAnimationDuration = t.animation.duration;
        t.element.style.webkitAnimationDelay = t.animation.delay;
        t.element.style.webkitAnimationDirection = t.animation.direction;
        t.element.style.webkitAnimationFillMode = t.animation.fillMode;
        t.element.style.webkitAnimationIterationCount = t.animation.iterationCount;
        t.element.style.webkitAnimationPlayState = t.animation.playState;
        t.element.style.webkitAnimationTimingFunctions = t.animation.timingFunctions;
        //Style.animation will overwrite everything before it, so we only want to set it if it has data. This is to keep us from setting everything to undefined or default values.
        if(t.animation.animation !== undefined) {
            t.element.style.animation = t.animation.animation;
        }

        //Wait for the animation to end
        if(t.element.getAttribute("data-v-hasAnimationEndListener") === "true"){
            console.log("Element with id "+t.element.getAttribute("id")+" already has an animationEnd listener.");
        }
        else {
            t.element.setAttribute("data-v-hasAnimationEndListener","true");
            var onAnimationEnd = function(event){
                //Timeout function for an optional afterDelay time

                function f2(){
                    //If this is an exit animation, hide the element
                    if(t.animation.type === "exit") {
                        t.element.style.visibility = "hidden";
                    }
                    //If resetAfter is enabled, reset the CSS animation properties and involved classes
                    if(t.animation.resetAfter === true){
                        //If this element has an entrance animation, remove the "hidden" class from it and reset the visibility to default
                        if(t.animation.type === "entrance") {
                            $(t.element).removeClass("hidden");
                            t.element.style.visibility= "";
                        }

                        //Standard
                        event.target.style.animationName = "";
                        event.target.style.animationDuration = "";
                        event.target.style.animationDelay = "";
                        event.target.style.animationDirection = "";
                        event.target.style.animationFillMode = "";
                        event.target.style.animationIterationCount = "";
                        event.target.style.animationPlayState = "";
                        event.target.style.animationTimingFunctions = "";
                        event.target.style.animation = "";
                        //-webkit-
                        event.target.style.webkitAnimationName = "";
                        event.target.style.webkitAnimationDuration = "";
                        event.target.style.webkitAnimationDelay = "";
                        event.target.style.webkitAnimationDirection = "";
                        event.target.style.webkitAnimationFillMode = "";
                        event.target.style.webkitAnimationIterationCount = "";
                        event.target.style.webkitAnimationPlayState = "";
                        event.target.style.webkitAnimationTimingFunctions = "";
                    }
                    //Everything is done, run the callback function
                    t.callback();
                }
                if(t.animation.afterDelay <= 0) {
                    f2();
                }
                else {
                    setTimeout(f2,t.animation.afterDelay);
                }
            };
            t.element.addEventListener("animationend",onAnimationEnd);
            t.element.addEventListener("webkitAnimationEnd",onAnimationEnd);
            t.element.addEventListener("oanimationend",onAnimationEnd);
            t.element.addEventListener("MSAnimationEnd",onAnimationEnd);
        }
    }


    if(t.animation.beforeDelay <= 0) {
        f1();
    }
    else {
        //Timeout function for an optional beforeDelay time
        setTimeout(f1,t.animation.beforeDelay);
    }

}

Viento.prototype.burst = function(b) {

    var errors = false;

    /*
    Model:

    {
        elements: [],
        method: "allAtOnce",
        animation: {
            //same block as Viento.fire()
        }
    }
    */

    if(b === undefined){
        return;
    }
    else {
        if(b.elements === undefined) {
            console.error("No elements were specified.");
            errors = true;
        }
        if(b.method === undefined) {
            console.log("You didn't define a method to use. Doing all at once by default.");
            b.method = "allAtOnce";
        }
        if(b.animation ===  undefined) {
            console.error("No animation was specified.");
            errors = true;
        }
        else {
            if(b.animation.name === undefined) {
                console.error("No animation name was specified.");
            }
        }
        if(errors === true) {
            //return;
        }
    }

    if(b.method === "allAtOnce") {
        for(var i = 0; i < b.elements.length; i++) {
            //console.log(b.elements[i]);
            Viento.prototype.fire({
                element: b.elements[i],
                animation: b.animation
            });
        }
    }

}
