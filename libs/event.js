'use strict'

const Emitter = require('events'),
      Log = require('../models/mongo/log').Log,
      log = require('../libs/log')

class EventEmitter extends Emitter {}
const emitter = new EventEmitter()

const events = {
  'log': ( request_type, request )=>{
    let log_data = log.determineLogType( request_type )
    let data = log.buildLog( request_type, log_data, request.ip, request.body.name )
    log.saveLog( data )
  }
}
/**
 * Registers an event to be emitted
 * one added to a list of events.
 */
function registerEvents(){
  for(let eventHandle in events)
    emitter.once(eventHandle, events[eventHandle])
}
/**
 * Emits a registered event based on a event name
 * from a list of events.
 * @param  {String} eventHandle Name of event
 */
function emitEvent(eventHandle, request_type, request){
  let e = events[eventHandle]( request_type, request )
  emitter.emit(e)
}

exports.registerEvents = registerEvents
exports.emitEvent = emitEvent
