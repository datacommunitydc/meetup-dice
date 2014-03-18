$(function rollDocReady(){
	// Instance of dice
	var dice = new DiceClass();

	$('#winner').on('click', '.winner__wrapper', function rollDiceHandler() {
		var rolling = dice.get('rolling');

		if (rolling) {
			dice.stopRoll();
		} else {
			dice.startRoll();
		} 
	});
});
