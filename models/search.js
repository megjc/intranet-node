/**
 * @desc Search functionality
 * @author Tremaine Buchanan
 * @since 2017-06-22
 */
'use strict'
const model = require('./base').model
/**
 * TODO refractor endpoint
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
exports.index = (query, cb)=>{
  let options = "SELECT * FROM employees WHERE name LIKE '%" + query + "%' AND travel_officer = 1"
  model.query(options, (err, results)=>{
    if(err) return cb(err)
    cb(null, results)
  })
}
