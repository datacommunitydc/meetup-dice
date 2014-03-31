$(function rollDocReady(){
	var scope = $(document);
	var links = scope.find('#links');
	var playControl = links.find('.control__pp .btn:first')
		.add(scope.find('.winner__wrapper'));
	var speedControl = links.find('.control__speed .btn');
	var clapControl = links.find('.pp__clap.btn');
	var lastSpeedIndex = null;
	var clapping = false;
	var clapInterval = null;

	// Instance of dice
	var dice = new DiceClass(scope);

	function setSelectedSpeed() {
		var index = dice.get('speed') - 1;
		
		scope.trigger('selectSpeedEventHandler', [index]);
	}

	function selectSpeedEventHandler(event, index) {
		lastSpeedIndex = index;
		speedControl
			.eq(index)
			.trigger('click.dice');
	}

	function speedEventHandler(event, target) {
		var element = $(target);

		playControl.blur();

		element.blur()
			.toggleClass('active')
			.siblings()
			.removeClass('active');

		var active = element.hasClass('active');

		playControl.toggleClass('active', active);
		clapControl.toggleClass('disabled', !active);

		if (false === active) {
			dice.stopRoll();

			if (clapping) {
				clapControl.trigger('click.dice');
			}

			return;
		}

		var speed = element.index() + 1;

		dice.set('speed', speed);

		dice.startRoll();
	}

	function clapEventHandler (event, target) {
		var element = $(target);
		var claptext = element.find('.claptext');
		var icon = element.find('.glyphicon');

		clapping = !clapping;

		element.toggleClass('btn--active', clapping);

		if (clapping) {
			setTimeout(function toggleClapBtn() {
				claptext.toggleClass('claptext--visible', true);

				clapInterval = setInterval(function clapIntervalHandler() {
					var toggle = clapping && dice.get('rolling') ? null : false;

					icon.toggleClass('animated pulse', toggle);
				}, 700);
			}, 1000);
		} else {
			clearInterval(clapInterval);
			claptext.toggleClass('claptext--visible', false);
		}
	}

	// Register handlers
	scope.on({
		setSelectedSpeed: setSelectedSpeed,
		speedEventHandler: speedEventHandler,
		selectSpeedEventHandler: selectSpeedEventHandler,
		clapEventHandler: clapEventHandler
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

	var microphoneAnalyzer = $('microphone-analyzer');

	microphoneAnalyzer[0].valuefilter = function (rms) {
	  var vol = rms * 100;

	  return vol;
	};

	microphoneAnalyzer.on('air', function (e) {
		var speedIndex;

		if (clapping && dice.get('rolling')) {
			speedIndex = e.originalEvent.detail.audioRange.index;

			if (lastSpeedIndex !== speedIndex) {
				lastSpeedIndex = speedIndex;

				scope.trigger('selectSpeedEventHandler', [speedIndex]);
			}
		}
	});

	clapControl.on('click.dice', function clapControlEventHandler() {
		scope.trigger('clapEventHandler', [this]);
	});

	scope.on('keydown.dice', function keyEventHandler(e) {
		var key = getKey(e.keyCode);

		switch (key.name) {
			case 'spacebar':
			e.preventDefault();
			scope.trigger('setSelectedSpeed');
			break;
			case 'numeric':

			if (!clapping) {
				scope.trigger('selectSpeedEventHandler', [key.meta.index]);
			}

			break;
		}
	});

	playControl.on('click.dice', function playControlEventHandler() {
		scope.trigger('setSelectedSpeed');
	});

	speedControl.on('click.dice', function speedControlEventHandler() {
		scope.trigger('speedEventHandler', [this]);
	});
});
