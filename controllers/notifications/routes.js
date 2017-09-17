'use strict'
const express = require('express'),
      api = require('./ctrl')

let router = express.Router()
router.post('/notify', api.notifications.send)

module.exports = router
