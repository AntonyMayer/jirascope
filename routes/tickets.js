var express = require('express'),
    router = express.Router(),
    mongo = require('../utils/mongo');

/* GET tickets from jiraStat mongoDB */
router.get('/', function(req, res, next) {
		let tickets = mongo.find();
    res.json([{
        id: 1,
        username: 'lorem1'
    }, {
        id: 2,
        username: 'lorem2'
    }]);
});

module.exports = router;