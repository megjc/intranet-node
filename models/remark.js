'use strict'

const model = require('./base').model

const SQL = {
    GET: 'SELECT id, title, amount, require_docs FROM allowances'
}
/**
 * Get a list of allowances
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
exports.show = (id, cb)=>{
  model.query(SQL.GET,(err, remark)=>{
    if(err) return cb(err)
    cb(null, allowances)
  })
}
