'use strict'
const model = require('./base').model
const SQL = {
    CREATE:"INSERT INTO employees SET ?"
}
/**
 * Get a list of travelling officers with expired documents
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
exports.index = (options, cb)=>{
  model.query(options, (err, employees)=>{
    if(err) return cb(err)
    cb(null, employees)
  })
}

exports.create = (employee, cb)=>{
  model.insert(SQL.CREATE, employee, (err, result)=>{
    if(err) return cb(err)
    cb(null, result)
  })
}
/**
 * Retrieve a travelling officer by id
 * @param  {[type]}   id [description]
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
exports.show = (options, cb)=>{
  model.query(options, (err, employee)=>{
    if(err) return cb(err)
    cb(null, employee)
  })
}

exports.update = (options, cb)=>{
  model.query(options, (err, result)=>{
    if(err) return cb(err)
    cb(null, result)
  })
}

function _determineEmployeeType(type){
  let employee_type = false
  switch (type) {
    case 'contract': employee_type = 'C'
      break;
    case 'temporary': employee_type = 'T'
      break;
    case 'permanent': employee_type = 'P'
      break;
    default: employee_type = false //TODO determine what the default value
  }
  return employee_type
}
