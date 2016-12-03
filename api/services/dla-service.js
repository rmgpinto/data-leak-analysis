var async = require('async');
var dlaRepository = require('../repositories/dla-repository')();
var dlaCache = require('../repositories/dla-cache')();

function dlaService() {
}

dlaService.prototype = dlaService.fn = {};

// all endpoints check for keys in cache
// if keys are cached, results are returned from cache
// else results are fetched from database and cached for further requests

dlaService.fn.getDataLeaks = function getDataLeaks(callback) {
    var finalCallback = function (err, res) {
        callback && callback(err, res);
    }
    async.waterfall([
        function getCache(callback) {
            dlaCache.get('dataleaks', function (err, res) {
                if (res !== null) {
                    console.log('from cache');
                    finalCallback(err, res);
                }
                else {
                    callback && callback(err, res);
                }
            });
        },
        function getDatabase(res, callback) {
            dlaRepository.getDataLeaks(function (err, dbRes) {
                console.log('from db');
                callback && callback(err, dbRes);
            });
        },
        function setCache(dbRes, callback) {
            dlaCache.set('dataleaks', JSON.stringify(dbRes), function (err, res) {
                callback && callback(err, dbRes);
            });
        }
    ], finalCallback);
}

dlaService.fn.searchEmail = function searchEmail(email, callback) {
    var finalCallback = function (err, res) {
        callback && callback(err, res);
    }
    async.waterfall([
        function getCache(callback) {
            dlaCache.get(email, function (err, res) {
                if (res !== null) {
                    console.log('from cache');
                    finalCallback(err, res);
                }
                else {
                    callback && callback(err, res);
                }
            });
        },
        function getDatabase(res, callback) {
            dlaRepository.searchEmail(email, function (err, dbRes) {
                console.log('from db');
                callback && callback(err, dbRes);
            });
        },
        function setCache(dbRes, callback) {
            dlaCache.set(email, JSON.stringify(dbRes), function (err, res) {
                callback && callback(err, dbRes);
            });
        }
    ], finalCallback);
}

dlaService.fn.searchDomain = function searchDomain(domain, callback) {
    var finalCallback = function (err, res) {
        callback && callback(err, res);
    }
    async.waterfall([
        function getCache(callback) {
            dlaCache.get(domain, function (err, res) {
                if (res !== null) {
                    console.log('from cache');
                    finalCallback(err, res);
                }
                else {
                    callback && callback(err, res);
                }
            });
        },
        function getDatabase(res, callback) {
            dlaRepository.searchDomain(domain, function (err, dbRes) {
                console.log('from db');
                callback && callback(err, dbRes);
            });
        },
        function setCache(dbRes, callback) {
            dlaCache.set(domain, JSON.stringify(dbRes), function (err, res) {
                callback && callback(err, dbRes);
            });
        }
    ], finalCallback);
}

dlaService.fn.searchPattern = function searchPattern(pattern, callback) {
    var finalCallback = function (err, res) {
        callback && callback(err, res);
    }
    async.waterfall([
        function getCache(callback) {
            dlaCache.get(pattern, function (err, res) {
                if (res !== null) {
                    console.log('from cache');
                    finalCallback(err, res);
                }
                else {
                    callback && callback(err, res);
                }
            });
        },
        function getDatabase(res, callback) {
            dlaRepository.searchPattern(pattern, function (err, dbRes) {
                console.log('from db');
                callback && callback(err, dbRes);
            });
        },
        function setCache(dbRes, callback) {
            dlaCache.set(pattern, JSON.stringify(dbRes), function (err, res) {
                callback && callback(err, dbRes);
            });
        }
    ], finalCallback);
}

module.exports = function () {
    return new dlaService();
}