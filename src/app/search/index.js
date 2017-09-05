(function() {
    'use strict';

    angular.module('core.search', []).config(config)

    function config($routeProvider) {
      $routeProvider.when('/dashboard/apps/search',{
        templateUrl: 'views/search/searchResults.html',
        controller: 'Search as vm',
        title: 'Search ',
        access: {restricted: true}
      })
    }
})();
