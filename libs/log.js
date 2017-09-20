'use strict'
const Log = require('../models/mongo/log').Log
const LogTypes = {
  'auth_request': {
     'module': 'authentication',
     'action': 'authenticate',
     'object': 'database',
     'status': 'initiated',
     'reason': 'authentication request attempted'
  }
}

exports.determineLogType = ( type )=>{
  return LogTypes[type]
}

exports.buildLog = ( type, data, ip, name)=>{
  let log = data
  if(type == 'auth_request'){
    log.ip = ip
    log.user = name
  }
  return log
}

exports.saveLog = ( data )=>{
  let log = new Log(data)
  log.save((err)=>{
    if(err) console.log({text: 'Error in logging event'})
  })
}
