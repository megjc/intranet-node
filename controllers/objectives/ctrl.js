'use strict'

const Objective = require('../../models/objective')
const shortid = require('shortid')
const moment = require('moment')

let objectives = {
  index: (req, res)=>{
    Objective
    .query({where: req.query, andWhere: {deleted: false}})
    .fetchAll()
    .then((objectives)=>{
      if(!objectives) return res.status(404).json({'text': 'Error in retrieving list of objectives', 'success': false})
      if(objectives.length < 1) return res.status(404).json({'text': 'No matching objectives found', 'success': false})
      res.json(objectives)
    }).catch((err)=>{
      res.status(500).json({'text': 'Error in retrieving list of objectives', 'error': err, 'success': false})
    })
  },
  create: (req, res)=>{
    new Objective({
      ref_code: shortid.generate(),
      description: req.body.description,
      period_start: moment(req.body.period_start).format('YYYY-MM-DD'),
      period_end: moment(req.body.period_end).format('YYYY-MM-DD'),
      dept_id: parseInt(req.body.dept_id),
      created_by: parseInt(req.body.created_by)
    }).save().then(( saved )=>{
        if(!saved) return res.status(404).json({'text': 'Error in creating objective', 'success': false})
        res.json( saved )
    }).catch((err)=>{
      res.status(500).json({'text': 'Error in creating objective', 'success': false, 'error': err})
    })
  },
  show: (req, res)=>{
    Objective
      .query({
        where: {ref_code: req.params.ref_code},
        andWhere: {deleted: false}
      }).fetch()
        .then((objective)=>{
          if(!objective)
              return res.status(404)
                      .json({
                        'text': 'Error in finding objective with ref_code ' + req.params.ref_code,
                        'success': false
                      })
              res.json(objective)
      }).catch((err)=>{
        res.status(404).json({'text': 'Error in retrieving objective', 'error': err, 'success': false})
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
      if(!objective) return res.json({'text': 'Error in updating objective with reference ' + req.params.ref_code, 'success': false})
      objective
        .save(req.body)
        .then((updated)=>{
            res.json(updated)
          }).catch((err)=>{
           res.json({'text': 'Error in updating objective', 'err': err, 'success': false})
      })
    })
  }
}

exports.objectives = objectives
