/**
 * [description]
 * @return {[type]} [description]
 */
(function() {
    'use strict'
    angular.module('core.dashboard').controller('Dashboard', Dashboard)
    Dashboard.$inject = ['apps']
    /* @ngInject */
    function Dashboard(apps) {
        var vm = this
        vm.setAppId = setId
        activate()
        /**
         * [activate description]
         * @return {[type]} [description]
         */
        function activate() {
          vm.apps = apps
        }

        function setId( id ){
          sessionStorage.setItem('_ai', id)
        }
    }
})();
