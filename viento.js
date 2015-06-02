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

    if(t.animation.type === "entrance") {
        t.element.addEventListener("animationstart",function(){
            t.element.style.visibility = "visible";
        });
    }


    setTimeout(
        function(){

            t.element.style.animationName = t.animation.name;
            t.element.style.animationDuration = t.animation.duration;

            setTimeout(
                function(){
   
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
                },
                t.animation.afterDelay
            );



        },
        t.animation.beforeDelay
    );



}

//var e = document.getElementById("watchme");
//e.addEventListener("animationstart", listener);
//e.addEventListener("animationend", listener, false);
//e.addEventListener("animationiteration", listener, false);