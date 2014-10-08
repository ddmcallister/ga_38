var num = 0;
function randomNum() {
	num = Math.floor(Math.random() * 10);
	if(num==0) {
		var notZero = Math.floor(Math.random() * 10);
		num = notZero;
	}
}

function plRock() {
	randomNum();
	computer = num;
	console.log(num);
	if (computer <= 3) {
		tieConfirm();
	} else if(computer <= 6) {
		loseConfirm();
	} else if (computer <= 9) {
		winConfirm();
		}
	}

var plPaper = function() {
	randomNum();
	computer = num;
	if(computer <= 3) {
		winConfirm();
	} else if(computer <= 6) {
		tieConfirm();
	} else if(computer <= 9) {
		loseConfirm();
	}
}

var plScissors = function() {
	randomNum();
	computer = num;
	console.log(computer);
	if (computer <= 3) {
		loseConfirm();
	} else if (computer <= 6) {
		winConfirm();
	} else if (computer <= 9) {
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
        	event.preventDefault();;
    	}

    	randomNum();
		var plRandomChoice = num;

    	randomNum();
		var compChoice = num;

		console.log(plRandomChoice);
		console.log(compChoice);

		var scoreCompare = function() {	
			if (plRandomChoice > compChoice) {
				winConfirm();
			} else if (plRandomChoice < compChoice) {	
				loseConfirm();

			} else if (plRandomChoice<=3 && compChoice<=3) {
				tieConfirm();
				return tieConfirm;
			} else if (plRandomChoice<=6 && compChoice<=6) {
				tieConfirm();
				return tieConfirm;
			} else if (plRandomChoice <=9 && compChoice<=9) {
				tieConfirm();
				return tieConfirm;
			}
			//else if (plRandomChoice > compChoice) {
				//winConfirm();
			//} else if (plRandomChoice < compChoice) {	
				//loseConfirm();
			//}
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
