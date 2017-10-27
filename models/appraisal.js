'use strict'
const bookshelf = require('../bookshelf')
const Appraisal = bookshelf.Model.extend({
  tableName:'appraisals',
})

module.exports = Appraisal
