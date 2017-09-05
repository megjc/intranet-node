(function() {
    'use strict';
    angular.module('core.admin', []).config(config).run(checkAccess)

    function config($routeProvider){
      $routeProvider.when('/admin', {
        controller: 'Admin',
        controllerAs: 'vm',
        templateUrl: 'views/core/admin/index.html',
        title: 'Administration',
        access: {restricted: true}
      }).when('/admin/users/ldap', {
        controller: 'LDAPUser',
        controllerAs: 'vm',
        templateUrl: 'views/core/admin/ldap-users.html',
        title: 'Administration',
        resolve: {
          ldap_users : function(admin){
            return admin.getLDAPUsers()
          }
        },
        access: {restricted: true}
      }).when('/admin/users', {
        controller: 'User',
        controllerAs: 'vm',
        templateUrl: 'views/core/admin/users.html',
        title: 'Administration',
        resolve: {
          users : function(admin){
            return admin.getUsers()
          }
        },
        access: {restricted: true}
      }).when('/admin/users/ldap/:dn', {
        controller: 'Profile',
        controllerAs: 'vm',
        templateUrl: 'views/core/admin/profile.html',
        title: 'Administration',
        resolve: {
          users : function(admin){
            return admin.getUsers()
          }
        },
        access: {restricted: true}
      })
    }

    function checkAccess( $rootScope, $location, login ){
      $rootScope.$on("$routeChangeStart", function(event, next, current) {
          var path = $location.path()
          if(path.indexOf('admin') != -1){
            login.isAdmin().then(function(res){
              //TODO to be handled by the interceptor
              if(res.status == 401) $location.url('/dashboard/apps')
            })
          }
      })
    }
})();
