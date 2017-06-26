var express = require('express'),
    router = express.Router(),
    mongo = require('../utils/mongo');

/* GET tickets from jiraStat mongoDB */
router.get('/', function(req, res, next) {
    mongo.find('tickets', {}, function(results) {
        res.json(results);
    });
});

module.exports = router;