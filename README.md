viento
======

Fire and manage custom high-performance CSS animations on-the-fly.

##Purpose
This repo serves two purposes: provide some basic high-performance CSS animations, free for you to use any way you like, and a neat way to manage their properties, control flow, and timing.

You can find the CSS animations in [viento.css](https://github.com/au5ton/viento/blob/gh-pages/viento.css).
You can find the Viento JavaScript framework in [viento.js](https://github.com/au5ton/viento/blob/gh-pages/viento.js).

##Installation
Download viento.js or viento.css and use how you'd like.

##Dependencies
Viento.js requires jQuery 1.0 and above.

##Usage
I'm not here to tell you how to use `viento.css`, so I will explain how to use `viento.js`.

Viento.js provides a unique wrap to let you fire CSS animations. To learn how viento.js works, I try to keep it pretty well commented [over here](https://github.com/au5ton/viento/blob/gh-pages/viento.js). Let's go over some basic usage. **These examples currently don't contain existing animations (spinAround and flipOver aren't actual animations).**

###Basic usage

```html
<div id="box"></div>
...
<script src="js/viento.js"></script>
<script>
//Import viento.js
var v = new Viento();

v.fire({
  element: $("#box")[0], //Provide A SINGLE element object, you could also use document.getElementById(). 
  animation: {
    //Supply any CSS animation related property
    name: "spinAround", //`animation-name: spinAround;` equivalent
    duration: "1s" //`animation-duration: 1s;` equivalent
  }
});

</script>
```

In the previous example, we import viento and use the global `fire()` function. The #box element will now run the given animation, and even clean up after itself (not shown in the example).


###Using the callback function

```html
<div id="box"></div>
<div id="circle"></div>
...
<script src="js/viento.js"></script>
<script>
//Import viento.js
var v = new Viento();

//Spin the #box around for 1 second
v.fire({
  element: $("#box")[0],
  animation: {
    name: "spinAround",
    duration: "1s"
  },
  callback: function f(){
    //Once the #box has finished spinning, flip over the #circle
    v.fire({
      element: $("#circle")[0],
      animation: {
        name: "flipOver",
        duration: "2s"
      }
    });
  }
});

</script>
```

In the previous example, we spin the #box around for 1 second, and upon completion of that animation, flip over the #circle.


###Running animations simultaneously 

```html
<div id="box"></div>
<div id="circle"></div>
<div id="triangle"></div>
...
<script src="js/viento.js"></script>
<script>
//Import viento.js
var v = new Viento();

v.fire({
  element: $("#box")[0],
  animation: {
    name: "spinAround",
    duration: "1s"
  }
});

v.fire({
  element: $("#circle")[0],
  animation: {
    name: "spinAround",
    duration: "1s"
  },
  callback: function(){
    v.fire({
      element: $("#triangle")[0],
      animation: {
        name: "flipOver",
        duration: "1s"
      }
    });
  }
});

</script>
```

In the above example, #box and #circle both run the same animations for the same duration at the same time. In addition, once #circle has finised animating, #triangle will be animated.

###All other options

```javascript

var v = new Viento();

v.fire({
  element: $("#foo")[0], //Required, the single element you will be animating.
  animation: {
    beforeDelay: 1000, //Optional, milliseconds delay before the animation begins
    afterDelay: 2000, //Optional, milliseconds delay after the animation ends
    name: "bar", //Required, CSS bind to the animation-name property.
    duration: "1s", //Required, CSS bind to the animation-duration property.
    delay: "2s", //Optional, CSS bind to the animation-delay property.
    direction: "alternate", //Optional, CSS bind to the animation-direction property.
    fillMode: "none", //Optional, CSS bind to the animation-fill-mode property.
    iterationCount: "0", //Optional, CSS bind to the animation-iteration-count property.
    playState: "running", //Optional, CSS bind to the animation-play-state property.
    timingFunctions: "ease" //Optional, CSS bind to the animation-timing-functions property.
    animation: "" //Optional, CSS bind to the animation property. If specified, it will overwrite the others.
  },
  withAnimation: function(){
    //Optional, code run right before initiating the animation
  },
  callback: function(){
    //Optional, code run immediately following the completion of the animation
  }
});

```
