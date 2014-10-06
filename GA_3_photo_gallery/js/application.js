var picClick = function(thumbnailCenter) {
	var startPos = document.getElementsByClassName("thumbnail");
	var i;
	for (i=0; i<startPos.length; i++) {	
		startPos[i].style.opacity = 1;
		}
		var goal = document.getElementById("mainImg");
        // You should use relative URLs rather than absolute URLs
		goal.src = "img/" + thumbnailCenter + ".jpg";
		arrThumbnail[thumbnailCenter].style.opacity = 0.5;
	}

function forClick() {
        // You should use descriptive variable names rather than 'foo'
		var foo = document.getElementById('mainImg');
		var startPos = document.getElementsByClassName("thumbnail");
		var z;
		var arrThumbnail = []; // You forgot a closing semicolon
        // You already defined the variable z in line 16. You need to just define in it your for loop
		for (var z = startPos.length; z--; arrThumbnail.unshift(startPos[z])); {
			var i = foo.src;
            // Nice use of regular expressions
			var ba = i.replace(/^.*[\\\/]/, '');
			var r = ba.replace(".jpg", '');
			if(r == 23){
     				r = 0;
     				var img = document.getElementById('mainImg');
     				img.src = 'img/0.jpg';
     			}
			else {
					r++;
					newVar = "img/" + r + ".jpg";
					var img = document.getElementById('mainImg');
					img.src = newVar;}
     			}
	}

	function backClick() {
		var foo = document.getElementById('mainImg'); // You can condense a lot of your code. For example, foo and startPos can be global variables.
		var startPos = document.getElementsByClassName("thumbnail");
		var z;
		var arrThumbnail = []; // You forgot a closing semicolon
		for (var z = startPos.length; z--; arrThumbnail.unshift(startPos[z])); {
			var i = foo.src;
			var ba = i.replace(/^.*[\\\/]/, '');
			console.log(ba);
			var r = ba.replace(".jpg", '');
			console.log(r);
			if(r == 0){
     				r = 23;
     				var img = document.getElementById('mainImg');
     				img.src = 'img/23.jpg';
     			}
			else {
					r--;
					newVar = "img/" + r + ".jpg";
					var img = document.getElementById('mainImg');
					img.src = newVar;
				}
    }
}

