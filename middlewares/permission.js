/** Checks if user has sufficient permission to access endpoint
 * @author Tremaine Buchanan
 * @since 2017-06-18
 */
'use strict'

const User = require('../models/user'),
      error = require('../libs/error').error
/**
 * Checks if user has sufficient permissions to access
 * endpoint
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.validate = (req, res, next)=>{
  User.get(res.locals.decoded, (err, result)=>{
    if(result.type_id == 1){
      next()
    }else{
      res.status(401).json(error.PERMISSION.UNAUTHORIZED)
    }
  })
}
