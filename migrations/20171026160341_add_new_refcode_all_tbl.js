
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('objectives', function(table){
      table.string('ref_code', 10).unique().notNullable().after('id')
    }),
    knex.schema.table('activities', function(table){
      table.string('ref_code', 10).unique().notNullable().after('id')
    }),
    knex.schema.table('appraisals', function(table){
      table.string('ref_code', 10).unique().notNullable().after('id')
    }),
    knex.schema.table('assignments', function(table){
      table.string('ref_code', 10).unique().notNullable().after('emp_id')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('objectives', function(table){
      table.dropColumn('ref_code')
    }),
    knex.schema.table('activities', function(table){
      table.dropColumn('ref_code')
    }),
    knex.schema.table('appraisals', function(table){
      table.dropColumn('ref_code')
    }),
    knex.schema.table('assignments', function(table){
      table.dropColumn('ref_code')
    })
  ])
};
