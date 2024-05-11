const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
var bodyParser = require('body-parser')
var compression = require('compression')
const template = require('./lib/template.js');
const topicRouter = require('./routes/topic.js');
const homeRouter = require('./routes/index.js');
const helmet = require('helmet')

app.use(helmet())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression())

app.get('*', (req, res, next) => {
  fs.readdir('./data', function(error, filelist){
    req.list = filelist;
    next();
  });
});

app.use('/topic', topicRouter);

app.use('/', homeRouter);

app.get('/topic/:pageId', (req, res, next) => {
      var filteredId = path.parse(req.params.pageId).base;
      fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
        if (err) {
          next(err);
        } else {
          var title = req.params.pageId;
          var sanitizedTitle = sanitizeHtml(title);
          var sanitizedDescription = sanitizeHtml(description, {
            allowedTags:['h1']
          });
          var list = template.list(req.list);
          var html = template.HTML(sanitizedTitle, list,
            `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
            ` <a href="/topic/create">create</a>
              <a href="/topic/update/${sanitizedTitle}">update</a>
              <form action="/topic/delete_process" method="post">
                <input type="hidden" name="id" value="${sanitizedTitle}">
                <input type="submit" value="delete">
              </form>`
          );
          res.send(html);
        }
      });
});


app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




// var http = require('http');
// var url = require('url');

// var app = http.createServer(function(request,response){
//     var _url = request.url;
//     var queryData = url.parse(_url, true).query;
//     var pathname = url.parse(_url, true).pathname;
//     if(pathname === '/'){
//       if(queryData.id === undefined){
//       } else {
//       }
//     } else if(pathname === '/create'){
//     } else if(pathname === '/create_process'){
//     } else if(pathname === '/update'){
//     } else if(pathname === '/update_process'){
//     } else if(pathname === '/delete_process'){

//     } else {
//       response.writeHead(404);
//       response.end('Not found');
//     }
// });
// app.listen(3000);
