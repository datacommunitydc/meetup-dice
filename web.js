var express = require("express");
var app = express();
app.use(express.logger());

var meetup = require('meetup-api')(process.env.MEETUP_API_KEY);

var events_query = {
	'group_urlname' : 'Data-Science-DC',
	'status' : 'upcoming,past',
	'time' : '-1w,1w',
	'only' : 'id,name,status,yes_rsvp_count'
};

var rsvp_query = {
	'event_id' : "0",
	'rsvp' : 'yes',
	'only' : 'member,member_photo'
};

get_rsvps = function(event_id) {
	rsvp_query.event_id = event_id;
	meetup.getRVSPs(rsvp_query, function(err, rsvps) {
		// console.log(rsvps);
		random_rsvp = rsvps.results[Math.floor(Math.random() * rsvps.results.length)];
		//console.log(random_rsvp);
		return random_rsvp;
	});
};

get_events = function() {
	meetup.getEvents(events_query, function(err,events) {
		// console.log(events);
		get_rsvps(events.results[0].id)
	});
}


app.get('/', function(request, response) {
  response.send('Hello World!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});



