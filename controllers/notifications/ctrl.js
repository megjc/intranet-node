'use strict'

const notification = require('../../libs/email'),
      moment = require('moment'),
      model = require('../../models/notification')

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

     notification.sendEmail( details, (error, result)=>{
      if(error) return res.json({text: 'Error in sending email', succes: false})

      let temp = res.locals.decoded.split(','),
          values = temp[0].split('='),
          notification_record = {'emp_id': request[0].employee_id, 'app_id': req.params.app_id, 'sent_by': values[1], 'receipent': request[0].name}

      model.create( notification_record, (err, result)=>{
        res.json({text: `Email successfully sent to ${request[0].name}.`, success: true})
      })
    })
  },
  index: (req, res)=>{
    model.index({values: [req.params.app_id]},(err, notifications)=>{
      if(err) return res.json({'text': 'Error in retrieving notifications', success: false, 'err': err})
      res.json(notifications)
    })
  }
}

exports.notifications = notifications
