/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

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


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

get_render_meetup = function(req, res) {
	get_rsvps = function(event_id, callback) {
		rsvp_query.event_id = event_id;
		meetup.getRVSPs(rsvp_query, function(err, rsvps) {
			// console.log(rsvps);
			random_rsvp = rsvps.results[Math.floor(Math.random() * rsvps.results.length)];
			//console.log(random_rsvp);
			typeof callback === 'function' && callback(random_rsvp);
		});
	};

	get_events = function(callback) {
		meetup.getEvents(events_query, function(err,events) {
			//console.log(events);
			get_rsvps(events.results[0].id, callback)
		});
	};

	do_render = function(str) {
		res.render('meetup', { title: events_query.group_urlname, res: str});
	};

	get_events(do_render);
};
	

app.get('/:meetup', get_render_meetup);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


// app.get('/', function(request, response) {

//   get_events(response.json);
// });

// var port = process.env.PORT || 5000;
// app.listen(port, function() {
//   console.log("Listening on " + port);
// });




