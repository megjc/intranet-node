'use strict'
const mysql = require('mysql')
let pool = mysql.createPool({
   connectionLimit: process.env.MYSQL_CONN_LIMIT,
   multipleStatements: process.env.MYSQL_MULTIQUERIES,
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME
})
/**
 * [description]
 * @return {[type]} [description]
 */
exports.model = new function() {
  this.query = (options, cb)=>{
    pool.getConnection((err, connection)=>{
      if(err){
        return cb(err)
      }
      connection.query(options, (err, results)=>{
        connection.release()
        if(err){
          return cb(err)
        }
        cb(null, results)
      })
    })
  },
  this.insert = (sql, values, cb)=>{
    pool.getConnection((err, connection)=>{
      if(err){
        return cb(err)
      }
      connection.query(sql, values, (err, results)=>{
        connection.release()
        if(err){
          return cb(err)
        }
        cb(null, results)
      })
    })
  }
}
