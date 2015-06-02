//Viento CSS animation library by Austin Jackson

function Viento() {
    
    this.fire = function(t) {
        
        if(t.animation.type === "entrance") {
            t.element.addEventListener("animationstart",function(){
                t.element.style.visibility = "visible";
            });
        }
        
        t.element.style.animationName = t.animation.name;
        t.element.style.animationDuration = t.animation.duration;
        
        t.element.addEventListener("animationend",function(){
            t.callback();
        });
        
    }
    
}

//var e = document.getElementById("watchme");
//e.addEventListener("animationstart", listener);
//e.addEventListener("animationend", listener, false);
//e.addEventListener("animationiteration", listener, false);