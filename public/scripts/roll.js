$(function rollDocReady(){
	// Instance of dice
	var dice = new DiceClass();
	var links = $('#links');

	function setSelectedSpeed() {
		var index = dice.get('speed') - 1;
		var btn = links.find('.btn').eq(index);

		btn.trigger('click.dice');
	}

	$('#winner').on('click.dice', '.winner__wrapper', function rollDiceHandler() {
		setSelectedSpeed();
	});

	links.on('click.dice', '.btn', function speedHandler() {
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
		
		dice.set('speed', speed);

		dice.stopRoll();
		dice.startRoll();
	});
});
