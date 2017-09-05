'use strict'
const classification = require('../../models/classification')
let classifications = {
  /**
   * Get a list of all classifications
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}    a list of classifications
   */
  index: (req, res)=>{
    classification.index((err, classifications)=>{
      if(err) return res.json(err)
      return res.json(classifications)
    })
  }
}

exports.classifications = classifications
