
exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.table('appraisals', function(table){
        table.date('period_end').notNullable().after('period_start')
      })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.table('appraisals', function(table){
        table.dropColumn('period_end')
      })
    ])
};
