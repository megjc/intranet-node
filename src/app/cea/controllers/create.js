(function() {
    'use strict'
    angular.module('apps.cea').controller('CreateEmployee', CreateEmployee)
    CreateEmployee.$inject = [
      '$scope',
      'employeeSrv',
      'notify',
      'common',
      'classifications',
      'activities'
    ]
    /* @ngInject */
    function CreateEmployee(
      $scope, employeeSrv, notify, common, classifications, activities) {
      var vm = this
      vm.save = save
      vm.officer = employeeSrv.initOfficer()
      vm.getSelectedClassificiation = getSelectedClassificiation
      vm.getSelectedActivity = getSelectedActivity

      activate()

      function activate() {
          vm.classifications = classifications
          vm.activities = activities
      }

      function save( form ){
        form.$setPristine()
        employeeSrv.create(vm.officer).then(function(res){
          vm.message = res
          activate()
          notify.emitEvent('notification')
          if(res.success){
            form.$setPristine()
            vm.officer = employeeSrv.initOfficer()
            vm.selectedClassification = ''
            vm.selectedActivity = ''
          }
        })
      }

      function getSelectedActivity(){
        vm.officer.activity_id = vm.selectedActivity
      }

      function getSelectedClassificiation() {
        vm.officer.classification_id = vm.selectedClassification
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
