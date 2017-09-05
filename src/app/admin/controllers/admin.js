(function() {
    'use strict';
    angular.module('core.admin').controller('Admin', Admin)
    //Admin.$inject = ['dependencies'];
    /* @ngInject */
    function Admin() {
        var vm = this;

        activate();

        function activate() {
          console.log('Admin')
        }
    }
})();
