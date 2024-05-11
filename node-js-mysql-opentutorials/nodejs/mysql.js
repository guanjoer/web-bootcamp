var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'YOUR HOST ADDRESS',
  user     : 'YOUR USER NAME',
  password : 'YOUR PASSWORD',
  database : 'YOUR DATABASE NAME'
});
 
connection.connect();
 
connection.query('SELECT * FROM [TABLE NAME]', function (error, results, fields) {
  if (error) {
	console.log(error);
  }
  console.log(results);
});
 
connection.end();