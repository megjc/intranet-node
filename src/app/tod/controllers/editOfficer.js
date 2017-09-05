(function() {
    'use strict';

    angular
        .module('apps.tod')
        .controller('EditOfficer', EditOfficer);

    EditOfficer.$inject = ['$window','$scope','$routeParams', 'notify', 'todSrv', 'allowances', 'classifications', 'activities'];

    /* @ngInject */
    function EditOfficer($window, $scope, $routeParams, notify, todSrv, allowances, classifications, activities) {
        var vm = this;
        vm.update = update
        activate()
        vm.updateDoc = updateDoc
        vm.updateVehicle = updateVehicle
        vm.getSelectedActivity = getSelectedActivity
        vm.getSelectedAllowance = getSelectedAllowance
        vm.back = back

        function activate() {
          todSrv.getOfficerById($routeParams.id).then(function(officer){
            vm.officer = officer
            vm.classifications = classifications
            vm.allowances = allowances
            vm.activities = activities
            vm.selectedClassification = findinList("id", officer.classification_id, classifications)
            vm.selectedAllowance = findinList("id", officer.allowance_type, allowances)
            vm.selectedActivity = findinList("id", officer.activity_id, activities)
            if(officer.docs.length > 0){
              vm.officer.license = new Date(officer.docs[0].expiry_date)
              vm.officer.fitness = new Date(officer.docs[1].expiry_date)
              vm.officer.registration = new Date(officer.docs[2].expiry_date)
              vm.officer.insurance = new Date(officer.docs[3].expiry_date)
            }
          })
        }

        function findinList( property, query, list){
          var i = 0, item = false
          for( ;i < list.length; i++){
            if(list[i].hasOwnProperty(property)){
              item = list[i]
              if(item[property] == query) return item
            }
          }
        }

        function update( section ){
            todSrv.update( vm.officer, section, null, null).then(function(res){
              vm.message = res
              notify.emitEvent('notification')
            })
        }

        function getSelectedActivity(){
          vm.officer.activity_id = vm.selectedActivity.id
        }

        function getSelectedAllowance(){
         vm.officer.allowance_type = vm.selectedAllowance.id
        }

        function updateVehicle(){
          todSrv.updateVehicle(vm.officer).then(function(res){
            vm.message = res
            notify.emitEvent('notification')
          })
        }

        function updateDoc( doc_id, date, employee_id){
          var data = {
            "employee_id": employee_id,
            "expiry_date": date,
            "id": doc_id
          }
          todSrv.updateDoc( data ).then(function(res){
            vm.message = res
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

        function back(){
          $window.history.back()
        }
    }
})();
