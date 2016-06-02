var mongoClient = require('mongodb').MongoClient,
assert = require('assert');

var connectUrl = 'mongodb://localhost:27017/conFusion';

mongoClient.connect(connectUrl, function(err, db) {
    assert.equal(err, null);
    console.log("Connect to mongo server successfully.");

    var collection = db.collection("dishes");
    collection.insertOne({name : "eyotang", description : "Test node with mongodb"},
                        function(err, result) {
                            assert.equal(err, null);
                            console.log("After insert:");
                            console.log(result.ops);

                            collection.find({}).toArray(function(err, docs) {
                                assert.equal(err, null);
                                console.log("Found:");
                                console.log(docs);

                                db.dropCollection("dishes", function(err, result) {
                                    assert.equal(err, null);
                                    db.close();
                                });
                            });
                        });
});
