/**
 * @desc Navbar controller
 * @author Tremaine Buchanan
 */
(function() {
  'use strict'
  angular.module('core.nav').controller('Nav', Nav)
  Nav.$inject = ['$location','login']
  /* @ngInject */
  function Nav( $location, login) {
      var vm = this
      vm.logout = logout
      activate()
      /**
       * Handles controller initialization logic.
       */
      function activate(){
        login.getUname().then(function(res){
          vm.username = res.data
        })
      }
      /**
       * Logouts out a user once
       * the logout button is clicked.
       */
      function logout(){
        //notify.emitEvent('notification-logout')
        login.deleteToken()
        $location.url('/users/login')
      }
  }
})();
