'use strict'
const email = require('../../libs/email').email,
      ldap = require('../../libs/ldap'),
      error = require('../../libs/error').error,
      User = require('../../models/user')

let users = {
  /**
   * @desc Authenticates a user.
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  authLDAP: (req, res)=>{
    if(req.body.name == '' || req.body.password == '')
        return res.status(400).json(error.EMPTY_VALUES)

    if(req.body.name == '' && req.body.password == '')
        return res.status(400).json(error.EMPTY_VALUES)

    ldap.auth(req.body.name, req.body.password, (err, token)=>{
      if(err != null) return res.status(400).json(error.BAD_REQUEST)
      res.json({success: true, token: token, message: 'Login successful.'})
    })
  },
  create: (req, res)=>{
    //TODO move to model
    let user = {
      dn: req.body.dn,
      dept_id: 3,
      uname: req.body.uname,
      active: 1,
      type_id: 2,
      created_on: new Date()
    }
    User.create(user, (err, result)=>{
      if(err) return res.json(err)
      return res.json({success: true, id: result.insertId, message: 'User successfully added ' + result.insertId})
    })
  },
  /**
   * [index description]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  index: (req, res)=>{
    User.index((err, users)=>{
      if(err != null) return res.status(400).json(err)
      res.json(users)
    })
  },
  ldap: (req, res)=>{
    ldap.index((err, users)=>{
      if(err != null) return res.status(400).json(err)
      res.json(users)
    })
  },
  /**
   * Get the username
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  me: (req, res)=>{
    let dn = res.locals.decoded
    let arr = dn.split(',')
    let cn = arr[0].split('=')
    return res.json(cn[1])
  },
  admin: (req, res)=>{
    User.get(res.locals.decoded, (err, result)=>{
      if(err) return res.status(400).json(err)
      if(result.type_id != 1) return res.json({succes: false, })
      return res.json({success: true})
    })
  }
}

exports.users = users
