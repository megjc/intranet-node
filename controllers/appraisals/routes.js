'use strict'
const express = require('express'),
      api = require('./ctrl')

let router = express.Router()
router.get('/appraisals', api.appraisals.index)
router.post('/appraisals', api.appraisals.create)
// router.get('/appraisals/:ref_code', api.appraisals.show)
// router.put('/appraisals/:ref_code', api.appraisals.update)

module.exports = router
