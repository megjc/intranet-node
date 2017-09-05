(function() {
    'use strict';

    angular
        .module('core.dashboard')
        .service('dashSrv', dashSrv);

    dashSrv.$inject = ['$http'];

    /* @ngInject */
    function dashSrv( $http ) {
        var service = {
          getUserAppList: getUserAppList
        }

        return service

        function getUserAppList(){
          return $http.get('/api/apps').then(function(res){
            return res.data
          })
        }
    }
})();
