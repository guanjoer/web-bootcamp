const path = require('path');

const express = require('express');
const csrf = require('csurf');

const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const authRoutes = require('./routes/auth.routes');


const app = express();


app.set('view engine', 'ejs'); // Template engine 중 view engine 사용 및 해당 엔진으로 ejs 사용.
app.set('views', path.join(__dirname, 'views')); // ejs엔진을 사용해 rendering 될 템플릿 파일은 ./views/ 에 존재.

app.use(express.static('public')); // public/* 파일들을 정적파일로 브라우저에 제공
app.use(express.urlencoded({extended: false})); // For attached Request datas in req.body

// Session 추가 필요.
app.use(csrf());
app.use(addCsrfTokenMiddleware);

app.use(authRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
	.then(function() {
		app.listen(3000);
	})
	.catch(function(error) {
		console.log('데이터베이스와의 연결이 실패하였습니다!');
		console.log('error');
	});