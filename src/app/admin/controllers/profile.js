(function() {
    'use strict';
    angular.module('core.admin').controller('Profile', Profile);
    Profile.$inject = ['$scope', '$routeParams', 'admin', 'notify']
    /* @ngInject */
    function Profile($scope, $routeParams, admin, notify) {
        var vm = this
        vm.toggle = toggleAppList
        vm.show = false
        vm.save = grantAccess
        vm.accessList = []
        vm.message = {}
        activate()

        function activate() {
          vm.access = admin.appList()
          vm.user = admin.extractNameFromDN($routeParams.dn)
          vm.department = admin.extractDepartmentFromDN($routeParams.dn)
          admin.getApps($routeParams.dn).then(function(res){
            vm.apps = res.data
          })
        }
        /**
         * Toggles list of applications
         */
        function toggleAppList(){
          vm.show = !vm.show
        }

        function grantAccess(){
          var selected = 0
          angular.forEach(vm.access, function(key, value){
            if(key == true){
              selected++
              vm.accessList.push(value)
            }
          })
          if(selected > 0){
            var user = {
              'uname': vm.user,
              'dn': $routeParams.dn
            }

            admin.addUser( user ).then(function(res){
              var uid = res.data.id
              var access = {
                'uid': uid
              }
              for(var i = 0; i < vm.accessList.length; i++){
                access.app_name = vm.accessList[i]
                admin.grantAccess( access ).then(function(res){
                      toggleAppList()
                      vm.message = res.data
                      notify.emitEvent('notification')
                      activate()
                })
              }
            })
          }
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
