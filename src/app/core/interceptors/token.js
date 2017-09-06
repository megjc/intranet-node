/**
 * Modifies http requests.
 * @author Tremaine Buchanan
 * @since 2017-06-19
 */
(function() {
    'use strict';

    angular
      .module('core.interceptors')
      .factory('tokenInterceptor', tokenInterceptor)

      tokenInterceptor.$inject = ['$q', '$location']

      function tokenInterceptor( $q, $location ){
        var service = {
          request: request,
          responseError: responseError
        }

        return service
        /**
         * Intercepts requests and add bearer token.
         * @param  {[type]} config [description]
         * @return {[type]}        [description]
         */
        function request( config ){
          var url = $location.path()
          if(url.indexOf('login') == -1){
            config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('uid')
          }
          return config
        }

        function responseError( rejection ){
          if(rejection.status === 401){
            var path = encodeURI($location.path())
            sessionStorage.removeItem('uid')
            $location.url('/users/login?session_expired=true&redirectTo=' + path)
          }

          return $q.reject(rejection)
        }
      }
})();
