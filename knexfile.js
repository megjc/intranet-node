'use strict'
require('dotenv').config()
module.exports = {
  client: 'mysql',
  connection: {
    user: process.env.DB_ADMIN,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },
  migrations: {
    tableName: 'migrations'
  },
  seeds:{
    directory: './data/dev'
  }
}
