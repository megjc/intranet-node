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
    admin = express(),
    /********* End of Endpoints ***************/
    /******************************************/
    srcDir = __dirname + "/src/"

admin.use(helmet())
admin.use(logger('dev'));
admin.use(bodyParser.json());
admin.use(bodyParser.urlencoded({
  extended: true
}));
admin.use(cookieParser());
admin.use(express.static(srcDir))

admin.use('/admin', (req, res)=>{
  res.send('Admin Route')
})

module.exports = admin
