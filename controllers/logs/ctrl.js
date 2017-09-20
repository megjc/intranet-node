'use strict'

let Log = require('../../models/mongo/log').Log

let logs = {
  index: (req, res)=>{
    Log.find().exec((err, logs)=>{
      if(err) return res.status(400).json({text: 'error in getting logs', success: false})
      res.json(logs)
    })
  },
  /**
   * [create description]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  create: (req, res)=>{
    let log = new Log(req.body)
    log.save((err)=>{
      if(err) return res.status(400).json({text: 'error in creating log', success: false})
      res.json(log._id)
    })
  }
}

exports.logs = logs
