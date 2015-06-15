/*

Viento CSS animation library by Austin Jackson
http://austinj.net/viento

Please star me on github, I would super duper love it
https://github.com/au5ton/viento


*/

function Viento() {
    //Viento constructor
    //Empty because Viento should be used statically
}


//Number of times the fire() function has been called
Viento.prototype.callInteration = 0;

//Thanks: http://stackoverflow.com/questions/5999998/how-can-i-check-if-a-javascript-variable-is-function-type
Viento.prototype.isFunction = function(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

Viento.prototype.fire = function(t) {
    console.log("call iteration: "+Viento.prototype.callInteration);
    Viento.prototype.callInteration++;
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
        return; //If there is an error, stop the execution immediately 
    }

    //If this is an entrance animation, wait for the animation to start to reveal the element
    if(t.animation.type === "entrance") {
        elem.on("animationstart webkitAnimationStart oanimationstart MSAnimationStart",function(){
            event.target.style.visibility = "visible";
        });
    }
    //When the animation ends... (this code isn't run immediately, the interpreter skips to what is after it
    elem.on("animationend webkitAnimationEnd oanimationend MSAnimationEnd",function(){

        //Uses setTimeout so we can use "afterDelay"
        setTimeout(function(){
            //If this is an exit animation, hide the element
            if(t.animation.type === "exit") {
                t.element.style.visibility = "hidden";
            }
            //If resetAfter is enabled (it is by default), reset the CSS animation properties and involved classes
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

    //After the listeners are set for the end of the animation, let's start the animation
    //Uses setTimeout so we can use "beforeDelay"
    setTimeout(function(){

        //Set the given animation properties, thus running the CSS animation (the actual code that starts the animation)
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

//Viento.burst() let's you fire animations on a group of elements in one function call
Viento.prototype.burst = function(b) {

    var errors = false;

    //If these are undefined, set a default value to stop errors
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
            return;
        }
    }

    //If we're animating them all at once, we can use a simple array to loop through all the elements because Viento.fire() is asynchronous
    //Thus, they run "allAtOnce"
    //Easy peasy
    if(b.mode === "allAtOnce") {
        for(var i = 0; i < b.elements.length; i++) {
            Viento.prototype.fire({
                element: b.elements[i],
                animation: b.animation
            });
        }
    }
    //If we're animating them one at a time, this is a little tricky. More on that in a sec.
    if(b.mode === "oneAtATime") {

        //b.elements is an Array, allowing access to the native JS function Array.sort()
        //Viento.prototype.sortXYZ are functions that get the properties of the elements and determine the order of the elements so when burst()...
        //...if fired, the elements animate from topToBottom, or in other ways. Developers can write their own, as well.
        if(b.sortingMethod === "topToBottom") {
            b.elements = b.elements.sort(Viento.prototype.sortElementsFromTopToBottom);
        }
        else if(b.sortingMethod === "bottomToTop") {
            b.elements = b.elements.sort(Viento.prototype.sortElementsFromBottomToTop);
        }
        else if(Viento.prototype.isFunction(b.sortingMethod) === true) {
            b.elements = b.elements.sort(b.sortingMethod);
        }
        
        /*
        Here's the tricky part. I actually opened up an issue for this on Github and reached out to friends for support.
        I hope you learn something, because I sure did:
        https://github.com/au5ton/viento/issues/6
        
        
        Now, what I wanted to do was use the callback function in Viento.fire() to tell it to go to the next loop.
        I tried something like this:
        
        ```
            var ready = false;
            for(var i = 0; i < b.elements.length; i++) {
                ready = false;
                while(ready === false) {
                    Viento.prototype.fire({
                        element: b.elements[i],
                        animation: b.animation,
                        callback: function() {
                            ready = true;
                        }
                    });
                }
            }
        ```    
            
        Now, unfortunately for me, this didn't work. Due to JavaScript's nature of asynchronous actions and scoping, ...
        ...this resulted in an infinite loop and froze every tab I tried modifications of it on.
        
        Thankfully, @tarunbod knew exactly what to do. Instead of using the index variable i from the loop, he made `i`
        a higher-up variable accessible from the function, and made it recursive! That way, the function can call itself, 
        and continute to iterate through the array.
        */

        //Index starts at 0
        var i = 0;
        //Recursive function
        function recursive() {
            //Runs the animation for the given index (at first, 0)
            Viento.prototype.fire({
                element: b.elements[inc],
                animation: b.animation,
                callback: function(){
                    //Once the animation has finished,
                    //If we should continue, increment `i` and call itself again
                    if(i < b.elements.length-1) {
                        i++;
                        recursive();
                    }
                    //If we don't "call itself again", then the endless loop ends, and goes to where it says ENDS UP HERE.
                }
            });

        }
        //Calls the function for the first time
        recursive();
        //ENDS UP HERE
        
        //Your burst is finished
    }

}

//Comparing function compatible with Array.prototype.sort()
Viento.prototype.sortElementsFromTopToBottom = function(a,b) {
    if(a.getBoundingClientRect().top < b.getBoundingClientRect().top) { //If a is higher up vertically than b
        return -1; //Return a
    }
    else if(a.getBoundingClientRect().top > b.getBoundingClientRect().top) { //If b is higher up vertically than a
        return 1; //Return b
    }
    else {
        if(a.getBoundingClientRect().left < b.getBoundingClientRect().left) { //If a is closer to the left horizontally than b
            return -1; //Return a
        }
        else if(a.getBoundingClientRect().left > b.getBoundingClientRect().left) { //If b is closer to the left horizontally than b
            return 1; //Return b
        }
        else {
            return 0; //Return equal, or no preference
        }
    }
}

Viento.prototype.sortElementsFromBottomToTop = function(a,b) {
    if(a.getBoundingClientRect().top < b.getBoundingClientRect().top) { //If a is higher up vertically than b
        return 1; //Return b
    }
    else if(a.getBoundingClientRect().top > b.getBoundingClientRect().top) { //If b is higher up vertically than a
        return -1; //Return a
    }
    else {
        if(a.getBoundingClientRect().left < b.getBoundingClientRect().left) { //If a is closer to the left horizontally than b
            return -1; //Return a
        }
        else if(a.getBoundingClientRect().left > b.getBoundingClientRect().left) { //If b is closer to the left horizontally than b
            return 1; //Return b
        }
        else {
            return 0; //Return equal, or no preference
        }
    }
}
