var express = require('express'),
    router = express.Router(),
    mongo = require('../utils/mongo');

/* GET tickets from jiraStat mongoDB */
router.get('/', function(req, res, next) {
	console.log(req.query.status);
	switch (req.query.status) {

		case 'open':
			mongo.find('tickets', {"fields.status.id": { $in: ["1", "4"]} }, function(results) {
					res.json(results);
			});
			break;

		case 'inProgress':
			mongo.find('tickets', {"fields.status.id": "10037" }, function(results) {
					res.json(results);
			});
			break;

		case 'open inProgress':
		case 'inProgress open':
			mongo.find('tickets', {"fields.status.id": { $in: ["1", "4", "10037"]} }, function(results) {
					res.json(results);
			});
			break;

		default:
			mongo.find('tickets', {}, function(results) {
					res.json(results);
			});
	}

});

module.exports = router;