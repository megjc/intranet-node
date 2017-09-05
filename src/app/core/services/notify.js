/**
 * @desc Notification service used to broadcast messages.
 * @author Tremaine Buchanan
 * @since 2017-06
 */
(function() {
    'use strict'
    angular.module('core.services').service('notify', notify)
    notify.$inject = ['$rootScope']
    /* @ngInject */
    function notify($rootScope) {
        var service = {
          subscribe:subscribe,
          emitEvent:emitEvent
        }
        return service
        /**
         * Registers an event on the $rootScope
         * @param  {[type]}   scope
         * @param  {string}   eventName - The event identifier
         * @param  {Function} cb - Callback function to be executed
         */
        function subscribe(scope, eventName, cb){
          var handler = $rootScope.$on(eventName, cb)
          scope.$on('$destroy', handler)
        }
        /**
         * Broadcasts the event to children scopes
         * @param  {string} eventName - The name of the event
         */
        function emitEvent(eventName){
          $rootScope.$emit(eventName)
        }
    }
})();
