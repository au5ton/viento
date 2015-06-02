//Viento CSS animation library by Austin Jackson

function Viento() {
    //
}

Viento.prototype.fire = function(t) {

    if(t.animation.type === "entrance") {
        t.element.addEventListener("animationstart",function(){
            t.element.style.visibility = "visible";
        });
    }

    t.element.style.animationName = t.animation.name;
    t.element.style.animationDuration = t.animation.duration;
    
    t.element.addEventListener("animationend",function(){
        try {
            if(t.animation.type === "exit") {
                t.element.style.visibility = "hidden";
            }
            t.callback();
        }
        catch(err){
        }
    });

}

//var e = document.getElementById("watchme");
//e.addEventListener("animationstart", listener);
//e.addEventListener("animationend", listener, false);
//e.addEventListener("animationiteration", listener, false);