(function() {
  'use strict';
  angular.module('core.interceptors').factory('interceptor', interceptor);
  /* @ngInject */
  function interceptor() {
      var service = {
          responseError: responseError
      }

      return service

      function responseError(response) {
          if(response.status >= 400){
              return response
          }
      }
  }
})();
