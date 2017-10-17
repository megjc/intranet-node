(function() {
  'use strict';
  angular.module('apps.cea').controller('EditEmployee', EditEmployee)
  EditEmployee.$inject = [
    '$scope',
    '$routeParams',
    'employeeSrv',
    'common',
    'notify',
    'classifications',
    'activities'
  ]
  /* @ngInject */
  function EditEmployee(
    $scope, $routeParams, employeeSrv, common, notify, classifications, activities) {
      var vm = this
      activate()
      vm.save = save
      vm.getSelectedClassification = getSelectedClassification
      vm.getSelectedActivity = getSelectedActivity
      /**
       * [activate description]
       * @return {[type]} [description]
       */
      function activate() {
          employeeSrv
            .getEmployeeById( $routeParams.id )
            .then(function( employee ){
              vm.officer = employee
              vm.activities = activities
              vm.classifications = classifications
              vm.officer.start_date = new Date(employee.start_date)
              vm.officer.end_date = new Date(employee.end_date)
              var classification = common.findinList("id", employee.classification_id, classifications)
              var activity = common.findinList("id", employee.activity_id, activities)
              vm.selectedActivity = activity.id
              vm.selectedClassification = classification.id
            })
      }
      /**
       * [getSelectedClassification description]
       * @return {[type]} [description]
       */
      function getSelectedClassification(){
        vm.officer.classification_id = vm.selectedClassification
      }
      /**
       * [getSelectedActivity description]
       * @return {[type]} [description]
       */
      function getSelectedActivity() {
        vm.officer.activity_id = vm.selectedActivity
      }
      /**
       * Performs update of employee data
       * @return {[type]} [description]
       */
      function save(){
        employeeSrv.update(vm.officer).then(function(res){
          vm.message = res
          activate()
          notify.emitEvent('notification')
        })
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
