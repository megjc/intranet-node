(function() {
    'use strict'
    angular.module('apps.cea', []).config(config)
    function config($routeProvider){
      $routeProvider.when('/dashboard/apps/cea/contract-employees', {
        controller: 'Employee as vm',
        title: 'Contract Employee Administration',
        templateUrl: 'views/apps/cea/employee-list.html',
        access: { restricted: true},
        resolve: {
          create: function(permission){
            return permission.getByType('create')
          },
          read: function(permission){
            return permission.getByType('read')
          },
          update: function(permission){
            return permission.getByType('update')
          },
          employees: function(employeeSrv){
            return employeeSrv.list()
          }
        }
      }).when('/dashboard/apps/cea/new/employee', {
        controller: 'CreateEmployee as vm',
        title: 'New Employee',
        templateUrl: 'views/apps/cea/create-employee.html',
        access: { restricted: true}
      })
    }
})();
