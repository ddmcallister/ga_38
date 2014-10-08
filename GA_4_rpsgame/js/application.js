var num = 0;
function randomNum() {
	num = Math.floor(Math.random() * 10);
	if(num==0) {
		var ridZero = Math.floor(Math.random() * 10);
		num = ridZero;
	}
}

//I had talked to Zachary about just adding one instead
//of the second function in the random number generator
//above, but I wanted a number range divisible by 3

var compChoice = 0;
function compPick() {
	randomNum();
	numTranslate();
	compChoice = num;
	return compChoice;
}

function numTranslate() {
	if(num > 0 && num < 4) {
		num = "rock";
	} else if (num > 3 && num < 7) {
		num = "paper"; 
	} else if (num > 6 && num <10) {
		num = "scissors";
	}
}

var plChoice = 0;
var notice = 0;
var userWins = ["paperrock", "rockscissors", "scissorspaper"];

var scoreCompare = function() {
    var newPlChoice = plChoice + compChoice;
    notice = "newLose";
	if (plChoice == compChoice) {
		notice = "newTie";
		} else {
			$.each(userWins, function(index, value) {
				if(newPlChoice == value) {
				notice = "newWin";
				}	
			});
		}
	if(notice == "newWin") {
		winConfirm();
	} else if (notice == "newLose") {
		loseConfirm();
	} else {
		tieConfirm();
	}
}

function plRock() {
	plChoice = "rock";
	compPick();
	scoreCompare();
}

function plPaper() {
	plChoice = "paper";
	compPick();
	scoreCompare();
};

function plScissors() {
	plChoice = "scissors";
	compPick();
	scoreCompare();
};

//kitten mode
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
    	//above takes return out of the "any button"
    	//group so you can hit return on confirm

    	randomNum();
    	numTranslate();
		plChoice = num;

		compPick();

		var newPlChoice = plChoice + compChoice;

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

//score reset
var zeroScore = function() {
	document.getElementById("loseCount").innerHTML=0;
	document.getElementById("tieCount").innerHTML=0;
	document.getElementById("winCount").innerHTML=0;
}