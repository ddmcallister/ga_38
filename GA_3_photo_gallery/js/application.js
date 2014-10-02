var picClick = function(thumbnailCenter) {
	var startPos = document.getElementsByClassName("thumbnail");
	var i;
	for (i=0; i<startPos.length; i++) {	
		startPos[i].style.opacity = 1;
		}
		var goal = document.getElementById("mainImg");
		goal.src = "///Users/Destanie/Desktop/GA/GA_3_photo_gallery/img/" + thumbnailCenter + ".jpg";
		arrThumbnail[thumbnailCenter].style.opacity = 0.5;
	}

function forClick() {
		var foo = document.getElementById('mainImg');
		var startPos = document.getElementsByClassName("thumbnail");
		var z;
		var arrThumbnail = []
		for (var z = startPos.length; z--; arrThumbnail.unshift(startPos[z])); {
			var i = foo.src;
			var ba = i.replace(/^.*[\\\/]/, '');
			var r = ba.replace(".jpg", '');
			if(r == 23){
     				r = 0;
     				var img = document.getElementById('mainImg');
     				img.src = '///Users/Destanie/Desktop/GA/GA_3_photo_gallery/img/0.jpg';
     			}
			else {
					r++;
					newVar = "///Users/Destanie/Desktop/GA/GA_3_photo_gallery/img/" + r + ".jpg";
					var img = document.getElementById('mainImg');
					img.src = newVar;}
     			}
	}

	function backClick() {
		var foo = document.getElementById('mainImg');
		var startPos = document.getElementsByClassName("thumbnail");
		var z;
		var arrThumbnail = []
		for (var z = startPos.length; z--; arrThumbnail.unshift(startPos[z])); {
			var i = foo.src;
			var ba = i.replace(/^.*[\\\/]/, '');
			console.log(ba);
			var r = ba.replace(".jpg", '');
			console.log(r);
			if(r == 0){
     				r = 23;
     				var img = document.getElementById('mainImg');
     				img.src = '///Users/Destanie/Desktop/GA/GA_3_photo_gallery/img/23.jpg';
     			}
			else {
					r--;
					newVar = "///Users/Destanie/Desktop/GA/GA_3_photo_gallery/img/" + r + ".jpg";
					var img = document.getElementById('mainImg');
					img.src = newVar;
				}
    }
}

