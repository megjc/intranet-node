'use strict'
const express = require('express'),
      api = require('./ctrl')

let router = express.Router()
router.get('/classifications', api.classifications.index)

module.exports = router
