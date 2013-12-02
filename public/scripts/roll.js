$(function(){
	// Reference to setInterval so we can clear it
	var rolling = null;
	// A way to speed up the rolling
	var timesClicked = 0;

	$('#links').on('click', '#rolling', function() {
		timesClicked = timesClicked + 1;
		if(rolling) {
			clearInterval(rolling);
		}
		var memberList = $('.member-cell');
		rolling = setInterval(function() { 
			var randomIndex = Math.floor((Math.random()*memberList.length) + 1);
			var $memberImg = $(memberList[randomIndex]).find('img');
			$('#winner').find('img').prop("src", $memberImg.prop('src'));
			$('#winner').find('img').prop("title", $memberImg.prop('title'));
			$('#winner').find('h1').text('Winner is ' + $memberImg.prop('title'));
		}, 100/timesClicked);
	});

	$('#links').on('click', '#stop', function() {
		clearInterval(rolling);
		timesClicked = 0;
	});
});
