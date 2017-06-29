var express = require('express'),
    router = express.Router(),
    mongo = require('../utils/mongo');

/* GET tickets from jiraStat mongoDB */
router.get('/', function(req, res, next) {

    // console.log(req.query);

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

	let query = {};

	// handle ticket status requests (if none indicated returns all)
	if (req.query.status) {
		query["fields.status.id"] = {
			$in: req.query.status.split(' ')
		};
	}
	// handle ticket asignee requests (if none indicated returns all)	
	if (req.query.assignee) {
		query["fields.assignee.key"] = {
			$in: req.query.assignee.split(' ')
		};
	}
	// console.log(query);
	mongo.find('tickets', query, function(results) {
        res.json(results);
    });

});

module.exports = router;