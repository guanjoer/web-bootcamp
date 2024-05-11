var mysql = require('mysql');

// var db = mysql.createConnection({
// 	host     : 'YOU HOST ADDRESS',
// 	user     : 'YOUR USER NAME',
// 	password : 'YOUR DB PASSWORD',
// 	database : 'YOUR DB NAME'
//   });


db.connect();

module.exports = db;