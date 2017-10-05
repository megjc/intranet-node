'use strict'

const vehicle = require('../../models/vehicle'),
      SQL = require('../../libs/sql').statements,
      moment = require('moment')

let vehicles = {
  create: (req, res)=>{
    let mVehicle = {
      'emp_id': req.body.employee_id,
      'make': req.body.make,
      'model': req.body.model,
      'year': req.body.year,
      'plate': req.body.plate,
      'is_owner': 'true',
      'created_by': 2
    }
    vehicle.create(mVehicle, (err, result)=>{
      if(err) return res.json({'text': 'Whoops! An error occurred while creating a vehicle.', success:false, 'err': err})
      res.json({'text': 'Success! Vehicle was successfully created.', success: true})
    })
  },
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
