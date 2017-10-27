/**
 * @desc Main application entry point.
 * @author Tremaine Buchanan
 * @since 2017-06-22
 */
'use strict'
require('dotenv').config()
const express = require("express"),
    bodyParser = require("body-parser"),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    helmet = require('helmet'),
    app = express(),
    /**
     * Endpoints
     */
    admin = require('./admin'),
    apps = require('./controllers/apps/routes'),
    tickets = require('./controllers/tickets/routes'),
    users = require('./controllers/users/routes'),
    employees = require('./controllers/employees/routes'),
    allowances = require('./controllers/allowances/routes'),
    token = require('./controllers/token/routes'),
    search = require('./controllers/search/routes'),
    classifications = require('./controllers/classifications/routes'),
    activities = require('./controllers/activities/routes'),
    documents = require('./controllers/documents/routes'),
    vehicles = require('./controllers/vehicles/routes'),
    notifications = require('./controllers/notifications/routes'),
    logs = require('./controllers/logs/routes'),
    objectives = require('./controllers/objectives/routes'),
    appraisals = require('./controllers/appraisals/routes'),
    knex = require('knex')(require('./knexfile')),
    /********* End of Endpoints ***************/
    bootloader = require('./libs/bootloader').Bootloader,
    srcDir = __dirname + "/src/",
    api_version = '/api'

app.use(helmet())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(srcDir))

app.use(api_version, tickets)
app.use(api_version, users)
app.use(api_version, employees)
app.use(api_version, allowances)
app.use(api_version, token)
app.use(api_version, apps)
app.use(api_version, search)
app.use(api_version, classifications)
app.use(api_version, activities)
app.use(api_version, documents)
app.use(api_version, vehicles)
app.use(api_version, notifications)
app.use(api_version, logs)
app.use(api_version, objectives)
app.use(api_version, appraisals)
app.use('/', admin)

bootloader.init()

process.on('uncaughtException', (err)=>{
  console.log(err.stack)
  process.exit(1)
})

process.on('SIGINT', (msg)=>{
  console.log('App existing')
  process.exit(1)
})

module.exports = app
