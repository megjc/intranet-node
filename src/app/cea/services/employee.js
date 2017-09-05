(function() {
    'use strict';
    angular.module('apps.cea').service('employeeSrv', employeeSrv)
    employeeSrv.$inject = ['$http']
    /* @ngInject */
    function employeeSrv($http) {
      var service = {
        list:list
      }

      return service

      function list(){
        return $http.get('/api/employees?type=contract')
                    .then(function(res){ return res.data })
      }
    }
})();
