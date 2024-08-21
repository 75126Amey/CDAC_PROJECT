const mysql = require('mysql2')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'D2_83632_Vaishak',
  password: '20090418',
  port: 3306,
  database: 'project_db',
  connectionLimit: 10,
})

module.exports = {
  pool,
}