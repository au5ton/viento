viento
======

Fire and manage CSS animations on-the-fly. Tested to be compatible with [Animate.css](https://daneden.github.io/animate.css/).

##Purpose
Viento provides a neat way to manage CSS animations and their properties, control flow, and timing. Also, "viento" means "wind" in Spanish, because this library makes CSS animations *a breeze*.

##Be forewarned
This is very much a prototype and *will* have bugs here and there.

##Installation
Download viento.js (uncompressed) and put it whereever you'd like.

```javascript
//Import Viento
var v = new Viento();

//Make calls like this
v.fire();
```

##Dependencies
Viento.js requires jQuery 1.0 and above because of its selectors, element manipulation, and event handling functionality. You probably already use this library anyway.

This library also requires that you have a `hidden` CSS class somewhere in your loaded CSS.

```css
.hidden {
    visibility: hidden;
}
```

##Usage
Viento.js provides a unique wrap to let you fire CSS animations. To learn how viento.js works internally, I try to keep it pretty well commented [over here](https://github.com/au5ton/viento/blob/gh-pages/viento.js). Let's go over some basic usage. **These examples contain animations from the [Animate.css](https://daneden.github.io/animate.css/) animation library.**

###Basic usage

```html
<div id="box"></div>

<script>
//Import viento.js
var v = new Viento();

v.fire({
  element: $("#box")[0], //Provide A SINGLE element object, you could also use document.getElementById(). 
  animation: {
    //Supply any CSS animation related property
    name: "rubberBand", //`animation-name: rubberBand;` equivalent
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

<script>
//Import viento.js
var v = new Viento();

//Spin the #box around for 1 second
v.fire({
  element: $("#box")[0],
  animation: {
    name: "rubberBand",
    duration: "1s"
  },
  callback: function f(){
    //Once the #box has finished spinning, flip over the #circle
    v.fire({
      element: $("#circle")[0],
      animation: {
        name: "rubberBand",
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

<script>
//Import viento.js
var v = new Viento();

v.fire({
  element: $("#box")[0],
  animation: {
    name: "rubberBand",
    duration: "1s"
  }
});

v.fire({
  element: $("#circle")[0],
  animation: {
    name: "rubberBand",
    duration: "1s"
  },
  callback: function(){
    v.fire({
      element: $("#triangle")[0],
      animation: {
        name: "rubberBand",
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
    type: "entrance", //Optional, used for animating entrances and exits of elements. Uses the "hidden" CSS class. Possible parameters: "entrance" or "exit".
    name: "rubberBand", //Required, CSS bind to the animation-name property.
    duration: "1s", //Required, CSS bind to the animation-duration property.
    delay: "2s", //Optional, CSS bind to the animation-delay property.
    direction: "alternate", //Optional, CSS bind to the animation-direction property.
    fillMode: "none", //Optional, CSS bind to the animation-fill-mode property.
    iterationCount: "0", //Optional, CSS bind to the animation-iteration-count property.
    playState: "running", //Optional, CSS bind to the animation-play-state property.
    timingFunctions: "ease" //Optional, CSS bind to the animation-timing-functions property.
    animation: "" //Optional, CSS bind to the animation property. If specified, it will overwrite the others
  },
  withAnimation: function(){
    //Optional, code run right before initiating the animation
  },
  callback: function(){
    //Optional, code run immediately following the completion of the animation
  }
});

```

###Viento.burst()

Viento can only run animations on one element at a time, but selecting multiple elements in libraries such as jQuery returns an array. Passing an array in to Viento.fire() will fail, as it's expecting only a single element. That is why the example code above has a `[0]` after the jQuery selector.

Using Viento.burst(), you can easily run the same animation on multiple elements.

```html
<div id="red" class="box"></div>
<div id="yellow" class="box"></div>
<div id="purple" class="box"></div>

<script>

v.burst({
  elements: $(".box"),
  method: "allAtOnce", //Currently the only supported method. Chooses this by default.
  animation: { //Verbatim animation object from Viento.fire()
    name: "rubberBand",
    duration: "1s"
  }
});

//#red, #yellow, and #purple all run the spinAround animation, simultaneously

</script>
```
