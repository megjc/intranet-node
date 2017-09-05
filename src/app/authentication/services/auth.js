/**
 * Authentication service used to authenticate a user.
 * @author Tremaine Buchanan
 * @since 2017-06-19
 */
(function() {
    'use strict';

    angular
        .module('core.login')
        .service('login', login);

    login.$inject = ['$http','$location', '$window'];

    /* @ngInject */
    function login($http, $location, $window) {
      var service = {
        authUser: authUser,
        initUser: initUser,
        getToken: getToken,
        setToken: setToken,
        validateToken: validateToken,
        deleteToken: deleteToken,
        getUname:getUname,
        isAdmin: isAdmin
      }
      return service
      /**
       * [authUser description]
       * @param  {[type]} credentials [description]
       * @return {[type]}             [description]
       */
      function authUser( credentials ){
         return $http.post('/api/users/auth/ldap', credentials)
      }
      /**
       * [initUser description]
       * @return {[type]} [description]
       */
      function initUser(){
        return {
          name: '',
          password: ''
        }
      }
      /**
       * @desc Retrieves user token from session storage
       * @return      {[type]} Token if present, false if not
       */
      function getToken(){
        var token = $window.sessionStorage.token
        if(token == null || token.length == 0)  return false
        return token
      }
      /**
       * [setToken description]
       * @param {[type]} token [description]
       */
      function setToken( token ) {
        if(token != null || token.length != 0){
          $window.sessionStorage.uid = token
        }
      }
      /**
       * [validateToken description]
       * @return {[type]} [description]
       */
      function validateToken( ){
        var req = {
          method: 'GET',
          url: '/api/token/verify',
          headers: {
            'Authorization': 'Bearer ' + $window.sessionStorage.uid
          }
        }
        return $http(req)
      }
      /**
       * [deleteToken description]
       */
      function deleteToken(){
        delete $window.sessionStorage.uid
      }
      /**
       * Retrieves the username of the
       * currently logged in user.
       */
      function getUname(){
        return $http.get('/api/users/me')
      }

      function isAdmin(){
        return $http.get('/api/users/admin')
      }
    }
})();
