(function() {
    'use strict';

    angular
        .module('core.search')
        .controller('Search', Search);

    Search.$inject = ['$http', '$routeParams'];

    /* @ngInject */
    function Search($http, $routeParams) {
        var vm = this;

        activate();

        function activate() {
          var query = $routeParams.q || ''
          if(typeof query != 'undefined' || query != ''){
            $http.get('/api/search?app=1&q=' + query).then(function(res){
              vm.results = res.data
            }).catch(function(err){
              vm.resuls = []
            })
          }
        }
    }
})();
