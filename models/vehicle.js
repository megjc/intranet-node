'use strict'
const model = require('./base').model
const SQL = {
  CREATE: 'INSERT INTO vehicles SET ?'
}

exports.create = (vehicle, cb)=>{
  model.insert(SQL.CREATE, vehicle, (err, result)=>{
    if(err) return cb(err)
    cb(null, result)
  })
}

exports.update = ( options, cb)=>{
  model.query(options, (err, result)=>{
    if(err) return cb(err)
    cb(null, result)
  })
}
