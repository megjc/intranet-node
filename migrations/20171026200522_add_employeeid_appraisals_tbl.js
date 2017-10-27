
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('appraisals', function(table){
      table.string('employee_id', 10).notNullable().after('appraiser_id')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('appraisals', function(table){
      table.dropColumn('employee_id')
    })
  ])
};
