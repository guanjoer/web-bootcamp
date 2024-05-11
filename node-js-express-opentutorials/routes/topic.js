const express = require('express');
const router = express.Router();
const path = require('path');
const template = require('../lib/template.js');
const fs = require('fs');

router.get('/create', (req, res) => {
	var title = 'WEB - create';
	var list = template.list(req.list);
	var html = template.HTML(title, list, `
	  <form action="/topic/create_process" method="post">
		<p><input type="text" name="title" placeholder="title"></p>
		<p>
		  <textarea name="description" placeholder="description"></textarea>
		</p>
		<p>
		  <input type="submit">
		</p>
	  </form>
	`, '');
	res.send(html);
  });
  
router.post('/create_process', (req, res) => {
var post = req.body;
var title = post.title;
var description = post.description;
fs.writeFile(`data/${title}`, description, 'utf8', function(err){
	res.redirect(`/topic/${title}`)
})
});
  
router.get('/update/:pageId', (req, res) => {
var filteredId = path.parse(req.params.pageId).base;
fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
	var title = req.params.pageId;
	var list = template.list(req.list);
	var html = template.HTML(title, list,
	`
	<form action="/topic/update_process" method="post">
		<input type="hidden" name="id" value="${title}">
		<p><input type="text" name="title" placeholder="title" value="${title}"></p>
		<p>
		<textarea name="description" placeholder="description">${description}</textarea>
		</p>
		<p>
		<input type="submit">
		</p>
	</form>
	`,
	`<a href="/topic/create">create</a> <a href="/update?id=${title}">update</a>`
	);
	res.send(html);
});
});

router.post('/update_process', (req, res) => {
	var post = req.body;
	var id = post.id;
	var title = post.title;
	var description = post.description;
	fs.rename(`data/${id}`, `data/${title}`, function(error){
	fs.writeFile(`data/${title}`, description, 'utf8', function(err){
		res.redirect(`/topic/${title}`);
	})
	});
});

router.post('/delete_process', (req, res) => {
var post = req.body;
var id = post.id;
var filteredId = path.parse(id).base;
fs.unlink(`data/${filteredId}`, function(error){
	res.redirect('/');
});
});

module.exports = router;