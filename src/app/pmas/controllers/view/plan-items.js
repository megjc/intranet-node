(function() {
    'use strict'
    angular.module('apps.pmas').controller('ViewPlan', ViewPlan)
    ViewPlan.$inject = [
      '$scope',
      'notify',
      'common'
    ]
    /* @ngInject */
    function ViewPlan( $scope, notify, common ) {
      var vm = this
      vm.toggle = toggle
      vm.save = save
      vm.show = false
      vm.active = false
      activate()

      function activate() { }

      function toggle(){
        vm.show = !vm.show
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
