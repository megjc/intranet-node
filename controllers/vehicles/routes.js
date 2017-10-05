'use strict'
const express = require('express'),
      api = require('./ctrl')

let router = express.Router()
router.put('/vehicles/:id', api.vehicles.update)
router.post('/vehicles', api.vehicles.create)

module.exports = router
