'use strict'
const express = require('express'),
      api = require('./ctrl')

let router = express.Router()
router.get('/logs', api.logs.index)
router.post('/logs', api.logs.create)

module.exports = router
