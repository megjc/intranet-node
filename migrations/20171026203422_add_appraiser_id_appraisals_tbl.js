
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('appraisals', function(table){
      table.string('appraiser_id', 10).notNullable().after('ref_code')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('appraisals', function(table){
      table.dropColumn('appraiser_id')
    })
  ])
};
