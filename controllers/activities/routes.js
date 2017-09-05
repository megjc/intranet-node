'use strict'
const express = require('express'),
      api = require('./ctrl')

let router = express.Router()
router.get('/activities', api.activities.index)

module.exports = router
