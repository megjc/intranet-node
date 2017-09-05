(function() {
    'use strict';

    angular
        .module('apps.help')
        .controller('Help', Help);

  Help.$inject = ['$anchorScroll', '$scope', 'helpService']

    /* @ngInject */
    function Help($anchorScroll, $scope, helpService) {
        var vm = this
        vm.submit = submitTicket
        vm.cancel = cancel
        vm.select = select

        activate()

        function activate(){
          vm.ticket = helpService.initializeTicket()
          vm.ticket_types = helpService.getTicketTypes()
          vm.requests = helpService.getRequestTypes(vm.ticket_types)
        }

        function submitTicket(){
            helpService.createTicket( vm.ticket ).then(function(res){
              vm.message = {
                success: res.data.success,
                text: res.data.text,
                show: true
              }
              if(res.data.success == true) {
                vm.ticket = helpService.initializeTicket()
                vm.type = ""
                $scope.ticketSubForm.$setUntouched()
              }
            }).catch(function(error){
              vm.message = helpService.showError()
            })
          $anchorScroll()
        }

        function cancel(){
          vm.ticket = helpService.initializeTicket()
        }

        function select(value){
          vm.ticket.type_id = value.id
        }
    }
})();
