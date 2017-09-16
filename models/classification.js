'use strict'
const model = require('./base').model
const SQL = {
    GET: 'SELECT id, title FROM classifications ORDER BY title'
}
/**
 * Get a list of classifications
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
exports.index = (cb)=>{
  let options = {
    values: [],
    sql: SQL.GET
  }
  model.query(options, (err, classifications)=>{
    if(err) return cb(err)
    cb(null, classifications)
  })
}
