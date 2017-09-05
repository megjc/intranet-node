'use strict'
const SQL = require('../libs/sql').statements
const KEYS = {
  'type': 'emp_type',
  'traveling': 'is_traveling'
}
const VALUES = {
  'temporary': 'T',
  'permanent': 'P',
  'contract': 'C',
  'true': 'T',
  'false': 'F'
}
const DEFAULT_OPTIONS = {
  values: [],
  sql: SQL.GET
}
//TODO - emit events for errors
exports.build = (req, res, next)=>{
    let valid_fields = ['type', 'traveling'],
        values = [],
        fields = req.query
    if(!isObjectEmpty(fields)){
      for(var key in fields){
        if(fields[key] != ''){
          if(valid_fields.includes(key)){
            values.push(resolve(key, KEYS))
            values.push(resolve(fields[key], VALUES))
          }else{
            return res.status(400).json({message: 'Invalid parameters', success: false})
          }
        }else{
          return res.status(400).json({message: 'Invalid parameters', success: false})
        }
      }
    }else{
      res.locals.options = DEFAULT_OPTIONS
    }
    res.locals.options = determineSQLQuery(values)
    next()
}

function isObjectEmpty( obj ){
  for(var key in obj ){
    if(obj.hasOwnProperty(key)){
      return false
    }
  }
  return true
}

function determineSQLQuery( values ){
  let options = {
    'values': values,
    'sql': ''
  }
  if(values.length == 0) options.sql = SQL.GET
  else options.sql = SQL.GETBYTYPE
  return options
}

function resolve( q, list ){
  let resolved = ''
  for(var key in list){
    if(q == key) resolved = list[key]
  }
  return resolved
}
