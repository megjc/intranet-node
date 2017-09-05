/**
 * Handles all token requests.
 * @author Tremaine Buchanan
 * @since 2017-06-19
 */
'use strict'
const tokenLib = require('../../libs/token'),
      error = require('../../libs/error').error

let token = {
  /**
   * @desc Verifies a token.
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  verify: (req, res)=>{
    let jwt = tokenLib.extractHeader( req, 'Authorization' )

    if(jwt == false) return res.status(403).json(error.UNAUTHORIZED)

    tokenLib.verify( jwt, (err, data)=>{
      if( err != null ) return res.status(403).json(error.UNAUTHORIZED)

      return res.json(true)
    })
  }
}

exports.token = token
