const mysql = require('mysql');
const util = require('util');
const dbconfig = require('./config');


var pool = mysql.createPool({
  host:dbconfig.host,
  user:dbconfig.user,
  password:dbconfig.password,
  username:dbconfig.username,
  database: dbconfig.database
})


pool.query = util.promisify(pool.query);

module.exports = pool;


