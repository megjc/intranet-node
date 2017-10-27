
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('objectives', function(table){
      table.dropColumn('body')
    })
  ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.table('objectives', function(table){
        table.text('body').notNullable()
      })
    ])
};
