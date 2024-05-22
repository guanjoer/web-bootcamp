const mysql = require('mysql2/promise');

const pool = mysql.createPool({
	host: 'localhost',
	database: 'yourDbName',
	user: 'root',
	password: 'yourPassword'
});

module.exports = pool;
