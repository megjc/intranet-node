'use strict'

const notification = require('../../libs/email'),
      moment = require('moment')
let notifications = {
  send: (req, res)=>{
    let request = req.body, docs = [], i = 0, len = request.length
    for(; i < len; i++){
      docs.push({
        'title': request[i].title,
        'expiry_date': moment(request[i].expiry_date).format('dddd, MMMM D, YYYY')
      })
    }
    let details = {
      'name': request[0].name,
      'email': request[0].email,
      'docs': docs
    }
    notification.sendEmail( details )
    res.json('notify')
  }
}

exports.notifications = notifications
