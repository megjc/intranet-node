(function() {
    'use strict'
    angular.module('apps.tod').controller('Officer', Officer)
    Officer.$inject = ['allowances', 'classifications', 'activities', '$scope','notify', 'todSrv']
    /* @ngInject */
    function Officer(allowances, classifications, activities, $scope, notify, todSrv) {
        var vm = this
        vm.save = save
        vm.officer = todSrv.initOfficerForm()
        vm.getSelected = getSelected
        vm.getSelectedActivity = getSelectedActivity
        vm.getSelectedAllowance = getSelectedAllowance
        vm.toggle = toggle
        vm.showPermissionDate = false
        vm.toggleBox = false
        vm.vehicle_details_required = false
        vm.permissionRequired = false
        activate()

        function activate() {
          vm.allowances = allowances
          vm.classifications = classifications
          vm.activities = activities
        }

        function save( form ){
          todSrv.createOfficer(vm.officer).then(function(res){
            vm.message = res
            form.$setPristine()
            if(res.success){
              vm.officer = todSrv.initOfficerForm()
              vm.selectedClassification = ''
              vm.selectedAllowance = ''
              vm.selectedActivity = ''
            }
            notify.emitEvent('notification')
          })
        }

        function getSelected(){
          vm.officer.classification_id = vm.selectedClassification
        }

        function getSelectedAllowance(){
          vm.officer.allowance_type = vm.selectedAllowance
          switch (vm.selectedAllowance) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 11:
            case 13:
            case 15:
            case 17:
            case 19: vm.toggleBox = !vm.toggleBox
                      vm.officer.vehicle_required = true
                      vm.vehicle_details_required = true
              break;
            default: vm.toggleBox = false
          }
        }

        function getSelectedActivity(){
          vm.officer.activity_id = vm.selectedActivity
        }

        function toggle(){
          vm.showPermissionDate = !vm.showPermissionDate
          if(!vm.officer.is_owner) vm.permissionRequired = !vm.permissionRequired
        }

        notify.subscribe($scope, 'notification', function(){
          vm.notification = notify.builder(vm.message.message, vm.message.success, true)
        })
    }
})();
