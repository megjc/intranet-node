'use strict'
const express = require('express'),
      api = require('./ctrl'),
      token = require('../../middlewares/token'),
      permission = require('../../middlewares/permission')

let router = express.Router()
router.get('/apps', token.validate, api.apps.index)
router.get('/apps/:dn', token.validate, permission.validate, api.apps.byDN)
router.post('/apps/grant_access', token.validate, permission.validate, api.apps.grantAccess)
router.get('/apps/:id/permissions', token.validate, api.apps.getPermissions)
module.exports = router
