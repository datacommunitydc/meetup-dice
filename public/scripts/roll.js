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

	$('#links').on('click', '.btn', function speedHandler() {
		var element = $(this);

		element
			.toggleClass('active')
			.siblings()
			.removeClass('active');

		if (false === element.hasClass('active')) {
			dice.stopRoll();

			return;
		}

		var speed = element.index() + 1;

		dice.stopRoll();
		dice.set('speed', speed);
		dice.startRoll(speed);
	});
});
