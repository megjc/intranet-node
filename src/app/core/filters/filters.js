(function() {
  'use strict';

  angular
      .module('core.filters', [])
      .filter('charAt', charAt)
      .filter('replaceWith', replaceWith)
  /**
   * Filter function used to return the
   * first letter of a string.
   * @return string The first character of the string.
   */
  function charAt() {
      return function( arg ){
        return arg.charAt(0).toUpperCase()
      }
  }
  /**
   * Checks string
   * @return {Boolean} [description]
   */
  function replaceWith() {
    return function ( string, compareWith, newVal) {
      if(string === compareWith) return newVal
      else return string
    }
  }
})();
