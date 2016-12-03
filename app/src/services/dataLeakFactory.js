(function () {
    'use strict';

    var dataLeakFactory = function ($http, $q) {
        function dataLeakFactory() {
            var self = this;
            self.searchResults = undefined;
            self.search = function (searchText) {
                var deferred = $q.defer();
                $http.post('/api/dataleaks', { type: 'pattern', search: searchText }).then(
                    function (response) {
                        self.searchResults = response;
                        deferred.resolve(response.data);
                    },
                    function (error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            }
        }
        return new dataLeakFactory();
    }

    dataLeakFactory.$inject = ['$http', '$q'];

    angular.module('app').factory('dataLeakFactory', dataLeakFactory);
} ());