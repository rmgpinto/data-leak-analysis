var async = require('async');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var dlaRepository = require('./repositories/dla-repository')();
var dlaCache = require('./repositories/dla-cache')();
var dlaService = require('./services/dla-service')();

var dbServer = process.env.DATABASE || 'localhost';
var dbPort = 27017;
var dbName = 'dla';
var dbConnectionString = 'mongodb://' + dbServer + ':' + dbPort + '/' + dbName;
var cacheServer = process.env.CACHE || 'localhost';
var cachePort = 6379;
var cacheConnectionString = 'redis://' + cacheServer + ':' + cachePort;
var apiPort = 8081;

// init - db connect and api listen
var app = undefined;
function init(callback) {
    async.parallel([
        function(callback) {
            dlaRepository.connect(dbConnectionString, function (err, dbRef) {
                callback && callback(err, null);
            });
        },
        function(callback) {
            dlaCache.connect(cacheConnectionString, function (err, res) {
                callback && callback(err, null);
            });
        }
    ], function(err, results) {
        if (err) {
            console.log(err);
            process.exit(-1);
        }
        console.log('connected to ' + dbConnectionString);
        console.log('connected to ' + cacheConnectionString);
    });


    app = express();
    app.set('port', (process.env.PORT || apiPort));
    app.use(express.static(__dirname + '/public'));
    app.listen(app.get('port'), function () {
        console.log('app is running, port:' + app.get('port'));
    });
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
}

function main() {
    init();
    // api routes
    router.route('/dataleaks')
        .get(function (request, response) {
            dlaService.getDataLeaks(function (err, res) {
                if (err) {
                    response.send(err);
                }
                else {
                    response.send(res);
                }
            });
        });

    router.route('/dataleaks/search')
        .post(function (request, response) {
            // 3 types of search: email, domain and pattern (regexp)
            if (!['email', 'domain', 'pattern'].includes(request.body.type) && request.body.search === undefined) {
                response.send('error');
            }
            switch (request.body.type) {
                case 'email':
                    dlaService.searchEmail(request.body.search, function (err, res) {
                        response.send(res);
                    });
                    break;
                case 'domain':
                    dlaService.searchDomain(request.body.search, function (err, res) {
                        response.send(res);
                    });
                    break;
                case 'pattern':
                    dlaService.searchPattern(request.body.search, function (err, res) {
                        response.send(res);
                    });
                    break;
            }
        });
    app.use('/api', router);
};

main();