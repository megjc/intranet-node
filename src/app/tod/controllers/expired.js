(function() {
    'use strict';

    angular
        .module('apps.tod')
        .controller('ExpiryList', ExpiryList);
  ExpiryList.$inject = ['$location', 'officers', 'create', 'read', 'update', 'todSrv', 'notify']
    /* @ngInject */
    function ExpiryList($location, officers, create, read, update, todSrv, notify) {
        var vm = this
        vm.notify = notify
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

        function notify( officer_id ){
          var docs = []
          vm.officers.forEach(function(officer){
              if(officer.employee_id == officer_id){
                docs.push(officer)
              }
          })
          toggle()
          vm.docs = docs
        }

        function toggle(){
          vm.active = !vm.active
        }

        function sendNotification( docs ){
          toggle()
          todSrv.sendNotification( docs ).then(function(res){
            console.log(res)
          })
        }
    }
})();
