'use strict'
const model = require('./base').model
const SQL = {
    INDEX: 'SELECT users.id, users.dept_id, departments.name, users.dn, users.uname, users.created_on, users.active FROM ?? INNER JOIN departments ON users.dept_id = departments.id ORDER BY users.uname ASC',
    GET: 'SELECT id FROM ?? WHERE ?? = ?',
    GETBYDN: 'SELECT type_id FROM users WHERE dn = ?',
    CREATE: 'INSERT INTO users SET ?'
}
/**
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
exports.show = (dn, cb)=>{
  let options = {
    sql: SQL.GET,
    values: ['users', 'dn', dn]
  }
  model.query(options, (err, result)=>{
    if(err) return cb(err)
    cb(null, result)
  })
}
/**
 * [index description]
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
exports.index = (cb)=>{
  let options = {
    sql: SQL.INDEX,
    values: ['users']
  }
  model.query(options, (err, results)=>{
    if(err) return cb(err)
    cb(null, results)
  })
}

exports.get = (dn, cb)=>{
  let options = {
    sql: SQL.GETBYDN,
    values: [dn]
  }
  model.query(options, (err, result)=>{
    if(err) return cb(err)
    cb(null, result[0])
  })
}

exports.create = (user, cb)=>{
  model.insert(SQL.CREATE, user, (err, id)=>{
    if(err) return cb(err)
    cb(null, id)
  })
}
