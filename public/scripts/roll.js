$(function rollDocReady(){
	var scope = $(document);
	var links = scope.find('#links');
	// Instance of dice
	var dice = new DiceClass();

	function setSelectedSpeed() {
		var index = dice.get('speed') - 1;
		var btn = links.find('.control__speed .btn').eq(index);

		btn.trigger('click.dice');
	}

	function speedEventHandler(event, target) {
		var element = $(target);

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
	}

	// Register handlers
	scope.on({
		setSelectedSpeed: setSelectedSpeed,
		speedEventHandler: speedEventHandler
	});

	scope.on('keydown.dice', function keyEventHandler(e) {
		switch (e.keyCode) {
			case 32:
			e.preventDefault();
			scope.trigger('setSelectedSpeed');
			break;
		}
	});

	scope.find('#winner').on('click.dice', '.winner__wrapper', function winnerDiceRollEventHandler() {
		scope.trigger('setSelectedSpeed');
	});

	links.on('click.dice', '.control__main .btn', function mainControlEventHandler() {
		scope.trigger('setSelectedSpeed');
	});

	links.on('click.dice', '.control__speed .btn', function speedControlEventHandler() {
		scope.trigger('speedEventHandler', [this]);
	});
});
