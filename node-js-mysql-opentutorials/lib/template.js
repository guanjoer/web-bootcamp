const sanitizeHtml = require('sanitize-html');

module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <a href="/author">Author</a>
      ${list}
      ${control}
      ${body}

      <style>
        body {
          background-color: #272626;
          color: white;
        }
        a, li {
          color: inherit;
        }
      </style>
    </body>
    </html>
    `;
  },list:function(results){
    var list = '<ul>';
    var i = 0;
    while(i < results.length){
      list = list + `<li><a href="/?id=${results[i].id}">${sanitizeHtml(results[i].title)}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  },authorSelect:function(authors, author_id) {
    var tag = '';
    var i = 0;
    while(i < authors.length) {
      var selected = '';
      if (authors[i].id === author_id) {
        selected = ' selected';
      }
      tag += `<option value="${authors[i].id}"${selected}>${sanitizeHtml(authors[i].name)}</option>`;
      i++;
    }
    
    return `
    <select name="author">
      ${tag}
    </select>
    `
  }, authorTable: function(authors) {
    let tag = '<table>';
    let i = 0;
    while(i < authors.length) {
      tag += `
        <tr>
          <td>${sanitizeHtml(authors[i].name)}</td>
          <td>${sanitizeHtml(authors[i].profile)}</td>
          <td><a href="/author/update?id=${authors[i].id}">Update</a></td>
          <td>
            <form action="/author/delete_process" method="post">
              <input type="hidden" name="id" value="${authors[i].id}">
              <input id="del-btn" type="submit" value="delete">
            </form>
          </td>
        </tr>
      `
      i++;
    }
		tag += '</table>';
    return tag
  }
}
