/**
 * @desc Library to handle generating json web tokens
 * and encryting strings.
 * @author Tremaine Buchanan
 * @since 2017-06-18
 */
'use strict'
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const config = { expiresIn: process.env.JOT_EXPIRESIN}
/**
 * @desc Encrypts and sign an non empty claim.
 * @param  string claim String to be encrypted.
 * @return string Signed json web token
 */
exports.sign = ( claim )=>{
    return jwt.sign( {data: claim}, process.env.JOT_KEY, config )
}
/**
 * @desc Verifies a token.
 * @param  string   token
 * @param  {Function} cb    [description]
 * @return {[type]}         [description]
 */
exports.verify = ( token, cb) =>{
  jwt.verify(token, process.env.JOT_KEY, (err, decoded)=>{
    if(err) return cb(err, null)
    cb(null, decoded.data)
  })
}
/**
 * @desc Encrypts a string.
 * @param       string payload A string to be encrypted.
 * @return     string An encrypted string value.
 */
exports.encrypt = ( payload )=>{
  let cipher = crypto.createCipher(process.env.CRYPTO_ALGO, process.env.JOT_KEY),
      encrypted = cipher.update( payload, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}
/**
 * Decrypts a paylod.
 * @param  string payload - String to be decrypted.
 * @return string deciphered decrypted data.
 */
exports.decrypt = ( payload )=>{
  let decipher = crypto.createDecipher(process.env.CRYPTO_ALGO, process.env.JOT_KEY),
      deciphered = decipher.update( payload, 'hex', 'utf8')
  deciphered += decipher.final('utf8')
  return deciphered
}
/**
 * @desc Extracts data from headers.
 * @param  {[type]} request [description]
 * @param {[type]} type Name of header
 * @return {[type]}         [description]
 */
exports.extractHeader = ( request, type )=>{
  let header = request.get(type)
  if(typeof header == 'undefined') return false

  let contents = header.split(' ')
  if(typeof contents[1] == 'undefined') return false

  return contents[1]
}
