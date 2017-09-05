'use strict'
const employee = require('../../models/employee')
const document = require('../../models/document')
const vehicle = require('../../models/vehicle')
const filter = require('../../libs/filter')
const moment = require('moment')
const SQL = require('../../libs/sql').statements

let employees = {
  /**
   * Get a list of all employees
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}    a list of travelling officers
   */
  index: (req, res)=>{
    employee.index(res.locals.options, (err, employees)=>{
      if(err) return res.json(err)
      return res.json(employees)
    })
  },
  show: (req, res)=>{
    let options = {
      values: ['employees', req.params.id],
      sql: SQL.SHOW
    }
    employee.show(options, (err, employee)=>{
      if(err) return res.json(err)
      document.index(req.params.id, (err, docs)=>{
        if(err) employee[0].docs = []
        employee[0].docs = docs
        res.json(employee[0])
      })
    })
  },
  create: (req, res)=>{
    if(req.query.traveling){
      if(req.query.traveling == 'true'){
        let emp = {
          'name': req.body.name,
          'email': req.body.email,
          'is_traveling': 'T',
          'emp_type': 'P',
          'start_date': new Date(),
          'end_date': new Date(), //TODO should allow for currently employeed
          'allowance_type': req.body.allowance_type,
          'affiliation': 'blank',
          'activity_id': req.body.activity_id,
          'classification_id': req.body.classification_id,
          'position': req.body.position
        }
        employee.create(emp, (err, id)=>{
          if(err) return res.status(400).json({text:"We were unable to create traveling officer.", success: false, 'err': err})
          if(req.body.vehicle_required == true){
            let documents = createDocuments({
              'license': moment(req.body.license).format("YYYY-MM-DD HH:mm:ss"),
              'insurance': moment(req.body.insurance).format("YYYY-MM-DD HH:mm:ss"),
              'fitness': moment(req.body.fitness).format("YYYY-MM-DD HH:mm:ss"),
              'registration': moment(req.body.registration).format("YYYY-MM-DD HH:mm:ss"),
              'permission': moment(req.body.permission_date).format("YYYY-MM-DD HH:mm:ss"),
              'is_owner': req.body.is_owner.toString(),
              'id': id.insertId })
            document.create(documents, (err, result)=>{
              if(err) return res.json(err)
                let vehicle_details = {
                  'emp_id': id.insertId,
                  'make': req.body.make,
                  'model': req.body.model,
                  'year': req.body.vehicle_year,
                  'plate': req.body.plate,
                  'comments': req.body.comment || '',
                  'is_owner': req.body.is_owner.toString()
                }
              vehicle.create(vehicle_details,(err, result)=>{
                if(err) return res.json(err)
                return res.json({text: 'Traveling officer successfully created.', success: true})
              })
            })
          }else{
            return res.json({text: 'Traveling officer successfully created.', success: true})
          }
        })
      }
    }
  },
  /**
   * Retrieve all documents for a travelling officer
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     a list of documents
   */
  documents: (req, res)=>{
    document.index(req.params.id, (err, documents)=>{
      if(err) return res.json(err)
      res.json(documents)
    })
  },
  update: (req, res)=>{
    let options = {
     sql: SQL.UPDATE,
     values: [req.body.name, req.body.email, req.body.position, req.body.classification_id, req.body.activity_id, req.body.allowance_type, req.body.id]
    }
    employee.update(options, (err, result)=>{
      if(err) return res.status(400).json({'text': 'Error in updating record', 'err': err, 'success': false})
      res.json({'text': "Your update was completed successfully", success:true})
    })
  },
  expired: (req, res)=>{
    let options = {
      sql: SQL.EXPIREDDOCS,
      values: []
    }
    employee.index(options, (err, employees)=>{
      if(err) return res.status(400).json({'text': 'Error in listing employees with expired documents', 'success': false, 'err': err})
      res.json(employees)
    })
  }
}

let documents = {
  index: (req, res)=>{

    res.json('Get all expired documents')
  }
}

function createDocuments( docs){
  let documents = [
    ["driver's license", docs.license, docs.id , null, 2],
    ['certificate of fitness', docs.fitness, docs.id, null, 2],
    ['motor vehicle registration', docs.registration, docs.id, null, 2],
    ['certificate of insurance', docs.insurance, docs.id, null, 2]
  ]
  if(docs.is_owner == "false"){
    documents.push(['permission for vehicle use', docs.permission, docs.id, null, 2])
  }
  return documents
}

function createVehicle( vehicle ){
  // if(vehicle.is_owner == true){
  //   vehicle.permission = "0000-00-00 00:00:00"
  // return vehicle
}

exports.employees = employees
exports.documents = documents
