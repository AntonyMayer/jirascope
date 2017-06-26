var express = require('express'),
    router = express.Router(),
    mongo = require('../utils/mongo');

/* GET users listing. */
router.get('/', function(req, res, next) {
		mongo.find();
    res.json([{
        id: 1,
        username: docs[0].key
    }, {
        id: 2,
        username: docs.length
    }]);
});

module.exports = router;