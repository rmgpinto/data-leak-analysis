var mongodb = require('mongodb').MongoClient;

function dlaRepository() {
}

var db = undefined;

dlaRepository.prototype = dlaRepository.fn = {};

dlaRepository.fn.connect = function connect(connectionString, callback) {
    mongodb.connect(connectionString, function (err, dbRef) {
        if (err) {
            console.log(err);
            callback(err, null)
        }
        db = dbRef;
        callback && callback(err, db);
    });
}

dlaRepository.fn.getDataLeaks = function getDataLeaks(callback) {
    db.collection('dataleaks').find({}).toArray(function (err, res) {
        callback(err, res);
    });
}

dlaRepository.fn.searchEmail = function searchEmail(email, callback) {
    db.collection('events').find({ person: email }).toArray(function (err, res) {
        callback && callback(err, res);
    });
}

dlaRepository.fn.searchDomain = function searchDomain(domain, callback) {
    db.collection('events').find({ person: { $regex: '@' + domain } }).toArray(function (err, res) {
        callback && callback(err, res);
    });
}

dlaRepository.fn.searchPattern = function searchPattern(pattern, callback) {
    db.collection('events').find({ person: { $regex: pattern } }).toArray(function (err, res) {
        callback && callback(err, res);
    });
}

module.exports = function () {
    return new dlaRepository();
}