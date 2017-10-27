
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('appraisals', function(table){
      table.dropColumn('appraiser_id')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('appraisals', function(table){
      table.integer('appraiser_id').notNullable().after('ref_code')
    })
  ])
};
