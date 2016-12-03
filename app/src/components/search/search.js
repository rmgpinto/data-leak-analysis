(function () {
    'use strict';

    var controller = function (dataLeakFactory, $mdToast) {
        var vm = this;

        function searchDataLeak(searchText) {
            vm.searchingDataLeak = true;
            dataLeakFactory.search(searchText).then(
                function (searchResults) {
                    vm.searchingDataLeak = false;
                    dataLeakFactory.searchResults = searchResults;
                },
                function (error) {
                    vm.searchingDataLeak = false;
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Error searching data leak')
                            .position('bottom left')
                            .hideDelay(3000)
                    );
                });
        }

        vm.searchDataLeak = function (searchText) {
            searchDataLeak(searchText);
        }
    }

    controller.$inject = ['dataLeakFactory', '$mdToast'];

    var dlaSearch = function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/partials/search/search.html',
            controller: controller,
            controllerAs: 'vm',
            bindToController: true
        }
    };

    angular.module('app').directive('dlaSearch', dlaSearch);
} ());
