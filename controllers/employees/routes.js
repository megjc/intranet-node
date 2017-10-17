'use strict'
const express = require('express'),
      api = require('./ctrl'),
      token = require('../../middlewares/token'),
      query = require('../../middlewares/query'),
      logic = require('../../middlewares/logic/employee').Employee

let router = express.Router()
//Show all officers with expired documents
router.get('/employees', token.validate, api.employees.index)
router.post('/employees', token.validate, api.employees.create)
//Retrieve an officer by id
router.get('/employees/:id', token.validate, api.employees.show)
//Retrieve a list of documents for a travelling officer
router.get('/employees/:id/documents', token.validate, api.employees.documents)
router.put('/employees/:id', token.validate, api.employees.update)
router.get('/expired', token.validate, api.employees.expired)

router.post('/contract-employees', token.validate, api.employees.createContract)
router.put('/contract-employees/:id', token.validate, api.employees.updateContract)

module.exports = router
