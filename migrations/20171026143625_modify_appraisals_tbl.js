
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('appraisals', function(table){
      table.dropColumn('period_end')
    })
  ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.table('appraisals', function(table){
        table.integer('period_end').notNullable()
      })
    ])
};
