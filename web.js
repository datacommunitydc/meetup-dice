/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');
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
	'page' : '200',
	'offset': 0,
	'only' : 'member,member_photo'
};

var groups_query = {
	'member_id' : 'self',
	'only' : 'name,urlname,group_photo'
}

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

get_render_meetup_list = function(req, res) {
	get_groups = function(callback) {
		meetup.getGroups(groups_query, function(err, groups) {
			// console.log(groups);
			callback(groups.results);
		})
	};
	do_render = function(str) {
		res.render('index', { title : 'Meetup Dice', res : str})
	};
	get_groups(do_render);
};

app.get('/', get_render_meetup_list);

get_render_meetup = function(req, res) {
	get_rsvps = function(evnt, callback, offset, rsvplist) {
		rsvp_query.event_id = evnt.id;
		rsvp_query.offset = offset;
		console.log(rsvp_query);
		meetup.getRVSPs(rsvp_query, function(err, rsvps) {
			// console.log(rsvps); // lengthy...
			rsvplist = rsvplist.concat(rsvps.results);
			console.log("list length = " + rsvplist.length);
			if ((offset+1) * 200 < evnt.yes_rsvp_count) {
				// recurse
				console.log("recursing");
				get_rsvps(evnt, callback, offset+1, rsvplist);
			} else {
				// done
				console.log("base case");
				random_rsvp = rsvplist[Math.floor(Math.random() * rsvplist.length)];
				//console.log(random_rsvp);
				typeof callback === 'function' && callback(evnt, random_rsvp);
			}
		});
	};

	get_events = function(callback) {
		meetup.getEvents(events_query, function(err,events) {
			// console.log(events);
			if (events.results.length == 0) {
				res.status(404).send('Unknown Meetup'); // doesn't work?!
			} else {
				get_rsvps(events.results[0], callback, 0, [])
			};
		});
	};

	do_render = function(evnt, rsvp) {
		res.render('meetup', { title: events_query.group_urlname, event: evnt, rsvp: rsvp});
	};

	console.log("Requested " + req.params.meetup);
	events_query.group_urlname = req.params.meetup;
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




