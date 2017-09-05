(function() {
    'use strict';

    angular
        .module('core.admin')
        .service('admin', admin);

    admin.$inject = ['$http'];

    /* @ngInject */
    function admin($http) {
        var service = {
          getLDAPUsers: getLDAPUsers,
          getUsers:getUsers,
          getApps:getApps,
          extractNameFromDN: extractNameFromDN,
          extractDepartmentFromDN: extractDepartmentFromDN,
          grantAccess:grantAccess,
          appList:appList,
          addUser:addUser
        }

        return service

        function getLDAPUsers(){
          return $http.get('/api/users/ldap').then(function(res){
            return res.data
          })
        }

        function getUsers(){
          return $http.get('/api/users').then(function(res){
            return res.data
          })
        }

        function getApps( dn ) {
          return $http.get('/api/apps/' + dn)
        }

        function extractNameFromDN( dn ){
          var dn_string = dn.split(',')
          var cn = dn_string[0]
          var name = cn.split('=')
          return name[1]
        }

        function extractDepartmentFromDN( dn ){
          var dn_string = dn.split(',')
          var ou = dn_string[1].split('=')
          return ou[1].toUpperCase()
        }

        function grantAccess( access ){
          return $http.post('/api/apps/grant_access', access)
        }

        function appList(){
          return {
            'traveling officer database' : false
          }
        }

        function addUser( user ){
          return $http.post('/api/users', user)
        }
    }
})();
