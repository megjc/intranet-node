'use strict'
const express = require('express'),
      api = require('./ctrl')

let router = express.Router()

router.get('/token/verify', api.token.verify)

module.exports = router
