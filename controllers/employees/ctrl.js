'use strict'
const employee = require('../../models/employee')
const document = require('../../models/document')
const vehicle = require('../../models/vehicle')
const filter = require('../../libs/filter')
const moment = require('moment')
const SQL = require('../../libs/sql').statements
const logic = require('../../middlewares/logic/employee').Employee
const _ = require('underscore')
const emitter = require('../../libs/event')

let employees = {
  /**
   * Get a list of all employees
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}    a list of travelling officers
   */
  index: (req, res)=>{
    let options = logic.buildQuery(req.query)
    employee.index(options, (err, employees)=>{
      if(err) return res.json(err)
      return res.json(employees)
    })
  },
  /**
   * Retrieves an employee record by id
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {Object} employee - An employee object
   */
  show: (req, res)=>{
    let options = logic.buildIdQuery( req.params.id )
    //emitter.emitEvent('eventA')
    employee.show(options, (err, employee)=>{
      if(err) return res.json(err)
      document.index(req.params.id, (err, docs)=>{
        if(err) employee.docs = []
        employee.docs = docs
        res.json(employee)
      })
    })
  },
  create: (req, res)=>{
    if(req.query.traveling){
      if(req.query.traveling == 'true'){
        let emp = employee.build( req.body )
        employee.create(emp, (err, id)=>{
          //TODO remove messages to own library
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
                let vehicle_details = document.build( req.body, id.insertId)
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
  createContract: (req, res)=>{
    var contract_employee = req.body
    contract_employee.start_date = moment(req.body.start_date).format("YYYY-MM-DD HH:mm:ss")
    contract_employee.end_date = moment(req.body.end_date).format("YYYY-MM-DD HH:mm:ss")
    contract_employee.affiliation = 'blank'
    employee.create(contract_employee, (err, id)=>{
      if(err) return res.status(400).json({
        'text': 'Error in creating employee',
        'success': false,
        'error': err
      })
      res.json({'text': 'Employee successfully created', success: true})
    })
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
     values: [req.body.name,
              req.body.email,
              req.body.position,
              req.body.classification_id,
              req.body.activity_id,
              req.body.allowance_type,
              req.body.is_traveling,
              req.body.id]
    }
    employee.update(options, (err, result)=>{
      if(err) return res.status(400).json({'text': 'Error in updating record', 'err': err, 'success': false})
      res.json({'text': "Your update was completed successfully.", success:true})
    })
  },
  updateContract: (req, res)=>{
    let options = {
       sql: SQL.UPDATECONTRACT,
       values: [req.body.name,
                req.body.email,
                req.body.position,
                req.body.classification_id,
                req.body.activity_id,
                moment(req.body.start_date).format("YYYY-MM-DD HH:mm:ss"),
                moment(req.body.end_date).format("YYYY-MM-DD HH:mm:ss"),
                req.body.id
              ]
    }
    employee.update(options, (err, result)=>{
      if(err) return res.status(400).json({'text': 'Error in updating record', 'err': err, 'success': false})
      res.json({'text': "Your update was completed successfully.", success:true})
    })
  },
  expired: (req, res)=>{
    let options = {
      sql: SQL.EXPIREDDOCS,
      values: []
    }
    employee.index(options, (err, employees)=>{
      if(err) return res.status(400).json({'text': 'Error in listing employees with expired documents', 'success': false, 'err': err})
      /**
       * The list of employees with expired documents
       * returned from the database are not grouped by employee name.
       * The function _.groupedBy() from the underscore library
       * groups the employees list by name. The result is an object of
       * form {'name': [Object]}. The object is traversed and
       * an array of objects is created. Each object is of the form
       * {'key': 'value', 'docs': [Object]}
       */
      let employeesgroupedbyName = _.groupBy(employees, 'name'),
          employeesTransformed = []
      for( let employeeName in employeesgroupedbyName ){
        employeesTransformed.push({
          'employee_id': employeesgroupedbyName[employeeName][0].employee_id,
          'email': employeesgroupedbyName[employeeName][0].email,
          'classification': employeesgroupedbyName[employeeName][0].class_title,
          'department': employeesgroupedbyName[employeeName][0].act_title,
          'name': employeeName,
          'docs': employeesgroupedbyName[employeeName]
        })
      }
      res.json(employeesTransformed)
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
