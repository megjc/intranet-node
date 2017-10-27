'use strict'
const bookshelf = require('../bookshelf')
const Objective = bookshelf.Model.extend({
  tableName:'objectives',
})

module.exports = Objective
