(function() {
    'use strict';
    angular.module('core.services').service('common', common)
    //test.$inject = ['$http']
    /* @ngInject */
    function common($http) {
        var service = {
          getClassifications:getClassifications,
          getActivities: getActivities,
          findinList:findinList
        }

        return service
        /**
         * Get a list of classifications.
         */
        function getClassifications(){
          return $http.get('/api/classifications').then(function(res){
            return res.data
          })
        }

        function getActivities(){
          return $http.get('/api/activities').then(function(res){
            return res.data
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
    }
})();
