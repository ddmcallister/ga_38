// I adjusted your indentations a bit. Indenting is particularly helpful in Javascript 
// (and other programming languages) because it allows your eyes to scan the code quickly.
function buttonClick(lightOn) {

    var lightsOff = document.getElementsByClassName("lights");
    var i;
    for (i = 0; i<lightsOff.length; i++) {
        lightsOff[i].style.backgroundColor = "dimgray";
    }

    // var k;
    var arrLights = [];
    // You're redefining the same variable "k" in your for loop. It looks like it's not being used in line 9, so I commented it out
    for(var k = lightsOff.length; k--; arrLights.push(lightsOff[k])); {
        //I found the above way to change a nodeList to an array, but it used unshift instead 
        //of push, not sure I get the difference
        if (arrLights[0].id.toLowerCase(0) == lightOn) {
            arrLights[0].style.backgroundColor = lightOn;
        } else if (arrLights[1].id.toLowerCase(1) == lightOn) {
            arrLights[1].style.backgroundColor = lightOn;
        }	else {
            arrLights[2].style.backgroundColor = lightOn;
        }
    }

}
