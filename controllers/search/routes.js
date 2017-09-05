'use strict'
const express = require('express'),
      api = require('./ctrl')

let router = express.Router()

router.get('/search', api.search.index)

module.exports = router
