(function() {
    'use strict';

    angular
        .module('apps.help')
        .service('helpService', helpService);

    helpService.$inject = ['$http'];

    /* @ngInject */
    function helpService($http) {
        var service = {
            initializeTicket: initializeTicket,
            isEmpty: isEmpty,
            getTicketTypes:getTicketTypes,
            getRequestTypes: getRequestTypes,
            showMessage:showMessage,
            createTicket: createTicket,
            showError:showError,
            validate: validate
        }

        return service

        function validate( email ){
          return $http.post('/api/validate', {'email': email})
        }

        function initializeTicket(){
          return {
              description: '',
              type_id: '',
              email: ''
          }
        }

        function isEmpty( obj ){ }

        function getTicketTypes(){
          return [
            {id: 1, title: "software issue"},
            {id: 2, title: "general computer issue"},
            {id: 4, title: "internet issue"},
            {id: 5, title: "printer issue"},
            {id: 6, title: "phone issue (CUG or desk phone)"},
            {id: 7, title: "unknown issue"},
            {id: 8, title: "setting up a new employee"},
            {id: 9, title: "making a change to the Ministry's website"},
            {id: 10, title: "setting up/configuring a closed user group cell phone"},
            {id: 11, title: "creating a custom application for our division/branch"},
            {id: 12, title: "setting up a projector/public announcement system"},
            {id: 13, title: "providing support at an event/meeting"},
            {id: 14, title: "other"}
          ]
        }

        function getRequestTypes( types ){
          return types.slice(6)
        }

        function showMessage( type ){
          return {
            success: false,
            message: 'Please review the form for errors'
          }
        }

        function createTicket( ticket ){
          if(ticket.description == "") ticket.description = "no description provided by user"
          return $http.post('/api/tickets', ticket)
        }

        function showError(){
          return {
            error: true,
            text: 'We are unable to submit your issue at this time.',
            show: true
          }
        }
    }
})();
