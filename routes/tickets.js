var express = require('express'),
    router = express.Router(),
    mongo = require('../utils/mongo');

/* GET tickets from jiraStat mongoDB */
router.get('/', function(req, res, next) {

    console.log(req.query);
	
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

	// handle ticket status requests (if none indicated returns open/reopen)
	let query = {};

	if (req.query.status) {
		query["fields.status.id"] = {
			$in: req.query.status.length ? req.query.status.split(' ') : ['1', '4']
		};
	}
	if (req.query.assignee) {
		query["fields.assignee.key"] = {
			$in: req.query.assignee.length ? req.query.assignee.split(' ') : process.env.USER
		};
	}
	
	mongo.find('tickets', query, function(results) {
        res.json(results);
    });

});

module.exports = router;