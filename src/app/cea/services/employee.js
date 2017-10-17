(function() {
    'use strict';
    angular.module('apps.cea').service('employeeSrv', employeeSrv)
    employeeSrv.$inject = ['$http']
    /* @ngInject */
    function employeeSrv($http) {
      var service = {
        list:list,
        getEmployeeById: getEmployeeById,
        update: update,
        create: create,
        initOfficer: initOfficer
      }

      return service

      function list(){
        return $http.get('/api/employees?type=contract')
                    .then(function(res){ return res.data })
      }

      function getEmployeeById( id ){
        return $http.get('/api/employees/' + id)
                    .then(function(res){ return res.data })
      }

      function update( data ){
        return $http.put('/api/contract-employees/' + data.id, data)
                    .then(function(res){ return res.data })
      }

      function create( data ){
        data.emp_type = 'C'
        data.is_traveling = 'F'
        data.allowance_type = 0
        return $http.post('/api/contract-employees', data )
                    .then(function(res){ return res.data })
      }

      function initOfficer() {
        return {
          name: '',
          email: '',
          classification_id: '',
          position: '',
          activity_id: '',
          start_date: new Date(),
          end_date: ''
        }
      }
    }
})();
