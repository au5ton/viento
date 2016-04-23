viento
======

Fire and manage CSS animations on-the-fly. Tested to be compatible with [Animate.css](https://daneden.github.io/animate.css/).

[//]: # (WEB_CONTENT_START)

##Purpose
Viento provides a neat way to manage CSS animations and their properties, control flow, and timing. Also, "viento" means "wind" in Spanish, because this library makes CSS animations *a breeze*.

##Installation

With npm: `npm install viento --save`

Without npm: Download viento.js and put it whereever you'd like.

Note: viento.js is uncompressed

```javascript
//Make calls like this
Viento.fire();

```

##Dependencies
Viento.js requires jQuery because of its selectors, element manipulation, and event handling functionality (specifically [.off() and .on()](http://api.jquery.com/off/)). You probably already use this library anyway.

This library also requires that you have a `hidden` CSS class somewhere in your loaded CSS, in order to `entrance` or `exit` animations properly.

```css
.hidden {
    visibility: hidden;
}
```

##Usage
Viento.js provides a unique wrap to let you fire CSS animations. To learn how viento.js works internally, I try to keep it pretty well commented [over here](https://github.com/au5ton/viento/blob/gh-pages/dist/viento.js). Let's go over some basic usage. These examples contain animations from the [Animate.css](https://daneden.github.io/animate.css/) animation library.

###Viento.fire()

####Basic usage

```html
<div id="box"></div>

<script>

Viento.fire({
  element: $("#box")[0], //Provide A SINGLE element object, you could also use document.getElementById().
  animation: {
    //Supply any CSS animation related property
    name: "rubberBand", //`animation-name: rubberBand;` equivalent, provide what has @keyframe in front of it
    duration: "1s" //`animation-duration: 1s;` equivalent
  }
});

</script>
```

In the previous example, we import viento and use the global `fire()` function. The #box element will now run the given animation, and even clean up after itself (not shown in the example).


####Using the callback function

```html
<div id="box"></div>
<div id="circle"></div>

<script>

Viento.fire({
  element: $("#box")[0],
  animation: {
    name: "rubberBand",
    duration: "1s"
  },
  callback: function() {
    //Once the #box has finished animating, animate the #circle
    Viento.fire({
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

In the previous example, we apply the rubberBand animation to #box for 1 second, and upon completion of that animation, apply the rubberBand animation to the #circle for 2 seconds.


####Running animations simultaneously

```html
<div id="box"></div>
<div id="circle"></div>
<div id="triangle"></div>

<script>

Viento.fire({
  element: $("#box")[0],
  animation: {
    name: "rubberBand",
    duration: "1s"
  }
});

Viento.fire({
  element: $("#circle")[0],
  animation: {
    name: "rubberBand",
    duration: "1s"
  }
});

</script>
```

In the above example, #box and #circle both run the same animations for the same duration at the same time. _Viento.fire() is an **asynchronous** function._

####All other options

```javascript

Viento.fire({
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
  callback: function(){
    //Optional, code run immediately following the completion of the animation
  }
});

```

###Viento.burst()

Viento.fire() can only run animations on one element at a time, but selecting multiple elements, in libraries such as jQuery, returns an array. Passing an array into Viento.fire() will fail, as it's expecting only a single element. That is why the example code above has a `[0]` after the jQuery selector.

> v.fire({ element: **$("#foo")[0]**, animation: { ... }});

Using Viento.burst(), you can easily run the same animation on multiple elements.

```html
<div id="red" class="box"></div>
<div id="yellow" class="box"></div>
<div id="purple" class="box"></div>

<script>

Viento.burst({
  elements: $(".box"), //Required, specifies an array of elements that you want to act upon
  mode: "allAtOnce", //Optional, specifies if you want to fire the animations on the elements "allAtOnce" or "oneAtATime"
  sortingMethod: "topToBottom", //Optional, specifies which elements should be animated first. Pass an Array.sort() compatible function and use the objects as elements, or use some built-in ones with "topToBottom" or "bottomToTop"
  animation: { //Verbatim animation object from Viento.fire(), see above for details and arguments
    name: "rubberBand",
    duration: "1s"
  }
});

//#red, #yellow, and #purple all run the spinAround animation, simultaneously

</script>
```
