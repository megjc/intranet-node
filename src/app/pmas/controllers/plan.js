(function() {
    'use strict'
    angular.module('apps.pmas').controller('Plan', Plan)
    Plan.$inject = [
      '$scope',
      'notify',
      'common'
    ]
    /* @ngInject */
    function Plan( $scope, notify, common ) {
      var vm = this
      vm.save = save
      vm.toggle = toggle
      vm.active = false

      activate()

      function activate() {
        vm.plans = [{
          'post': 'Web Developer',
          'appraiser': {'name': 'Nicholas Bailey', 'post': 'Director'},
          'division': 'Information, Communication & Technology',
          'classification': 'MIT IT 5',
          'period_start': 2017,
          'period_end': 2018
        }]
      }

      function save(){
        vm.message = {
          'success': true,
          'text': 'Work plan successfully created.',
          'show': true
        }
        toggle()
        notify.emitEvent('notification')
      }

      function toggle(){
        vm.active = !vm.active
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
