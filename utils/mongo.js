var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

/**
 * Configuration
 */
var jira = {
    url: "mongodb://localhost:27017/jiraStat",
    port: 7711
};


module.exports = {
    /**
     * Find target in specified colection
     * 
     * @param {string} [collection="tickets"] 
     * @param {object} [target={}] 
     * @return {array} docs matching request
     */
    find(collection = "tickets", target = {}) {
        var config = {
            collection: collection,
            target: target
        };
        MongoClient.connect(jira.url, function(err, db) {
            assert.equal(null, err);
            findDocuments(db, config, function(docs) {
                console.log(`Docs found: ${docs.length}`);
                db.close();
                return docs;
            });
        });
    }
}


/******************\
< * Util methods * >
\******************/

function findDocuments(db, config, callback) {
    var collection = db.collection(config.collection);
    collection.find(config.target).toArray(function(err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
}