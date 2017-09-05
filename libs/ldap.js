/**
 * @desc Authenticates a user against a LDAP server.
 * @author Tremaine Buchanan
 * @since 2017-06-18
 */
'use strict'
const ldapjs = require('ldapjs'),
      token = require('./token'),
      error = require('./error')

let client = ldapjs.createClient({
              url : process.env.LDAP_URL,
              timeout: 5000,
              connectTimeout: 10000,
              reconnect: true
          }),
    /**
     * LDAP server configuration object.
     */
    ldap_config = {
        admin: process.env.LDAP_ADMIN, //ldap administrative username
        pass: process.env.LDAP_PASS, //ldap administrative password
        suffix: process.env.LDAP_SUFFIX, //ldap dn string
        url: process.env.LDAP_URL //ldap server ip address or url
      },
      dn = null

/**
 * Attempts to bound a username and password against the LDAP server.
 * @param  {[type]}   args An array of user credentials.
 * @param  {Function} cb   Callback function
 * @return {[type]}        Callback invoked with null if successful, otherwise with error.
 */
function _bind(args, cb){
  client.bind(args[0], args[1], (err)=>{
    if(err != null) return cb('Not bound')
    cb(null)
  })
}
/**
 * [_unbind description]
 * @constructor
 * @return      {[type]} [description]
 */
function _unbind(){
  console.log('Unbinding')
  client.unbind()
}
/**
 * Searches the LDAP server.
 * @param string   query Name of LDAP user
 * @param function cb    Callback function
 */
function _search( query, cb ){
  let opts = {
      scope: 'sub',
      filter: '(name='+ query +')'
  }, dn = null

  client.search(ldap_config.suffix, opts, (err, result)=>{
    if(err != null) return cb('Unable to connect search')

    result.on('searchEntry', (entry)=>{
      dn = entry.dn
    })

    result.on('end', (entry)=>{
      if(dn == null) return cb('no user found', null)
      return cb(null, dn)
    })
  })
}

function _index( cb ){
  let opts = {
      scope: 'sub',
      filter: '(samaccountname=*)',
      attributes: ['cn', 'dn', 'email', 'mail']
  }, users = []

  client.search(ldap_config.suffix, opts, (err, result)=>{
    if(err != null) return cb('Unable to connect search')

    result.on('searchEntry', (entry)=>{
      if(entry) users.push(entry.object)
    })

    result.on('error', (err)=>{
      console.log('error in ldap' + err.message)
    })

    result.on('end', (entry)=>{
      return cb(null, users)
    })
  })
}
/**
 * @desc Authenticates a user's credentials.
 * @param  {[type]}   username LDAP username
 * @param  {[type]}   password LDAP user password
 * @param  {Function} cb       Callback function
 * @return {[type]}            Returns a signed json web token
 */
exports.auth = (username, password, cb)=>{
  //bind the admin user
  _bind([ldap_config.admin, ldap_config.pass],(err)=>{
    if(err != null) return cb('Unable to authenticate user', null)
    //search ldap for username
    _search(username, (err, dn)=>{
      if(err != null) return cb('no dn found', null)
      //once user dn is found, bound user to ldap using dn and password supplied
      _bind([dn, password], (err)=>{
        if(err != null) return cb('user with username not bound')
        //issue token containing dn
        _unbind()
        cb(null, token.sign(dn))
      })
    })
  })
}
/**
 * Retrieves a list of LDAP users
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
exports.index = (cb)=>{
_bind([ldap_config.admin, ldap_config.pass],(err)=>{
    if(err != null) return cb('Unable to authenticate user', null)
    _index((err, users)=>{
      _unbind()
      cb(null, users)
    })
  })
}
