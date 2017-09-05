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
        'login',
        'notify'
      ]
    /* @ngInject */
    function Login($location, $scope, $window, $timeout, login, notify) {
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
          if(login.getToken() != false){
            login.validateToken().then(function(res){
              //console.log(res.data)
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
          login.authUser(vm.credentials).then(function(res){
           vm.message = res.data
           notify.emitEvent('notification')
            login.setToken(res.data.token)
            if(res.data.success){
              $timeout(function(){
                $location.path('/dashboard/apps')
              },500)
            }
          }).catch(function(data, status, headers, config){
            delete $window.sessionStorage.uid
          })
        }

        notify.subscribe($scope, 'notification', function(){
          vm.notification = {
            'text': vm.message.message,
            'success': vm.message.success,
            'show' : true
          }
        })
    }
})();
