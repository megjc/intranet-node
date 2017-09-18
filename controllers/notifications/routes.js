'use strict'
const express = require('express'),
      token = require('../../middlewares/token'),
      api = require('./ctrl')

let router = express.Router()
router.post('/notify/:app_id', token.validate, api.notifications.send)
router.get('/notifications/:app_id', token.validate, api.notifications.index)

module.exports = router
