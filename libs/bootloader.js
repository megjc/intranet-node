'use strict'

const events = require('./event')

const Bootloader = {
  init: ()=>{
    events.registerEvents()
  }
}

exports.Bootloader = Bootloader
