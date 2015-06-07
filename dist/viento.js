//Viento CSS animation library by Austin Jackson

//'use strict';

function Viento() {
    //
}



Viento.prototype.callInteration = 0;
Viento.prototype.t = undefined;
Viento.prototype.isReady = false;

//Thanks: http://stackoverflow.com/questions/5999998/how-can-i-check-if-a-javascript-variable-is-function-type
Viento.prototype.isFunction = function(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

Viento.prototype.fire = function(t) {
    console.log("call iteration: "+Viento.prototype.callInteration);
    Viento.prototype.callInteration++;
    Viento.prototype.t = t;
    var error = false;

    //If these are undefined, set a default value to stop errors
    if(t === undefined) {
        console.error("You didn't define anything!");
        error = true;
    }
    else {
        if(t.element === undefined) {
            console.error("You didn't define an element.");
            error = true;
        }
        else {
            var elem = $(t.element);
        }
        if(t.animation === undefined) {
            console.error("You didn't define an animation.");
            error = true;
        }
        else {
            if(t.animation.beforeDelay === undefined) {
                t.animation.beforeDelay = 0;
            }
            if(t.animation.afterDelay === undefined) {
                t.animation.afterDelay = 0;
            }
            if(t.animation.resetAfter === undefined) {
                t.animation.resetAfter = true;
            }
        }
        if(t.callback === undefined) {
            t.callback = function() {};
        }
        if(t.withAnimation === undefined){
            t.withAnimation = function() {};
        }
    }
    if(error === true) {
        return;
    }

    //If this is an entrance animation, wait for the animation to start to reveal the element
    if(t.animation.type === "entrance") {
        elem.on("animationstart webkitAnimationStart oanimationstart MSAnimationStart",function(){
            event.target.style.visibility = "visible";
        });
    }
    elem.on("animationend webkitAnimationEnd oanimationend MSAnimationEnd",function(){

        setTimeout(function(){
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
                t.element.style.animationName = "";
                t.element.style.animationDuration = "";
                t.element.style.animationDelay = "";
                t.element.style.animationDirection = "";
                t.element.style.animationFillMode = "";
                t.element.style.animationIterationCount = "";
                t.element.style.animationPlayState = "";
                t.element.style.animationTimingFunctions = "";
                t.element.style.animation = "";
                //-webkit-
                t.element.style.webkitAnimationName = "";
                t.element.style.webkitAnimationDuration = "";
                t.element.style.webkitAnimationDelay = "";
                t.element.style.webkitAnimationDirection = "";
                t.element.style.webkitAnimationFillMode = "";
                t.element.style.webkitAnimationIterationCount = "";
                t.element.style.webkitAnimationPlayState = "";
                t.element.style.webkitAnimationTimingFunctions = "";
            }
            //Everything is done, run the callback function
            elem.off("animationstart webkitAnimationStart oanimationstart MSAnimationStart");
            elem.off("animationend webkitAnimationEnd oanimationend MSAnimationEnd");
            t.callback();
        },t.animation.afterDelay);


    });

    setTimeout(function(){

        //Set the given animation properties, thus running the CSS animation
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
            t.element.style.webkitAnimation = t.animation.animation;
        }
    },t.animation.beforeDelay);
}

Viento.prototype.burst = function(b) {

    var errors = false;

    if(b === undefined){
        return;
    }
    else {
        if(b.elements === undefined) {
            console.error("No elements were specified.");
            errors = true;
        }
        if(b.mode === undefined) {
            console.log("You didn't define a method to use. Doing all at once by default.");
            b.mode = "allAtOnce";
        }
        if(b.sortingMethod === undefined) {
            //This is ok, just use jQuery's default sorting
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

    if(b.mode === "allAtOnce") {
        for(var i = 0; i < b.elements.length; i++) {
            //console.log(b.elements[i]);
            Viento.prototype.fire({
                element: b.elements[i],
                animation: b.animation
            });
        }
    }
    if(b.mode === "oneAtATime") {

        if(b.sortingMethod === "topToBottom") {
            b.elements = b.elements.sort(Viento.prototype.sortElementsFromTopToBottom);
        }
        else if(b.sortingMethod === "bottomToTop") {
            b.elements = b.elements.sort(Viento.prototype.sortElementsFromBottomToTop);
        }
        else if(Viento.prototype.isFunction(b.sortingMethod) === true) {
            b.elements = b.elements.sort(b.sortingMethod);
        }

        var i = 0;
        function recursive(inc) {
            Viento.prototype.fire({
                element: b.elements[inc],
                animation: b.animation,
                callback: function(){
                    if(i < b.elements.length-1) {
                        i++;
                        recursive(i);
                    }
                }
            });

        }
        recursive(i);
    }

}

//Comparing function compatible with Array.prototype.sort()
Viento.prototype.sortElementsFromTopToBottom = function(a,b) {
    if(a.getBoundingClientRect().top < b.getBoundingClientRect().top) { //If a is higher up vertically than b
        return -1;
    }
    else if(a.getBoundingClientRect().top > b.getBoundingClientRect().top) { //If b is higher up vertically than a
        return 1;
    }
    else {
        if(a.getBoundingClientRect().left < b.getBoundingClientRect().left) { //If a is closer to the left horizontally than b
            return -1;
        }
        else if(a.getBoundingClientRect().left > b.getBoundingClientRect().left) { //If b is closer to the left horizontally than b
            return 1;
        }
        else {
            return 0;
        }
    }
}

Viento.prototype.sortElementsFromBottomToTop = function(a,b) {
    if(a.getBoundingClientRect().top < b.getBoundingClientRect().top) {
        return 1;
    }
    else if(a.getBoundingClientRect().top > b.getBoundingClientRect().top) {
        return -1;
    }
    else {
        if(a.getBoundingClientRect().left < b.getBoundingClientRect().left) {
            return -1;
        }
        else if(a.getBoundingClientRect().left > b.getBoundingClientRect().left) {
            return 1;
        }
        else {
            return 0;
        }
    }
}
