/**
 * @author Tremaine Buchanan
 * @since 2017-09
 * @desc Handles business logic for employee records
 */
'use strict'
const _ = require('underscore'),
     sql = require('../../libs/sql').statements

let Employee = (()=>{
  let _valid_params = ['type'],
      _employee_status = ['contract', 'permanent', 'temporary']
  /**
   * Produces a list of valid query parameters.
   * @param {Object[]} param_list - An array of query parameters extracted from the request.
   * @return {Object[]} list - Array of valid query keys.
   */
  function _validateQueryParams( param_list ){
    let i = 0, len = param_list.length, list = [], key
    for(; i < len; i++)
      if(_.contains(_valid_params, param_list[i])){
        list.push(param_list[i])
      }
    return list
  }
  /**
   * Builds a list of query key and valuess
   * @param       {[type]} list   [description]
   * @param       {[type]} values [description]
   * @return      {[type]}        [description]
   */
  function _buildQueryValues( list, values ){
     let i = 0, j = 0, len = list.length, query_values = [], key
     for(; i < len; i++){
        if(list[i] == 'type') key = 'emp_type'
        query_values.push(key)
        query_values.push(values[list[i]])
     }
     for(; j < query_values.length; j++){
       if(_.contains(query_values, _employee_status[j])){
         let k = _.indexOf(query_values, _employee_status[j])
         if(query_values[k] == 'contract') query_values[k] = 'C'
         else if (query_values[k] == 'permanent') query_values[k] = 'P'
         else if (query_values[k] == 'temporary') query_values[k] = 'T'
       }
     }
     return query_values
  }

  function buildQuery( request ){
    var list = _extractParams( request ),
         valid_params = _validateQueryParams( list ),
         query_values = _buildQueryValues( list, request )
    let len = query_values.length, options = { 'values': query_values }
    if(len == 0) options.sql = sql.GET
    else if(len > 0) options.sql = sql.GETTYPE
    return options
  }

  function buildIdQuery( id ){
    return {
      'values': ['employees', id],
      'sql': sql.SHOW
    }
  }
  /**
   * Extract query parameters from http request.
   * @param  {Object} params - A key/value object of query parameters
   * @return {Object[]} param_list - A list of extracted parameters
   */
  function _extractParams( request ){
    let param_list = [],
        empty_obj = _isObjectEmpty(request)

    if(!empty_obj){
      for(var key in request){
        param_list.push(key)
      }
    }
    return param_list
  }

  function _isObjectEmpty( obj ){
    for(var key in obj ){
      if(obj.hasOwnProperty(key)){
        return false
      }
    }
    return true
  }

  return {
    buildQuery: buildQuery,
    buildIdQuery: buildIdQuery
  }
})();

exports.Employee = Employee
