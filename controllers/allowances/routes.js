'use strict'
const express = require('express'),
      api = require('./ctrl')

let router = express.Router()
//Show all officers with expired documents
router.get('/allowances', api.allowances.index)

module.exports = router
