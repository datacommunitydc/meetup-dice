meetup-dice
===========

A simple Node.js application for picking a random RSVP'd member from a Meetup.

By [Harlan Harris](http://github.com/HarlanH), for [Data Community DC](http://datacommunitydc.org).

Heroku deployment steps:

	heroku apps:create my-app-name
	git push heroku master
    heroku config:set MEETUP_API_KEY=1234567890

