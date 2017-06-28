var express = require('express'),
    router = express.Router(),
    mongo = require('../utils/mongo');

/* GET tickets from jiraStat mongoDB */
router.get('/', function(req, res, next) {
	console.log(req.query.status);
	switch (req.query.status) {
		/**
		 * CHEATLIST Status's IDs:
		 * 
		 * 1        "Open"
		 * 4        "Reopened"
		 * 6        "Closed"
		 * 10008    "Ready for Test"
		 * 10035    "Blocked"
		 * 10037    "In Progress"
		 * 10076    "Dev Complete"
		 * 10976    "Developer Test"
		 * 10678    "Parking Lot"
		 * 10977    "Assets Tridion Publishing"
		 * 11276    "HTML Tridion Publishing"
		 * 11076    "Ready for Live"
		 */
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