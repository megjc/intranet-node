/**
 * @desc Close button directive.
 * @author Tremaine Buchanan
 * @since 2017-06-21
 */
'use strict'

angular.module('core.directives',[]).directive('closeBtn', closeBtn)
/**
 * Attribute used to hide a Bulma modal or message.
 * Identifies the parent then adds or removes
 * class accordingly.
 * Usage <button close-btn></button>
 */
function closeBtn() {

  var directive = {
    link:link,
    restrict: 'A'
  }

  return directive

  function link(scope, ele, attrs, ctrl) {
      ele.bind('click', close)

      function close(e){
        var parent = ele.parent(),
            className = parent[0].className

        if(className.indexOf('modal') != -1){
          parent.removeClass('is-active')
        }else{
          parent.addClass('hide')
        }
      }
  }
}
