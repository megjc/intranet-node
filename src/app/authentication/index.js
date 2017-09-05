(function() {
    'use strict'
    angular.module('core.login', []).config(config)

    function config($routeProvider) {
      $routeProvider.when('/users/login',{
        templateUrl: 'views/login/form.html',
        controller: 'Login as vm',
        title: 'Login ',
        access: {restricted: false}
      }).otherwise({redirectTo: '/users/login'})
    }
})();
