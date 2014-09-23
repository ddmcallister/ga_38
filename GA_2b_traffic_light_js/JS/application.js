function buttonClick(lightOn) {

var lightsOff = document.getElementsByClassName("lights");
	var i;
	for (i = 0; i<lightsOff.length; i++) {
		lightsOff[i].style.backgroundColor = "dimgray";
	}

	var k;
	var arrLights = [];
    for(var k = lightsOff.length; k--; arrLights.unshift(lightsOff[k])); {
    	if (arrLights[0].id.toLowerCase(0) == lightOn) {
    	arrLights[0].style.backgroundColor = lightOn;
    } else if (arrLights[1].id.toLowerCase(1) == lightOn) {
    	arrLights[1].style.backgroundColor = lightOn;
    }	else {
    	arrLights[2].style.backgroundColor = lightOn;
    }
    }
}
