(function() {
  'use strict';
  angular.module('core.admin').controller('User', User);
  User.$inject = ['users'];
  /* @ngInject */
  function User(users) {
      var vm = this;

      activate();

      function activate() {
        vm.users = users
      }
  }
})();
