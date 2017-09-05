'use strict'

angular.module('apps.help').directive('hdAutoComplete', hdAutoComplete)
/**
 * Autocomplete input directive.
 * Usage <hd-auto-complete></hd-auto-complete>
 */

hdAutoComplete.$inject = ['$http', '$rootScope']

function hdAutoComplete($http, $rootScope) {

  var directive = {
    restrict: 'E',
    link:link,
    scope: {
      data: '='
    },
    template: getTemplate()
  }

  return directive

  function link(scope, ele, attrs, ctrl) {
    ele.bind('keyup', search)
    var input = ele.find('input')
    input.on('blur', function(){
      console.log('exit')
    })
    scope.select = select

    function select( data ){
      scope.query = data.name
      scope.show = !scope.show
      $rootScope.$broadcast('selected', scope.query)
    }

    scope.$on('submitted', function(event, obj){
      scope.query = ''
    })

    function search(){
      var results = ele[0].querySelector('results')
      var input = ele.find('input')
      if(scope.query.length > 4){
        $http
          .get('/api/users/search?q=' + scope.query)
          .then(function(res){
            if(res.data.length > 0){
              scope.show = !scope.show
              scope.results = res.data
            }
            // if(res.data.length == 0){
            //   scope.show = true
            // }
          }).catch(function(error){
            console.log(error)
          })
      }else{
         scope.show = false
         scope.results = []
         $rootScope.$broadcast('unselected', {})
     }
    }
  }

  function getTemplate(){
    return '<div class="field autocomplete"><p class="control">'+
            '<label class="label">My name is:</label>' +
            '<input class="input" type="text" placeholder="e.g. john brown" ng-model="query">' +
            '<div class="results" ng-show="show">'+
            '<p ng-repeat="result in results" ng-click="select(result)">{{result.name}}</p>' +
            '</div>'
  }
}
