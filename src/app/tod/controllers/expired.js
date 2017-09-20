(function() {
  'use strict'
  angular.module('apps.tod').controller('ExpiryList', ExpiryList)
  ExpiryList.$inject = ['$location',
                        '$scope',
                        'officers',
                        'create',
                        'read',
                        'update',
                        'todSrv',
                        'notify']
    /* @ngInject */
    function ExpiryList($location, $scope, officers, create, read, update, todSrv, notify) {
        var vm = this
        vm.notifyOfficer = notifyOfficer
        vm.sendNotification = sendNotification
        vm.active = false
        vm.toggle = toggle
        activate()

        function activate() {
          vm.canCreate = create
          vm.canRead = read
          vm.canUpdate = update
          vm.officers = officers
        }

        function notifyOfficer( officer ){
          vm.docs = officer.docs
          toggle()
        }

        function toggle(){
          vm.active = !vm.active
        }

        function sendNotification( docs ){
          toggle()
          todSrv.sendNotification( docs ).then(function(res){
            vm.message = res
            notify.emitEvent('notification')
          })
        }

        notify.subscribe($scope, 'notification', function(){
          vm.notification = notify.builder(vm.message.text, vm.message.success, true)
        })
    }
})();
