(function() {
    'use strict'
    angular.module('apps.help', []).config(config)

    function config($routeProvider){
      $routeProvider.when('/help-desk',{
        controller: 'Help as vm',
        templateUrl: 'templates/help-desk/form.html',
        title: 'My Help Desk'
      })
    }
})();
