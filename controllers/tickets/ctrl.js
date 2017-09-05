'use strict'

const email = require('../../libs/email').email
const ticket = require('../../models/ticket')

let tickets = {
  create: (req, res)=>{
    let values = {
      type_id: req.body.type_id,
      description: req.body.description,
      created_by: req.body.email,
      email: req.body.email
    }

    ticket.create(values, (err, id)=>{
      if(err) return res.json(err)
      email.build(id, values.email)
      email.send()
      return res.json({text: 'Your issue has been succesfully submitted.', id: id, success: true})
    })

  },
  index: (req, res)=>{
    ticket.index((err, tickets)=>{
      if(err) return res.json(err)

      return res.json(tickets)
    })
  }
}

exports.tickets = tickets
