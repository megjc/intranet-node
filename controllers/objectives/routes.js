'use strict'
const express = require('express'),
      api = require('./ctrl')

let router = express.Router()
router.get('/objectives', api.objectives.index)
router.post('/objectives', api.objectives.create)
router.get('/objectives/:ref_code', api.objectives.show)
router.put('/objectives/:ref_code', api.objectives.update)

module.exports = router
