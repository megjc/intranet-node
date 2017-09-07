/**
 * @desc Main module file.
 * @author Tremaine Buchanan
 * @since 2017-06
 */
(function() {
'use strict';

angular.module('intranet', [
        'ngRoute',
        'ngMessages',
        'apps.help',
        'apps.cea',
        'core.admin',
        'core.services',
        'core.interceptors',
        'core.filters',
        'core.login',
        'core.nav',
        'core.search',
        'core.dashboard',
        'apps.tod'

    ]).config(config)
    .run(updateTitle)
    .run(restrictAccess);

  function config($routeProvider, $httpProvider){
    $httpProvider.interceptors.push('interceptor')
    $httpProvider.interceptors.push('tokenInterceptor')
    $routeProvider.otherwise({redirectTo: '/users/login'})
  }
  /**
   * Updates the title of the page once the route changes.
   * @param  {[type]} $rootScope
   */
  function updateTitle( $rootScope  ){
    $rootScope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute) {
          $rootScope.title = currentRoute.title
    });
  }
  /**
   * Restricts access to route.
   * @param  {[type]} $rootScope
   */
  function restrictAccess( $rootScope, $location, login){
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        if(next.access != null && next.access.restricted){
              login.validateToken().then(function(res){
                if(res.status == 401) login.handleUnAuthorized()
            })
        }
    });
  }
})();
