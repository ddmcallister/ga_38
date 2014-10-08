var userChoice = "rock";
var computerChoice = "paper";
var winner;

/*var Outcomes = ["rockpaper", "rockscissors", "paperrock", 
"paperscissors", "scissorspaper", "scissorsrock"]*/

var userWins = ["paperrock", "rockscissors", "scissorspaper"];

//var computerOutcomes = ["rockpaper", "paperscissors", "scissorsrock"];
//don't need above because computer winning is the only possible outcome if winner loses

function evaluate() {
	var msg = 'computer wins';

	if(userChoice==computerChoice) {
		msg = 'tie';
	} else {

		var outCome = userChoice + computerChoice;
//above is a shorter version of varOutcomes, above

	$.each(userWins, function(index, value){
		if(outCome==value) {
			msg = "you win";
		}
	});

	}
	return msg;
}
alert(evaluate());