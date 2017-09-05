/**
 * @desc Officer listing controller.
 * @author Tremaine Buchanan
 * @since 2017-06-22
 */
(function() {
    'use strict';

    angular
        .module('apps.tod')
        .controller('OfficerList', OfficerList);

  OfficerList.$inject = ['create', 'read', 'update', 'todSrv', '$location', 'officers']

    /* @ngInject */
    function OfficerList(create, read, update, todSrv, $location, officers) {
        var vm = this;
        vm.showDocs = showDocuments
        vm.showModal = false
        vm.query = ''
        vm.search = search
        var openDropdowns = []
        vm.canCreate = create
        vm.canRead = read
        vm.canUpdate = update
        activate()
        /**
         * Handles controller start up logic
         */
        function activate() {
          vm.officers = officers
        }
        /**
         * Retrieves documents for an employee by id and toggles
         * dropdown element.
         * @param  {[type]} officer [description]
         */
        function showDocuments( id ) {        //close other dropdowns
           todSrv.getDocsByOfficerId(id).then(function(res){
             toggle(id)
             openDropdowns.push(id)
             vm.documents = res.data
           })
        }
        /**
         * Toggles dropdown elements by id
         * @param  {[type]} id Dropdown id.
         */
        function toggle( id ) {
          if(openDropdowns.length != 0){
            closeDropDowns()
            document.getElementById(id).classList.toggle('show')
          }else{
            document.getElementById(id).classList.toggle('show')
          }
        }
        /**
         * Closes dropdown elements once a user clicks outside
         * the list item.
         * @param  {[type]} event [description]
         */
      window.onclick = function(event) {
        if (!event.target.matches('.src')) closeDropDowns()
      }
      /**
       * Closes all dropdown elements with class 'show'
       */
      function closeDropDowns( ){
        var i = 0, dropdown
        for(; i < openDropdowns.length; i++){
          dropdown = document.getElementById(openDropdowns[i])
          if(dropdown.classList.contains('show')){
            dropdown.classList.remove('show')
          }
        }
      }

      function search() {
        if(typeof vm.query != 'undefined')
          $location.url('/dashboard/apps/search?q=' + vm.query)
      }
    }
})();
