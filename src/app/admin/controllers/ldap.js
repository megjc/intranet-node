(function() {
  'use strict';
  angular.module('core.admin').controller('LDAPUser', LDAPUser);
  LDAPUser.$inject = ['$location','ldap_users'];
  /* @ngInject */
  function LDAPUser($location, ldap_users) {
      var vm = this;
      vm.view = view
      activate();

      function activate() {
        vm.users = ldap_users
      }

      function view( dn ) {
        $location.path('/admin/users/ldap/' + dn)
      }
  }
})();
