meetup-dice
===========

A simple Node.js application for picking a random RSVP'd member from a Meetup.

By [Harlan Harris](http://github.com/HarlanH), for [Data Community DC](http://datacommunitydc.org).

Contributors:

    [Devin Castro](http://github.com/ddcast)

To run locally:

    MEETUP_API_KEY=1234567890 node web.js
   
To deploy on Heroku with your API key (which will publicly display all of your Meetups):

    heroku apps:create my-app-name
    git push heroku master
    heroku config:set MEETUP_API_KEY=1234567890

