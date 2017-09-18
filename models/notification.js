'use strict'

const model = require('./base').model

const SQL = {
    CREATE: 'INSERT INTO notifications SET ?',
    INDEX: 'SELECT id, emp_id, sent_by, receipent, created_on FROM notifications WHERE app_id = ?'
}

exports.create = (notification, cb)=>{
  model.insert(SQL.CREATE, notification, (err, result)=>{
    if(err) return cb(err)
    cb(null, result)
  })
}

exports.index = (options, cb)=>{
  options.sql = SQL.INDEX
  model.query(options, (err, result)=>{
    if(err) return cb(err)
    cb(null, result)
  })
}
