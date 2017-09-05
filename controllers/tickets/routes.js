'use strict'
const express = require('express'),
      api = require('./ctrl')

let router = express.Router()

router.post('/tickets', api.tickets.create)
router.get('/tickets', api.tickets.index)

module.exports = router
