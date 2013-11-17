
exports.meetup = function(req, res){
	res.render('meetup', { title: req.param.meetup });
};
