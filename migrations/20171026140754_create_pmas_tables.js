
exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTableIfNotExists('activities', function(table){
      table.increments('id').notNullable().index()
      table.string('ref_code', 7).notNullable()
      table.string('emp_id').notNullable()
      table.string('objective_id').notNullable()
      table.text('key_activity').notNullable()
      table.text('output').notNullable()
      table.text('standard').notNullable()
      table.text('target').notNullable()
      table.text('actual_performance').notNullable()
      table.integer('score').notNullable().defaultTo(0)
      table.integer('result_category').notNullable().defaultTo(0)
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    }),

    knex.schema.createTableIfNotExists('appraisals', function(table){
      table.increments('id').primary().index()
      table.string('ref_code', 7).notNullable()
      table.integer('appraiser_id').notNullable()
      table.date('period_start').notNullable()
      table.integer('period_end').notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    }),

    knex.schema.createTableIfNotExists('assignments', function(table){
      table.integer('emp_id').notNullable().primary().index()
      table.string('ref_code', 7).notNullable()
      table.integer('dept_id').notNullable()
      table.date('from_date').notNullable()
      table.date('to_date').notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    }),

    knex.schema.createTableIfNotExists('objectives', function(table){
      table.increments('id').primary().index()
      table.string('ref_code', 7).notNullable()
      table.string('dept_id').notNullable()
      table.text('body').notNullable()
      table.date('period_start').notNullable()
      table.date('period_end').notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('activities'),
    knex.schema.dropTableIfExists('appraisals'),
    knex.schema.dropTableIfExists('assignments'),
    knew.schema.dropTableIfExists('objectives')
  ])
};
