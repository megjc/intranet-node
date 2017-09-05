'use strict'

const document = require('../../models/document'),
      SQL = require('../../libs/sql').statements,
      moment = require('moment')

let documents = {
  update: (req, res)=>{
    let options = {
      sql: SQL.UPDATEDOC,
      values : [moment(req.body.expiry_date).format("YYYY-MM-DD HH:mm:ss"), parseInt(req.params.id), req.body.employee_id]
    }
    document.update(options, (err, result)=>{
      if(err) return res.status(400).json({'text': 'Error in updating record', 'err': err, 'success': false})
      res.json({'text': "Your update was completed successfully", success:true})
    })
  }
}

exports.documents = documents
