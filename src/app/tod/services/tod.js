(function() {
    'use strict';
    angular.module('apps.tod').service('todSrv', todSrv);
    todSrv.$inject = ['$http']
    /* @ngInject */
    function todSrv($http) {
        var service = {
            getOfficers:getOfficers,
            getDocsByOfficerId:getDocsByOfficerId,
            initModal: initModal,
            createOfficer: createOfficer,
            getAllowances:getAllowances,
            getClassifications: getClassifications,
            initOfficerForm: initOfficerForm,
            getActivities: getActivities,
            getOfficerById:getOfficerById,
            update: update,
            updateDoc: updateDoc,
            getExpiredDocs:getExpiredDocs,
            updateVehicle: updateVehicle,
            removeOfficer: removeOfficer,
            checkSection: checkSection,
            compareString: compareString,
            sendNotification: sendNotification,
            getNotifications: getNotifications
        }

        return service

        function getNotifications(){
          var app_id = sessionStorage.getItem('_ai')
          return $http.get('/api/notifications/' + app_id).then(function(res){
            return res.data
          })
        }

        function getOfficers(){
          return $http.get('/api/employees').then(function(res){
            return res.data
          })
        }

        function getDocsByOfficerId( id ){
          return $http.get('/api/employees/' + id + '/documents')
        }

        function initModal() {
          return false
        }

        function createOfficer( officer ){
          return $http.post('/api/employees?traveling=true', officer).then(function(res){
            return res.data
          })
        }

        function getAllowances() {
          return $http.get('/api/allowances').then(function(res){
            return res.data
          })
        }
        /**
         * Get a list of classifications.
         */
        function getClassifications(){
          return $http.get('/api/classifications').then(function(res){
            return res.data
          })
        }

        function initOfficerForm(){
          return {
            name: '',
            email: '',
            classification: '',
            allowance_type: '',
            position: '',
            activity_id: '',
            insurance: new Date(),
            registration: new Date(),
            license: new Date(),
            fitness: new Date(),
            permission_date: new Date(),
            is_owner : true,
            comment: '',
            vehicle_required: false
          }
        }

        function getActivities(){
          return $http.get('/api/activities').then(function(res){
            return res.data
          })
        }

        function getOfficerById( id ){
          return $http.get('/api/employees/' + id).then(function(res){
            return res.data
          })
        }

        function createEmployeeUpdate( data ){
          return{
            "id": data.id,
            "name": data.name,
            "email": data.email,
            "position": data.position,
            "classification_id": data.classification_id,
            "activity_id": data.activity_id,
            "allowance_type": data.allowance_type,
            "is_traveling" : data.is_traveling
          }
        }

        function createVehicleUpdate( data ){
          return {
            "id": data.vehicle_id,
            "plate": data.plate,
            "make": data.make,
            "model": data.model,
            "year": data.vehicle_year
          }
        }

        function createDocumentUpdate( data ){
          return {
            "id": data.id,
            "license": data.license,
            "insurance": data.insurance,
            "registration": data.registration,
            "fitness": data.fitness,
            "permission": data.permission_date,
            "comments": data.comments
          }
        }

        function createDocUpdate( data, type, id){
          switch (type) {
            case 'license': return { "employee_id": data.id,
                                     "expiry_date": data.license,
                                     "id": id }
            break;
            default:
          }
        }

        function update( officer, section, type, id){
          var data = {}, url = '/api/employees/' + officer.id
          if(section == 'employee'){
            data = createEmployeeUpdate( officer )
          }else if(section == 'remove-officer') {
            officer.is_traveling = 'F'
            data = createEmployeeUpdate(officer)
          }
          return $http.put(url, data).then(function(res){
            return res.data
          })
        }

        function updateVehicle( officer ){
          var data = createVehicleUpdate( officer )
          return $http.put('/api/vehicles/' + officer.vehicle_id, data).then(function(res){
            return res.data
          })
        }

        function updateDoc( doc ){
          return $http.put('/api/documents/' + doc.id, doc).then(function(res){
            return res.data
          })
        }

        function getExpiredDocs(){
          return $http.get('/api/expired').then(function(res){
            return res.data
          })
        }

        function removeOfficer( id ){
          return $http.put('/api/employees/' + id, {'is_traveling': 'F'}).then(function(res){
            return res.data
          })
        }
        /**
         * [checkSection description]
         * @param  {[type]} section [description]
         * @return {[type]}         [description]
         */
        function checkSection( section ){
          var sections = ['remove-officer']
          return (sections.indexOf(section) > -1) ? true : false
        }

        function compareString( arg, arg1 ){
          return arg.toLowerCase() == arg1.toLowerCase()
        }

        function sendNotification( docs ){
          var app_id = sessionStorage.getItem('_ai')
          return $http.post('/api/notify/' + app_id, docs).then(function(res){
            return res.data
          })
        }

    }
})();
