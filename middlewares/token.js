/**
 * JSON Web Token validation middleware.
 * @author Tremaine Buchanan
 * @since 2017-06-18
 */
'use strict'

const libToken = require('../libs/token'),
      error = require('../libs/error').error

// exports.token = {
//   validate: validate
// }
/**
 * Verifies a json web token and decrypts its contents.
 * TODO - to be tested
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.validate = (req, res, next)=>{
  let authHeader = req.get('Authorization')
  if(typeof authHeader != 'undefined'){
    let jwt = authHeader.split(' ')
    libToken.verify(jwt[1], (err, decoded)=>{
      if(err != null) return res.status(400).json(error.TOKEN.BAD_REQUEST)
      res.locals.decoded = decoded
      next()
    })
  }else{
    return res.status(400).json(error.TOKEN.BAD_REQUEST)
    res.end()
  }
}
