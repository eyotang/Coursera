var assert = require('assert');

exports.insertDocument = function(db, document, object, callback) {
    var collection = db.collection(object);

    collection.insert(document, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted " + result.result.n + " documents into the document object "
                    + object);
        callback(result);
    });
};

exports.findDocuments = function(db, object, callback) {
    var collection = db.collection(object);

    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
};

exports.removeDocument = function(db, document, object, callback) {
    var collection = db.collection(object);

    collection.deleteOne(document, function(err, result) {
        assert.equal(err, null);
        console.log("Removed the document " + document);
        callback(result);
    });
};

exports.updateDocument = function(db, document, update, object, callback) {
    var collection = db.collection(object);

    collection.updateOne(document
                         , { $set: update }, null, function(err, result) {
                             assert.equal(err, null);
                             console.log("Updated the document with " + update);
                             callback(result);
                         });
};
