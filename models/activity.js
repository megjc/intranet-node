'use strict'
const model = require('./base').model
const SQL = {
    GET: 'SELECT id, ref_code, title FROM activities ORDER BY title ASC'
}
/**
 * Get a list of activities
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
exports.index = (cb)=>{
  let options = {
    values: [],
    sql: SQL.GET
  }
  model.query(options, (err, activities)=>{
    if(err) return cb(err)
    cb(null, activities)
  })
}
