/**
 * @author Tremaine Buchanan
 * @desc Endpoint handling CRUD operations for Appraisal resource.
 * @since 2017-10-27
 */
'use strict'
const Appraisal = require('../../models/appraisal')
const shortid = require('shortid')
const moment = require('moment')
const ERROR = require('../../libs/error').error

let appraisals = {
  index: (req, res)=>{
    Appraisal
    .query({where: req.query, andWhere: {deleted: false}})
    .fetchAll()
    .then((appraisals)=>{
      if(!appraisals) return res.status(404).json(ERROR.RESOURCES.INDEX)
      res.json(appraisals)
    }).catch((err)=>{
      let error = ERROR.buildSysError( ERROR.RESOURCES.INDEX, err )
      res.status(500).json( err )
    })
  },
  create: (req, res)=>{
    new Appraisal({
      ref_code: shortid.generate(),
      appraiser_id: req.body.appraiser_id,
      employee_id: req.body.employee_id,
      created_by: req.body.created_by,
      period_start: moment(req.body.period_start).format('YYYY-MM-DD'),
      period_end: moment(req.body.period_end).format('YYYY-MM-DD')
    }).save().then(( saved )=>{
        if(!saved) return res.status(404).json(ERROR.RESOURCES.CREATE)
        res.json( saved )
    }).catch((err)=>{
      let error = ERROR.buildSysError( ERROR.RESOURCES.INDEX, err )
      res.status(500).json( err )
    })
  },
  show: (req, res)=>{
    Objective
      .query({
        where: {ref_code: req.params.ref_code},
        andWhere: {deleted: false}
      }).fetch()
        .then((objective)=>{
          if(!objective) return res.status(404).json( ERROR.RESOURCES.SHOW)
          res.json(objective)
      }).catch((err)=>{
        let error = ERROR.buildSysError( ERROR.RESOURCES.INDEX, err )
        res.status(500).json( err )
      })
  },
  update: (req, res)=>{
    Objective
    .query({
      where: {ref_code: req.params.ref_code},
      andWhere: {deleted: false}
    })
    .fetch()
    .then((objective)=>{
      if(!objective) return res.status(400).json( ERROR.RESOURCES.UPDATE )
      objective
        .save(req.body)
        .then((updated)=>{
          if(!updated) return res.status(400).json( ERROR.RESOURCES.UPDATE )
          res.json(updated)
          }).catch((err)=>{
            let error = ERROR.buildSysError( ERROR.RESOURCES.INDEX, err )
            res.status(500).json( err )
      })
    })
  }
}

exports.appraisals = appraisals
