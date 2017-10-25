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
        'apps.pmas',
        'apps.tod'
    ]).config(config)
    .run(updateTitle)
    .run(restrictAccess)
    .run(getActiveTab);

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
  /**
   * Extracts tab identifier from a given URL
   * @param  {[type]} $rootScope [description]
   * @param  {[type]} $location  [description]
   * @return {[type]}            [description]
   */
  function getActiveTab( $rootScope, $location ) {
    var path = function() { return $location.path() }
    $rootScope.$watch(path, function(newURL, oldURL){
      var url = newURL.split('/')
      if(url.length > 0 ) $rootScope.activetab = url[6]
    })
  }
})();
