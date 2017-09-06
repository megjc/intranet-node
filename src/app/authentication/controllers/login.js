/**
 * @desc Handles authentication logic for the application.
 * @author Tremaine Buchanan
 * @since 2017-06-20
 */
(function() {
  'use strict'
  angular.module('core.login').controller('Login', Login)
  Login.$inject = [
      '$location',
      '$scope',
      '$window',
      '$timeout',
      '$routeParams',
      'login',
      'notify'
    ]
  /* @ngInject */
  function Login($location, $scope, $window, $timeout, $routeParams, login, notify) {
      var vm = this
      vm.credentials = login.initUser()
      vm.auth = auth
      activate()
      /**
       * Handles controller start up logic.
       * If a user is authenticated, direct
       * user to the dashboard.
       */
      function activate() {
        showMessage( $routeParams.session_expired )
        if(login.getToken() != false){
          login.validateToken().then(function(res){
            if(res.data) $location.path('/dashboard/apps')
            else $location.path('/users/login')
          })
        }
      }
      /**
       * Authenticates a user.
       * If successful, the user is shown
       * a success message and directed to
       * the application's dashboard.
       */
      function auth(){
        var path = '/dashboard/apps'
        login.authUser(vm.credentials).then(function(res){
         vm.message = res.data
         notify.emitEvent('notification')
          login.setToken(res.data.token)
          if(res.data.success){
            $timeout(function(){
              if($routeParams.redirectTo !== undefined) path = decodeURI($routeParams.redirectTo)
              $location.search('')
              $location.path(path)
            },500)
          }
        }).catch(function(data, status, headers, config){
          delete $window.sessionStorage.uid
        })
      }

      notify.subscribe($scope, 'notification', function(){
        vm.notification = notify.builder(vm.message.message, vm.message.success, true)
      })
      /**
       * Displays a message
       * @param  {[type]} session_expired [description]
       * @return {[type]}                 [description]
       */
      function showMessage( session_expired ){
        var message = 'Your session has expired. Please enter your username and password.'
        if(session_expired !== undefined){
          if(session_expired == 'true'){
            vm.notification = notify.builder( message, false, true)
            notify.emitEvent('notification')
          }
        }
      }
  }
})();
