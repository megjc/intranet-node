(function() {
    'use strict';

    angular
        .module('apps.tod')
        .controller('EditOfficer', EditOfficer);

    EditOfficer.$inject = ['$window',
                           '$scope',
                           '$routeParams',
                           'notify',
                           'todSrv',
                           'allowances',
                           'classifications',
                           'activities'
                         ]
    /* @ngInject */
    function EditOfficer($window, $scope, $routeParams, notify, todSrv, allowances, classifications, activities) {
        var vm = this;
        vm.update = update
        activate()
        vm.updateDoc = updateDoc
        vm.updateVehicle = updateVehicle
        vm.getSelectedActivity = getSelectedActivity
        vm.getSelectedAllowance = getSelectedAllowance
        vm.getSelectedClassification = getSelectedClassification
        vm.toggle = toggle
        vm.removeOfficer = removeOfficer
        vm.addVehicle = false
        vm.createVehicle = createVehicle
        vm.toggleCreate = toggleCreate
        vm.saveVehicle = saveVehicle
        vm.createActive = false
        vm.confirm = ''
        vm.active = false
        vm.disabled = false
        vm.vehicle = {}

        function activate() {
          todSrv.getOfficerById($routeParams.id).then(function(officer){
            vm.officer = officer
            vm.classifications = classifications
            vm.allowances = allowances
            vm.activities = activities
            vm.addVehicle = hasVehicle( officer )
            vm.selectedClassification = findinList("id", officer.classification_id, classifications)
            vm.selectedAllowance = findinList("id", officer.allowance_type, allowances)
            vm.selectedActivity = findinList("id", officer.activity_id, activities)
            vm.isOfficer = (officer.is_traveling == 'T') ? true : false
            vm.disabled = (officer.is_traveling == 'F') ? true : false
            if(officer.docs.length > 0){
              vm.officer.license = new Date(officer.docs[0].expiry_date)
              vm.officer.fitness = new Date(officer.docs[1].expiry_date)
              vm.officer.registration = new Date(officer.docs[2].expiry_date)
              vm.officer.insurance = new Date(officer.docs[3].expiry_date)
            }
          })
        }
        /**
         * Checks if a vehicle is attached to an officer
         * @param  {Object}  officer
         * @return {Boolean}  true if vehicle is attached to an officer, false if not
         */
        function hasVehicle( officer ){
          return officer.vehicle_id == null
        }

        function saveVehicle () {
          todSrv.createVehicle( vm.vehicle ).then(function(res){
            vm.message = res
            vm.toggleCreate()
            activate()
            notify.emitEvent('notification')
            scroll()
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
              activate()
              notify.emitEvent('notification')
              scroll()
            })
        }

        function removeOfficer(){
          if(todSrv.compareString( vm.confirm, vm.officer.name)){
             update('remove-officer')
             toggle()
          }
        }

        function getSelectedActivity(){
          vm.officer.activity_id = vm.selectedActivity.id
        }

        function getSelectedAllowance(){
         vm.officer.allowance_type = vm.selectedAllowance.id
        }

        function getSelectedClassification(){
          vm.officer.classification_id = vm.selectedClassification.id
        }

        function updateVehicle(){
          todSrv.updateVehicle(vm.officer).then(function(res){
            vm.message = res
            notify.emitEvent('notification')
            scroll()
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
            scroll()
          })
        }

        function toggle(){
          vm.active = !vm.active
        }

        function toggleCreate(){
          vm.createActive = !vm.createActive
        }

        function scroll(){
          $window.scrollTo(0,0)
        }

        function createVehicle ( id ) {
          vm.vehicle.employee_id = id
          toggleCreate()
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
