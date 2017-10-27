
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('objectives', function(table){
      table.integer('dept_id').notNullable()
      table.integer('created_by').notNullable()
    })
  ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.table('objectives', function(table){
        table.dropColumn('dept_id')
        table.dropColumn('created_by')
      })
    ])
};
