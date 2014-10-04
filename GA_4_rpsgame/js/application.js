var i = Math.floor(Math.random() * 10);
if(i==0) {
	var x = Math.floor(Math.random() * 10);
	i = x;
}
console.log(i);

/*var compChoice = function() {
	if (i<=3) {
		compChoice = "rock";
	} else if (i<=6) {
		compChoice = "paper";
	} else if (i<=9) {
		compChoice = "scissors";
	}
}*/

var plRock = function(rock) {
	if(i<=3) {
		var tieResponse = prompt("Tie! Would you like to record your score?");
			if (tieResponse == "yes") {
  				document.getElementById("tieCount").innerHTML=
  				parseInt(document.getElementById("tieCount").innerHTML,10)+1;
			}
	} else if(i<=6) {
		var loseResponse = prompt("Sorry, you lose! Would you like to record your score?");
			if (loseResponse == "yes") {
  				document.getElementById("loseCount").innerHTML=
  				parseInt(document.getElementById("loseCount").innerHTML,10)+1;
			}
	} else if(i<=9) {
		var winResponse = prompt("You win! Would you like to record your score?");
			if (winResponse == "yes") {
  				document.getElementById("winCount").innerHTML=
  				parseInt(document.getElementById("winCount").innerHTML,10)+1;
			}
	}
	}

var plPaper = function(rock) {
	if(i<=3) {
		prompt("You win! Would you like to record your score?");
	} else if(i<=6) {
		prompt("Tie! Would you like to record your score?");
	} else if(i<=9) {
		prompt("Sorry, you lose! Would you like to record your score?");
	}
}

var plScissors = function(rock) {
	if(i<=3) {
		prompt("Sorry, you lose! Would you like to record your score?");
	} else if(i<=6) {
		prompt("You win! Would you like to record your score?");
	} else if(i<=9) {
		prompt("Tie! Would you like to record your score?");
	}
}

