'use strict'
const express = require('express'),
      api = require('./ctrls')

let router = express.Router()
router.get('/', api.employees.index)
router.post('/', api.employees.findOrCreate)
router.get('/:ref_code', api.employees.show)
router.put('/:ref_code', api.employees.update)


module.exports = router
