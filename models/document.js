'use strict'

const model = require('./base').model

const SQL = {
    GET: 'SELECT id, title, expiry_date FROM ?? WHERE ?? = ?',
    CREATE: 'INSERT INTO documents (title, expiry_date, employee_id, created_on, created_by) VALUES ?',
    GETDOCS: 'SELECT id, first_name, last_name, position, (SELECT COUNT(id) FROM documents WHERE employee_id = employees.id ) as docs FROM employees WHERE ?? = ?',
    GETEXPIRED: 'SELECT id, first_name, last_name, position, (SELECT COUNT(id) FROM documents WHERE employee_id = employees.id AND expires_on < NOW() ) as expired_docs FROM employees WHERE ?? = ? HAVING expired_docs > 0'
}
/**
 * Get a list of documents for a travelling officers.
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
exports.index = (id, cb)=>{
  let options = {
    sql: SQL.GET,
    values: ['documents', 'employee_id', id]
  }
  model.query(options, (err, docs)=>{
    if(err) return cb(err)
    cb(null, docs)
  })
}

exports.create = (doc, cb)=>{
  model.insert(SQL.CREATE, [doc], (err, result)=>{
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
