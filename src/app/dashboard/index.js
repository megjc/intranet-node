(function() {
    'use strict';

    angular
        .module('core.dashboard', []).config(config)

        function config($routeProvider) {
          $routeProvider.when('/dashboard/apps',{
            controller: 'Dashboard as vm',
            templateUrl: 'views/dashboard/app-list.html',
            title: 'Dashboard',
            resolve: {
              apps: function(dashSrv){
                return dashSrv.getUserAppList()
              }
            },
            access: { restricted: true}
          })
        }
})();
