'use strict'
const express = require('express'),
      api = require('./ctrl'),
      token = require('../../middlewares/token'),
      permission = require('../../middlewares/permission')

let router = express.Router()

router.post('/users/auth/ldap', api.users.authLDAP)
router.get('/users/me', token.validate, api.users.me)
//router.get('/users', api.users.index)
router.get('/users', token.validate, permission.validate, api.users.index)
router.get('/users/ldap', token.validate, permission.validate, api.users.ldap)
router.get('/users/admin', token.validate, permission.validate, api.users.admin)
router.post('/users', token.validate, permission.validate, api.users.create)

module.exports = router
