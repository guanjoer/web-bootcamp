require('dotenv').config();

// Built-in Modules
const path = require('path');

// Third-parties
const express = require('express');

const db = require('./data/database');

// Routes
const quotesRoutes = require('./routes/quotes.routes');

const app = express();



app.use(express.urlencoded({extended: false})); // For attached Request datas in req.body
app.use(express.json()); // JSON 파싱 미들웨어


app.use('/quote', quotesRoutes);

app.use(function(error, req, res, next) {
	res.status(500).json({ // 서버 측 오류
		message: 'Something went wrong!'
	})
})

  db.connectToDbServer()
  .then(function() {
	  app.listen(3000);
  })
  .catch(function(error) {
	  console.log('데이터베이스와의 연결에 실패하였습니다!');
	  console.log('error');
  });