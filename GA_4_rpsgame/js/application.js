//need to get everything to refresh

var num = 0;
function randomNum() {
	num = Math.floor(Math.random() * 10);
	if(num==0) {
		var notZero = Math.floor(Math.random() * 10);
		num = notZero;
	}
}

randomNum();
var computer = num;

function plRock() { 
	if (computer <= 3) {
		tieConfirm();
	} else if(computer <= 6) {
		loseConfirm();
	} else if (computer <= 9) {
		winConfirm();
		}
	}

function plPaper() {
	if(computer < 4) {
		winConfirm();
	} else if(computer < 7) {
		tieConfirm();
	} else if(computer < 10) {
		loseConfirm();
	}
}

function plScissors() {
	if (computer < 4) {
		loseConfirm();
	} else if (computer < 7) {
		winConfirm();
	} else if (computer < 10) {
		tieConfirm();
	}
}

//here begins kitten mode
var kittenMode = function() {

	document.getElementById("kitten_button").style.opacity = 1;

	$(document).ready(function(){
	});

	$(document).keydown(function(event) {
		kittenMode = 0;

    	var code = (event.keyCode || event.which);
    	if(code == 13) {
        	event.preventDefault();
    	}

    	randomNum();
    	numTranslate();
		var plRandomChoice = num;

    	randomNum();
    	numTranslate();
		var compChoice = num;

		console.log(plRandomChoice);
		console.log(compChoice);

		function numTranslate() {
			if(num > 0 && num < 4) {
				num = "rock";
			} else if (num > 3 && num < 7) {
				num = "paper"; 
			} else if (num > 6 && num <10) {
				num = "scissors";
			}
		}
		console.log(plRandomChoice);
		console.log(compChoice);

	userWins = ["paperrock", "rockscissors", "scissorspaper"];
	var newPlChoice = plRandomChoice + compChoice;
	var scoreCompare = function() {	
			var notice;
			if (plRandomChoice == compChoice) {
				notice = tieConfirm();
			} else if (
				$.each(userWins, function(index, value) {
					if(newPlChoice == value) {
						console.log(newPlChoice);
					}	
					})) {
					notice = winConfirm	
			} else {
					notice = loseConfirm;
				}
			return notice;
	}
scoreCompare();
});
}

function winConfirm() {
	var winResponse = confirm("You win! Record your score?");
	if (winResponse === true) {	
  		document.getElementById("winCount").innerHTML=
  		parseInt(document.getElementById("winCount").innerHTML,10)+1;
	} 
}

function loseConfirm() {
	var loseResponse = confirm("You lose! Record your score?");
	if (loseResponse === true) {
  		document.getElementById("loseCount").innerHTML=
  		parseInt(document.getElementById("loseCount").innerHTML,10)+1;
	}
}

function tieConfirm() {
	var tieResponse = confirm("Tie! Record your score?");
	if (tieResponse === true) {
  		document.getElementById("tieCount").innerHTML=
  		parseInt(document.getElementById("tieCount").innerHTML,10)+1;
  	}
}

var zeroScore = function() {
	document.getElementById("loseCount").innerHTML=0;
	document.getElementById("tieCount").innerHTML=0;
	document.getElementById("winCount").innerHTML=0;
}

