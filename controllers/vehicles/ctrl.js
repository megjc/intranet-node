'use strict'

const vehicle = require('../../models/vehicle'),
      SQL = require('../../libs/sql').statements,
      moment = require('moment')

let vehicles = {
  update: (req, res)=>{
    let options = {
      sql: SQL.UPDATEVEHICLE,
      values : [req.body.plate, req.body.make, req.body.model, req.body.year, parseInt(req.params.id)]
    }
    vehicle.update(options, (err, result)=>{
      if(err) return res.status(400).json({'text': 'Error in updating record', 'err': err, 'success': false})
      res.json({'text': "Your update was completed successfully", success:true})
    })
  }
}

exports.vehicles = vehicles
