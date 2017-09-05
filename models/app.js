'use strict'

const model = require('./base').model

const SQL = {
    GET: 'SELECT acc.app_id, app.title, app.link, app.created_on FROM access AS `acc` INNER JOIN apps AS `app` ON acc.app_id = app.id WHERE acc.user_id = ?',
    CREATE: 'INSERT INTO apps SET ?',
    GETPERM: 'SELECT ?? FROM ?? WHERE ?? = ? AND ?? = ?'
}
/**
 * Get a list of apps based on user id
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
exports.index = (user_id, cb)=>{
  let options = {
    sql: SQL.GET,
    values: [ user_id]
  }

  model.query(options, (err, apps)=>{
    if(err) return cb(err)
    cb(null, apps)
  })
}

exports.create = ( app, cb)=>{
  model.insert(SQL.CREATE, app, (err, result)=>{
    if(err) return cb(err)
    cb(null, result)
  })
}

exports.show = (user_id, app_id, cb)=>{
  let options = {
    sql: SQL.GETPERM,
    values: ['permission', 'access', 'user_id', user_id, 'app_id', app_id]
  }
  model.query(options, (err, access)=>{
    if(err) return cb(err)
    cb(null, access[0])
  })
}
