
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('appraisals', function(table){
      table.string('created_by', 10).notNullable().after('employee_id')
    })
  ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.table('appraisals', function(table){
        table.dropColumn('created_by')
      })
    ])
};
