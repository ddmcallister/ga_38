var picClick = function(thumbnailCenter) {
	var goal = document.getElementById("mainImg");
	var startPos = document.getElementsByClassName("thumbnail");
	var i;
	for (i=0; i<startPos.length; i++) {	
		//startPos[i].style.opacity = 0.5;
		}

var k;
	var arrThumbnail = []
	for (var k = startPos.length; k--; arrThumbnail.push(startPos[k])); {
		goal.src = arrThumbnail[thumbnailCenter].src;
		arrThumbnail[thumbnailCenter].style.opacity = 0.5;

	}

	
	}
