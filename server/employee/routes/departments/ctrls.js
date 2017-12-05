/**
 * @author Tremaine Buchanan
 * @since 2017-12-04
 */
'use strict'
const shortid = require('shortid')
const moment = require('moment')
const knexfile = require('../../knexfile.js')
const knex = require('knex')(knexfile)

let departments = {
  /**
   * Get a list of all departments by a given criteria.
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}    a list of allowances
   */
  index: (req, res)=>{
    knex.select()
        .from('departments')
        .where(req.query)
        .then((list)=>{
          res.json(list)
        }).catch((err)=>{
          res.status(500).json(err.message)
        })
  },
  /**
   * Searches the database for an existing record.
   * If found, returns the record otherwise create the record.
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  findOrCreate: (req, res)=>{
    knex.select()
        .from('departments')
        .where({'title': req.body.title})
        .then((list)=>{
          if(list.length > 0){
            let message = {'text': req.body.title + ' already exists in database.', 'success': false}
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
   * Retrieves a department by reference code.
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  show: (req, res)=>{
    knex.select()
     .from('departments')
     .where({'ref_code': req.params.ref_code})
     .then(function(departments){
         if(departments.length < 1)
            return res.status(404)
                      .json({'text': 'Department with reference code '
                              + req.params.ref_code
                              + ' not found.', 'success': false
                            })
         res.json(departments[0])
   }).catch(function(err){
       res.status(500).json( err.message )
   })
  },
  /**
   * Updates a record given a reference code.
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  update: (req, res)=>{
    let department = req.body
    knex('departments')
    .where({'ref_code': req.params.ref_code})
    .update(department)
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
function create( department, cb ){
  department.ref_code = shortid.generate()
  knex('departments')
      .insert(department)
      .then(function(result){
        cb(null, result)
      }).catch(function(err){
        cb(err, null)
      })
}

exports.departments = departments
