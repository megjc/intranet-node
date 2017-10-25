(function() {
    'use strict'
    angular.module('apps.pmas').controller('WorkPlanChanges', WorkPlanChanges)
    WorkPlanChanges.$inject = [
      '$scope',
      'notify',
      'common'
    ]
    /* @ngInject */
    function WorkPlanChanges( $scope, notify, common ) {
      var vm = this
      vm.toggle = toggle
      vm.save = save
      vm.active = false
      activate()

      function activate() { }

      function toggle(){
        vm.active = !vm.active
      }

      function save(){
        vm.message = {
          'success': true,
          'text': 'Work plan item successfully added.',
          'show': true
        }
        toggle()
        notify.emitEvent('notification')
      }

      notify.subscribe($scope, 'notification', function(){
        vm.notification = {
          'success' : vm.message.success,
          'text': vm.message.text,
          'show': true
        }
      })
    }
})();
