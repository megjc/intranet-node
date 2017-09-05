'use strict'
const express = require('express'),
      api = require('./ctrl')

let router = express.Router()
router.put('/documents/:id', api.documents.update)

module.exports = router
