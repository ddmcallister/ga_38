function buttonClick(lightOn) {

var lightsOff = document.getElementsByClassName("lights");
	var i;
	for (i = 0; i<lightsOff.length; i++) {
		lightsOff[i].style.backgroundColor = "dimgray";
	}

	var k;
	var arrLights = [];
    for(var k = lightsOff.length; k--; arrLights.unshift(lightsOff[k])); {
    }

var lightOn = document.getElementsByTagName("button");
	var j;
    var arrButtons = [];
    for(var j = lightOn.length; j--; arrButtons.unshift(lightOn[j])); {
	}

var oneLight;
	if (arrLights[0].id.toLowerCase() == lightOn) {
    		arrLights[0].style.backgroundColor = lightOn;
    }

	
console.log(arrLights);
console.log(arrButtons);
}
