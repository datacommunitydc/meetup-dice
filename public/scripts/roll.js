$(function rollDocReady(){
	var scope = $(document);
	var links = scope.find('#links');
	var speedControl = links.find('.control__speed .btn');
	// Instance of dice
	var dice = new DiceClass();

	function setSelectedSpeed() {
		var index = dice.get('speed') - 1;
		var btn = speedControl.eq(index);

		btn.trigger('click.dice');
	}

	function selectSpeedEventHandler(event, index) {
		speedControl
			.eq(index)
			.trigger('click.dice');
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
		
		dice.startRoll();
	}

	// Register handlers
	scope.on({
		setSelectedSpeed: setSelectedSpeed,
		speedEventHandler: speedEventHandler,
		selectSpeedEventHandler: selectSpeedEventHandler
	});

	function getKey(keyCode) {
		var name;
		var meta = {};

		if (keyCode > 48 && keyCode < 54) {
			name = 'numeric';
			meta.index = keyCode - 49;
		}

		if (32 === keyCode) {
			name = 'spacebar';
		}

		return {
			name: name || keyCode,
			keyCode: keyCode,
			meta: meta
		};
	}

	scope.on('keydown.dice', function keyEventHandler(e) {
		var key = getKey(e.keyCode);

		switch (key.name) {
			case 'spacebar':
			e.preventDefault();
			scope.trigger('setSelectedSpeed');
			break;
			case 'numeric':
			scope.trigger('selectSpeedEventHandler', [key.meta.index]);
			break;
		}
	});

	scope.find('#winner').on('click.dice', '.winner__wrapper', function winnerDiceRollEventHandler() {
		scope.trigger('setSelectedSpeed');
	});

	links.on('click.dice', '.control__main .btn', function mainControlEventHandler() {
		scope.trigger('setSelectedSpeed');
	});

	speedControl.on('click.dice', function speedControlEventHandler() {
		scope.trigger('speedEventHandler', [this]);
	});
});
