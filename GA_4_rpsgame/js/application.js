var plRock = function() {
	var i = 0;
	i = Math.floor(Math.random() * 10);
	if(i==0) {
		var x = Math.floor(Math.random() * 10);
		i = x;
	}

	if(i<=3) {
		var tieResponse = confirm("Tie! Record your score?");
			if (tieResponse === true) {
  				document.getElementById("tieCount").innerHTML=
  				parseInt(document.getElementById("tieCount").innerHTML,10)+1;
			}
	} else if(i<=6) {
		var loseResponse = confirm("You lose! Record your score?");
			if (loseResponse === true) {
  				document.getElementById("loseCount").innerHTML=
  				parseInt(document.getElementById("loseCount").innerHTML,10)+1;
			}
	} else if(i<=9) {
		var winResponse = confirm("You win! Record your score?");
			if (winResponse ===true) {
  				document.getElementById("winCount").innerHTML=
  				parseInt(document.getElementById("winCount").innerHTML,10)+1;
			}
		}
	}

var plPaper = function(paper) {
	var i = 0;
	i = Math.floor(Math.random() * 10);
	if(i==0) {
		var x = Math.floor(Math.random() * 10);
		i = x;
	}

	if(i<=3) {
		var winResponse = confirm("You win! Record your score?");
		if (winResponse === true) {
  				document.getElementById("winCount").innerHTML=
  				parseInt(document.getElementById("winCount").innerHTML,10)+1;
			}
	} else if(i<=6) {
		var tieResponse = confirm("Tie! Record your score?");
		if (tieResponse === true) {
  				document.getElementById("tieCount").innerHTML=
  				parseInt(document.getElementById("tieCount").innerHTML,10)+1;
			}
	} else if(i<=9) {
		var loseResponse = confirm("You lose! Record your score?");
		if (loseResponse === true) {
  				document.getElementById("loseCount").innerHTML=
  				parseInt(document.getElementById("loseCount").innerHTML,10)+1;
			}
	}
}

var plScissors = function(scissors) {
	var i = 0;
	i = Math.floor(Math.random() * 10);
	if(i==0) {
		var x = Math.floor(Math.random() * 10);
		i = x;
	}
	if(i<=3) {
		var loseResponse = confirm("You lose! Record your score?");
		if (loseResponse ===true) {
  				document.getElementById("loseCount").innerHTML=
  				parseInt(document.getElementById("loseCount").innerHTML,10)+1;
			}
	} else if(i<=6) {
		var winResponse = confirm("You win! Record your score?");
		if (winResponse ===true) {
  				document.getElementById("winCount").innerHTML=
  				parseInt(document.getElementById("winCount").innerHTML,10)+1;
			}
	} else if(i<=9) {
		var tieResponse = confirm("Tie! Record your score?");
		if (tieResponse ===true) {
  				document.getElementById("tieCount").innerHTML=
  				parseInt(document.getElementById("tieCount").innerHTML,10)+1;
			}
	}
}

//here begins kitten mode

var kittenMode = function() {
	var plRock = 0;
	var plpaper = 0;
	var plScissors = 0;

	document.getElementById("kitten_button").style.opacity = 1;

	$(document).ready(function(){
		console.log(plRock);
	});

	$(document).keydown(function(event) {
		var i = 0;
		var z=0;

    	var code = (event.keyCode || event.which);
    	if(code == 13) {
        return;
    	}

		i = Math.floor(Math.random() * 10);
		if(i==0) {
			var x = Math.floor(Math.random() * 10);
			i = x;	
		}
		var plRandomChoice = i;

		z = Math.floor(Math.random() * 10);
		if(z==0) {
		var y = Math.floor(Math.random() * 10);
		z = y;
		}
		var compChoice = z;

		var scoreCompare = function() {	

			if (plRandomChoice>compChoice) {

				var winResponse = confirm("You win! Record your score?");
				if (winResponse ===true) {
  					document.getElementById("winCount").innerHTML=
  					parseInt(document.getElementById("winCount").innerHTML,10)+1;
				}
		}
		else if (plRandomChoice===compChoice) {
			var tieResponse = confirm("Tie! Record your score?");
				if (tieResponse ===true) {
  					document.getElementById("tieCount").innerHTML=
  					parseInt(document.getElementById("tieCount").innerHTML,10)+1;
				} 
		}
		else if (plRandomChoice<compChoice) {
			var loseResponse = confirm("You lose! Record your score?");
				if (loseResponse ===true) {
  					document.getElementById("loseCount").innerHTML=
  					parseInt(document.getElementById("loseCount").innerHTML,10)+1;
				}
		}
	}	

scoreCompare();

});

}

var zeroScore = function() {
	document.getElementById("loseCount").innerHTML=0;
	document.getElementById("tieCount").innerHTML=0;
	document.getElementById("winCount").innerHTML=0;
}

