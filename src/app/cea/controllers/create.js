(function() {
    'use strict';

    angular
        .module('apps.cea')
        .controller('CreateEmployee', CreateEmployee);

    //CreateEmployee.$inject = ['dependencies'];

    /* @ngInject */
    function CreateEmployee() {
        var vm = this;

        activate();

        function activate() {
            console.log('create')
        }
    }
})();
