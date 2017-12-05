'use strict'
const express = require('express'),
      api = require('./ctrls')

let router = express.Router()
router.get('/', api.departments.index)
router.post('/', api.departments.findOrCreate)
router.get('/:ref_code', api.departments.show)
router.put('/:ref_code', api.departments.update)


module.exports = router
