const db = require('./db-connection-info.js');
var template = require('./template.js');
var url = require('url');
var qs = require('querystring');
const sanitizeHtml = require('sanitize-html');

exports.home = function(request, response) {
	db.query('SELECT * FROM topic', function (error, results) {
		db.query('SELECT * FROM author', function (err, authors) {
			// console.log(authors);
			var title = 'Author';
			var list = template.list(results);
			var html = template.HTML(title, list,
			`
			${template.authorTable(authors)}
			<style>
				table {
					border-collapse: collapse;
				}
				td {
					border: 1px solid black;
					border-color: #1f775a;
				}
				#del-btn:hover {
					background-color: #cdc4c4;
					cursor: pointer;
				}
			</style>
			<form action="/author/create_process" method="post">
			<p><input type="text" name="name" placeholder="name"></p>
			<p>
			  <textarea name="profile" placeholder="profile"></textarea>
			</p>
			<p>
			  <input type="submit" value="Create">
			</p>
			</form>
			`,
			``
			);
			response.writeHead(200);
			response.end(html);

		});
		if (error) {
		throw error;
		}
	  });
}

exports.create_process = function(request, response) {
	var body = '';
	request.on('data', function(data){
		body = body + data;
	});
	request.on('end', function(){
		var post = qs.parse(body);
		db.query(`
		INSERT INTO author (name, profile) 
		VALUES(?, ?)`,
		[post.name, post.profile],
		function(error, result) {
		  if (error) {
			throw error;
		  }
		  // console.log(result);
		  response.writeHead(302, {Location: `/author`});
		  response.end();
		}
		)
	  });
}

exports.update = function(request, response) {
	db.query('SELECT * FROM topic', function (error, results) {
		db.query('SELECT * FROM author', function (err, authors) {
			var _url = request.url;
			var queryData = url.parse(_url, true).query;
			db.query('SELECT * FROM author WHERE id=?', [queryData.id], function (err2, author) {
				var title = 'Author';
			var list = template.list(results);
			var html = template.HTML(title, list,
			`
			${template.authorTable(authors)}
			<style>
				table {
					border-collapse: collapse;
				}
				td {
					border: 1px solid black;
					border-color: #1f775a;
				}
			</style>
			<form action="/author/update_process" method="post">
			<p><input type="hidden" name="id" value="${queryData.id}"></p>
			<p><input type="text" name="name" placeholder="name" value="${sanitizeHtml(author[0].name)}"></p>
			<p>
			  <textarea name="profile" placeholder="profile">${sanitizeHtml(author[0].profile)}</textarea>
			</p>
			<p>
			  <input type="submit" value="Update">
			</p>
			</form>
			`,
			``
			);
			response.writeHead(200);
			response.end(html);
			});
		});
		if (error) {
		throw error;
		}
	  });
}

exports.update_process = function(request, response) {
	var body = '';
	request.on('data', function(data){
		body = body + data;
	});
	request.on('end', function(){
		var post = qs.parse(body);
		console.log(post);
		db.query(`
		UPDATE author SET name=?, profile=? WHERE id=?`,
		[post.name, post.profile, post.id],
		function(error, result) {
		  if (error) {
			throw error;
		  }
		  // console.log(result);
		  response.writeHead(302, {Location: `/author`});
		  response.end();
		}
		)
	  });
}

exports.delete_process = function(request, response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          db.query(
            `DELETE FROM topic WHERE author_id=?`,
            [post.id], 
            function(error1, result1){
                if(error1){
                    throw error1;
                }
                db.query(`
                    DELETE FROM author WHERE id=?`,
                    [post.id], 
                    function(error2, result2){
                        if(error2){
                            throw error2;
                        }
                        response.writeHead(302, {Location: `/author`});
                        response.end();
                    }
                )
            }
        );
      });
}