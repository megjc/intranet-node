'use strict'

const App = require('../../models/app'),
      User = require('../../models/user')

let apps = {
  /**
   * Get a list of all apps
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}    a list of apps
   */
  index: (req, res)=>{
   _getUserByDn(res.locals.decoded, (err, id)=>{
       App.index(id[0].id, (err, apps)=>{
         if(err) return res.json(err)
         return res.json(apps)
       })
    })
  },
  byDN: (req, res)=>{
    _getUserByDn(req.params.dn, (err, id)=>{
      if(id.length > 0){
        App.index(id[0].id, (err, apps)=>{
          if(err) return res.json(err)
          return res.json(apps)
        })
      }else{
        return res.json(id)
      }
    })
  },
  grantAccess: (req, res)=>{
      let app = {
        app_name: req.body.app_name,
        user_id: req.body.uid,
        added_by: 2,
        added_date: new Date(),
        link: 'dashboard/apps/tod/officer-listing',
        icon: 'blank'
      }
      App.create(app, (err, result)=>{
        if(err) return res.json(err)
        return res.json({message: 'Access successfully granted.', success: true, id: result.insertId})
      })
  },
  getPermissions: (req, res)=>{
    _getUserByDn(res.locals.decoded, (err, id)=>{
      App.show(id[0].id, req.params.id, (err, result)=>{
        if(err) return res.json('Error in retrieving permission')
        let permission = _extractPermission(req.query.type, result.permission)
        res.json(permission)
      })
    })
  }
}

function _getUserByDn(dn, cb){
  User.show(dn, (err, user)=>{
    cb(null, user)
  })
}

function _extractPermission(type, value){
  let permission = false
  if(type == 'create'){
    if(value == 2 || value == 3 || value == 6 || value == 7)
      permission = true
  }

  if(type == 'read'){
    if(value == 7 || value == 6 || value == 5 || value == 4)
      permission = true
  }

  if(type == 'update'){
    if(value == 7 || value == 5 || value == 3 || value == 1)
      permission = true
  }
  return permission
}

exports.apps = apps
