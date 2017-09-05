'use strict'

const searchModel = require('../../models/search')

let search = {
  /**
   * Get a list of all allowances
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}    a list of allowances
   */
  index: (req, res)=>{
    if(req.query){
      if(req.query.app && req.query.q){
        if(req.query.app == 1){
          searchModel.index(req.query.q, (err, results)=>{
            if(err != null) return res.json(err)
            res.json(results)
          })
        }else{
          return res.status(400).json({message: 'Baq request'})
        }
      }else{
        return res.status(400).json({message: 'Bad request'})
      }
    }
  }
}

exports.search = search
