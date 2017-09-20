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
    cb(null, employee[0])
  })
}

exports.update = (options, cb)=>{
  model.query(options, (err, result)=>{
    if(err) return cb(err)
    cb(null, result)
  })
}

exports.build = ( data )=>{
  return {
    'name': data.name,
    'email': data.email,
    'is_traveling': 'T',
    'emp_type': 'P',
    'start_date': new Date(),
    'end_date': new Date(), //TODO should allow for currently employeed
    'allowance_type': data.allowance_type,
    'affiliation': 'blank',
    'activity_id': data.activity_id,
    'classification_id': data.classification_id,
    'position': data.position
  }
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
