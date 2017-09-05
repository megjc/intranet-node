'use strict'

const activity = require('../../models/activity')

let activities = {
  /**
   * Get a list of all activities
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}    a list of allowances
   */
  index: (req, res)=>{
    activity.index((err, activities)=>{
      if(err) return res.json(err)
      res.json(activities)
    })
  }
}

exports.activities = activities
