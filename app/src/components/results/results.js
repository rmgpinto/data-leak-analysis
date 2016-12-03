(function () {
    'use strict';

    var controller = function (dataLeakFactory, $mdToast) {
        var vm = this;
        init();

        function init() {
            vm.searchResults = dataLeakFactory.searchResults;
        }
    }

    controller.$inject = ['dataLeakFactory', '$mdToast'];

    var dlaResults = function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/partials/results/results.html',
            controller: controller,
            controllerAs: 'vm',
            bindToController: true
        }
    };

    angular.module('app').directive('dlaResults', dlaResults);
} ());
