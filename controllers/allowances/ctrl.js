'use strict'

const allowance = require('../../models/allowance')

let allowances = {
  /**
   * Get a list of all allowances
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}    a list of allowances
   */
  index: (req, res)=>{
    allowance.index((err, allowances)=>{
      if(err) return res.json(err)

      return res.json(allowances)
    })
  }
}

exports.allowances = allowances
