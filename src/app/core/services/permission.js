(function() {
    'use strict';
    angular.module('core.services').service('permission', permission)
    permission.$inject = ['$http']
    /* @ngInject */
    function permission($http) {
        var service = {
          getByType: getByType
        }

        return service

        function getByType( type ){
          var app_id = sessionStorage.getItem('_ai') || 0
          return $http.get('/api/apps/' + app_id + ' /permissions?type=' + type).then(function(res){
            return res.data
          })
        }
    }
})();
