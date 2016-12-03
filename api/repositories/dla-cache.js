var redis = require('redis');

function dlaCache() {
}

var cache = undefined;

dlaCache.prototype = dlaCache.fn = {};

dlaCache.fn.connect = function connect(connectionString, callback) {
    cache = redis.createClient({ url: connectionString });
    cache.on('connect', function (err) {
        if (err) {
            console.log(err);
            callback(err, null)
        }
        callback && callback(err, 'connected');
    });
}

dlaCache.fn.get = function get(key, callback) {
    cache.get(key, function (err, obj) {
        callback && callback(err, obj);
    });
}

dlaCache.fn.set = function set(key, value, callback) {
    cache.set(key, value, function (err, obj) {
        callback && callback(err, obj);
    });
}

module.exports = function () {
    return new dlaCache();
}