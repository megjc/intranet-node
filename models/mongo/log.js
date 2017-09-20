'use strict'

let mongoose = require('mongoose'),
    shortid = require('shortid'),
    Schema = mongoose.Schema

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true, promiseLibrary: global.Promise });

let logSchema = new Schema({
  _id: {type: String, 'default': shortid.generate, index: true},
  module: String,
  ip: String,
  user: String, //username
  action: String,
  object: String,
  status: String,
  reason: String
},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

exports.Log = mongoose.model('Log', logSchema)
