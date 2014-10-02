var picClick = function(thumbnailCenter) {
	var startPos = document.getElementsByClassName("thumbnail");
	var i;
	for (i=0; i<startPos.length; i++) {	
		startPos[i].style.opacity = 1;
		}
	var k;
	var arrThumbnail = []
	for (var k = startPos.length; k--; arrThumbnail.unshift(startPos[k])); {
		var goal = document.getElementById("mainImg");
		goal.src = arrThumbnail[thumbnailCenter].src;
		arrThumbnail[thumbnailCenter].style.opacity = 0.5;
	}
}

var currentImage = 0;

function forClick(target) {
	var startPos = document.getElementsByClassName("thumbnail");
	var z;
	var arrThumbnail = []
	for (var z = startPos.length; z--; arrThumbnail.unshift(startPos[z])); {
		if(currentImage == arrThumbnail.length--){
     		currentImage = 0;
            document.getElementById("mainImg").src = arrThumbnail[currentImage].src;
        } else {
            currentImage ++;
            document.getElementById("mainImg").src = arrThumbnail[currentImage].src;
        }
    }
}

function backClick() {
	var startPos = document.getElementsByClassName("thumbnail");
	var q;
	var arrThumbnail = []
	for (var q = startPos.length; q--; arrThumbnail.unshift(startPos[q])); {
		if(currentImage == 0) {
     		currentImage = arrThumbnail.length;
            document.getElementById("mainImg").src = arrThumbnail[currentImage].src;
        } else {
            currentImage--;
            document.getElementById("mainImg").src = arrThumbnail[currentImage].src;
        }
    }
}