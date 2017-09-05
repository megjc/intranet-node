/**
 * @author Tremaine Buchanan
 * @since 2017-06
 */
'use strict'
/**
 * Extracts value of filter query.
 * @param  {[type]} query [description]
 * @return {[type]}       [description]
 */
exports.extractFilters = (query)=>{
  let filters = []
  if(query.hasOwnProperty('filter')){
    switch (query.filter) {
      case 'travel_officer':
            filters.push('travel_officer')
            filters.push(1)
        break;
      default:
    }
  }
  return filters
}
