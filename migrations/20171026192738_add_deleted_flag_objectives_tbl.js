
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('objectives', function(table){
      table.boolean('deleted')
           .notNullable()
           .defaultTo(false)
           .after('description')
    })  
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('objectives', function(table){
      table.dropColumn('deleted')
    })
  ])
};
