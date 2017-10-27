
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('appraisals', function(table){
      table.boolean('deleted').notNullable().defaultTo(false).after('updated_at')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('appraisals', function(table){
      table.dropColumn('deleted')
    })
  ])
};
