(function() {
    'use strict';

    angular
        .module('apps.tod')
        .controller('ExpiryList', ExpiryList);
  ExpiryList.$inject = ['$location', 'officers', 'create', 'read', 'update', 'todSrv']
    /* @ngInject */
    function ExpiryList($location, officers, create, read, update, todSrv) {
        var vm = this
        activate()

        function activate() {
          vm.canCreate = create
          vm.canRead = read
          vm.canUpdate = update
          vm.officers = officers
        }
    }
})();
