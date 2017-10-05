(function() {
  'use strict';
  angular.module('apps.cea').controller('EditEmployee', EditEmployee)
  EditEmployee.$inject = ['$routeParams', 'employeeSrv']
  /* @ngInject */
  function EditEmployee( $routeParams, employeeSrv ) {
      var vm = this
      activate()

      function activate() {
          employeeSrv
            .getEmployeeById( $routeParams.id )
            .then(function( employee ){
              vm.officer = employee
            })
      }
  }
})();
