'use strict'
const model = require('./base').model
const SQL = {
    GET: 'SELECT id, title, amount FROM allowances'
}
/**
 * Get a list of allowances
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
exports.index = (cb)=>{
  model.query(SQL.GET, (err, allowances)=>{
    if(err) return cb(err)
    cb(null, allowances)
  })
}
