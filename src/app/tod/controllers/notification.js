(function() {
    'use strict';

    angular
        .module('apps.tod')
        .controller('NotificationList', NotificationList);
  NotificationList.$inject = ['$location', 'notifications', 'create', 'read', 'update', 'todSrv']
    /* @ngInject */
    function NotificationList($location, notifications, create, read, update, todSrv) {
        var vm = this
        activate()

        function activate() {
          vm.canCreate = create
          vm.canRead = read
          vm.canUpdate = update
          vm.notifications = notifications 
        }

    }
})();
