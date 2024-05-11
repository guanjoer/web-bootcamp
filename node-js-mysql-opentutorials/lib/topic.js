const db = require('./db-connection-info.js');
var template = require('./template.js');
var url = require('url');
var qs = require('querystring');
const sanitizeHtml = require('sanitize-html');

exports.home = function(request, response) {
	db.query('SELECT * FROM topic', function (error, results) {
		if (error) {
		throw error;
		}

		var title = 'Welcome';
		var description = 'Hello, Node.js';
		var list = template.list(results);
		var html = template.HTML(title, list,
		  `<h2>${title}</h2>${description}`,
		  `<a href="/create">create</a>`
		);
		response.writeHead(200);
		response.end(html);
	  });
}

exports.page = function(request, response) {
	var _url = request.url;
    var queryData = url.parse(_url, true).query;
	db.query('SELECT * FROM topic', function (error, results) {
		if (error) {
		throw error;
		}
		// console.log(results);
		
		db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?`,[queryData.id], function(error2, result) {
		  if (error2) {
			throw error2;
		  }
		  // console.log(result[0].title);
		  var title = result[0].title;
		  var description = result[0].description;
		  var name = result[0].name;
		  var list = template.list(results);
		  var html = template.HTML(title, list,
			`<h2>${sanitizeHtml(title)}</h2>${sanitizeHtml(description)}
			<p>By ${sanitizeHtml(name)}</p>
			`,
			` <a href="/create">create</a>
			  <a href="/update?id=${queryData.id}">update</a>
			  <form action="delete_process" method="post">
				<input type="hidden" name="id" value="${queryData.id}">
				<input type="submit" value="delete">
			  </form>`
		  );
		  response.writeHead(200);
		  response.end(html);
		})
	  });
}

exports.create = function(request, response) {
	db.query('SELECT * FROM topic', function (error, results) {
		db.query('SELECT * FROM author', function(err, authors) {
		//   console.log(results);
		  var title = 'Create';
		  var list = template.list(results);
		  var html = template.HTML(sanitizeHtml(title), list,
			`
			<form action="/create_process" method="post">
			<p><input type="text" name="title" placeholder="title"></p>
			<p>
			  <textarea name="description" placeholder="description"></textarea>
			</p>
			<p>
			 ${template.authorSelect(authors)}
			</p>
			<p>
			  <input type="submit">
			</p>
			</form>
		  `,
		  `<a href="/create">create</a>`
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
		INSERT INTO topic (title, description, created, author_id) 
		VALUES(?, ?, NOW(), ?)`,
		[post.title, post.description, post.author],
		function(error, result) {
		  if (error) {
			throw error;
		  }
		  // console.log(result);
		  response.writeHead(302, {Location: `/?id=${result.insertId}`});
		  response.end();
		}
		)
	  });
}

exports.update = function(request, response) {
	var _url = request.url;
    var queryData = url.parse(_url, true).query;
	db.query('SELECT * FROM topic', function (error, results) {
        if (error) {
          throw error;
        }
        // console.log(results);
        
        db.query(`SELECT * FROM topic WHERE id=?`,[queryData.id], function(error2, result) {
          if (error2) {
            throw error2;
          }

          db.query('SELECT * FROM author', function(err, authors) {
             // console.log(result[0].title);
          var title = result[0].title;
          var description = result[0].description;
          var list = template.list(results);
          var html = template.HTML(sanitizeHtml(title), list,
            `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${result[0].id}">
              <p><input type="text" name="title" placeholder="title" value="${sanitizeHtml(title)}"></p>
              <p>
                <textarea name="description" placeholder="description">${sanitizeHtml(description)}</textarea>
              </p>
              <p>
                ${template.authorSelect(authors, result[0].author_id)}
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `,
            `<a href="/create">create</a> <a href="/update?id=${result[0].id}">update</a>`
          );
          response.writeHead(200);
          response.end(html);
          });
         
        })
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
	  db.query('UPDATE topic SET title=?, description=?, author_id=? WHERE id=?', [post.title, post.description, post.author, post.id], function(error, result){
		// console.log(post.author);
		response.writeHead(302, {Location: `/?id=${post.id}`});
		response.end();
	  })
	});
}

exports.delete_process = function(request, response) {
	var body = '';
	request.on('data', function(data){
		body = body + data;
	});
	request.on('end', function(){
		var post = qs.parse(body);
		db.query('DELETE FROM topic WHERE id = ?', [post.id], function(err, result) {
		  if (err) {
			throw err;
		  }
		  response.writeHead(302, {Location: `/`});
		  response.end();
		})
	});
}