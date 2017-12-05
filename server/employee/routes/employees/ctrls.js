/**
 * @author Tremaine Buchanan
 * @since 2017-12-04
 */
'use strict'
const shortid = require('shortid')
const moment = require('moment')
const knexfile = require('../../knexfile.js')
const knex = require('knex')(knexfile)

let employees = {
  /**
   * Get a list of all employees by a given criteria.
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}    a list of allowances
   */
  index: (req, res)=>{
    knex.select()
        .from('employees')
        .where(req.query)
        .then((list)=>{
          res.json(list)
        }).catch((err)=>{
          res.status(500).json(err.message)
        })
  },
  /**
   * Searches the database for an employee's record.
   * If found, returns the record otherwise create the record.
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  findOrCreate: (req, res)=>{
    knex.select()
        .from('employees')
        .where({'first_name' : req.body.first_name,
                'middle_name': req.body.middle_name,
                'last_name'  : req.body.last_name
        }).then((list)=>{
          if(list.length > 0){
            let message = {'text': req.body.first_name + ' ' + req.body.last_name + ' already exists in database.', 'success': false}
            return res.status(400).json(message)
          }
          create(req.body, (err, result)=>{
              if(err || !result) return res.status(400).json(err)
              return res.json(result)
          })
        }).catch((err)=>{
          res.status(500).json(err.message)
        })
  },
  /**
   * Retrieves an employee by reference code.
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  show: (req, res)=>{
    knex.select()
     .from('employees')
     .where({'ref_code': req.params.ref_code})
     .then(function(employees){
         if(employees.length < 1)
            return res.status(404)
                      .json({'text': 'Employee with reference code '
                              + req.params.ref_code
                              + ' not found.', 'success': false
                            })
         res.json(employees[0])
   }).catch(function(err){
       res.status(500).json( err.message )
   })
  },
  /**
   * Updates an employee's record given a reference code.
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  update: (req, res)=>{
    let employee = req.body
    if(employee.hasOwnProperty('dob'))
       employee.dob = moment(employee.dob).format('YYYY-MM-DD')
    if(employee.hasOwnProperty('hire_date'))
       employee.hire_date = moment(employee.hire_date).format('YYYY-MM-DD')

    knex('employees')
    .where({'ref_code': req.params.ref_code})
    .update(employee)
    .then(function(result){
      if(!result) return res.status(400).json({'text': 'Update was not successful', 'success': false})
      res.json({'text': 'Update was successful', 'success': true})
    }).catch(function(err){
      res.status(500).json( err.message )
    })
  }
}
/**
 * Creates an employee's record
 * @param  {[type]}   employee [description]
 * @param  {Function} cb       Callback function to handle result of insert operation
 */
function create( employee, cb ){
  employee.ref_code = shortid.generate()
  employee.dob = moment(employee.dob).format('YYYY-MM-DD')
  employee.hire_date = moment(employee.hire_date).format('YYYY-MM-DD')
  knex('employees')
      .insert(employee)
      .then(function(result){
        cb(null, result)
      }).catch(function(err){
        cb(err, null)
      })
}

exports.employees = employees
