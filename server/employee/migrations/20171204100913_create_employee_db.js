
exports.up = function(knex, Promise) {
    return Promise.all([

      knex.schema.createTableIfNotExists('employees', function(table){
        table.increments('id').notNullable().index()
        table.string('ref_code', 10).notNullable()
        table.string('first_name', 50).notNullable()
        table.string('middle_name', 50).notNullable()
        table.string('last_name', 50).notNullable()
        table.date('dob').notNullable()
        table.enu('gender', ['M', 'F']).notNullable().defaultTo('F')
        table.date('hire_date').notNullable()
        table.boolean('is_deleted').notNullable().defaultTo(false)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
      }),

      knex.schema.createTableIfNotExists('positions', function(table){
        table.increments('id').notNullable().index()
        table.string('ref_code', 10).notNullable()
        table.integer('classification_id').notNullable().defaultTo(146)
        table.string('employee_id', 10).notNullable()
        table.date('start_date').notNullable()
        table.date('end_date').notNullable()
        table.boolean('is_current').notNullable().defaultTo(true)
        table.boolean('is_appointed').notNullable().defaultTo(true)
        table.date('appointed_date').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
      }),

      knex.schema.createTableIfNotExists('departments', function(table){
        table.increments('id').notNullable().index()
        table.string('ref_code', 10).notNullable()
        table.string('title', 100).notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
      }),

      knex.schema.createTableIfNotExists('dept_employees', function(table){
        table.increments('id').notNullable().index()
        table.string('ref_code', 10).notNullable()
        table.string('dept_id', 10).notNullable()
        table.string('employee_id', 10).notNullable()
        table.date('assigned_date').notNullable()
        table.date('departure_date').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
      })
    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('employees'),
    knex.schema.dropTableIfExists('positions'),
    knex.schema.dropTableIfExists('departments'),
    knex.schema.dropTableIfExists('dept_employees')
  ])
};
