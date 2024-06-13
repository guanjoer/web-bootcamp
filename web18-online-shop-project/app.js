// Built-in Modules
const path = require('path');

// Third-parties
const express = require('express');
const csrf = require('csurf');
const expressSession = require('express-session');

// Custom modules
const db = require('./data/database');
const createSessionConfig = require('./config/session');
// Middlewares
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const protectRoutesMiddleware = require('./middlewares/protect-routes');
const cartMiddleware = require('./middlewares/cart');
// Routes
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const baseRoutes = require('./routes/base.routes');
const productsRoutes = require('./routes/products.routes');
const cartRoutes = require('./routes/cart.routes');
const ordersRoutes = require('./routes/orders.routes');


const app = express();


app.set('view engine', 'ejs'); // Template engine 중 view engine 사용 및 해당 엔진으로 ejs 사용.
app.set('views', path.join(__dirname, 'views')); // ejs엔진을 사용해 rendering 될 템플릿 파일은 ./views/ 에 존재.

app.use(express.static('public')); // public/* 파일들을 정적파일로 브라우저에 제공
app.use('/products/assets', express.static('product-data'))
app.use(express.urlencoded({extended: false})); // For attached Request datas in req.body
app.use(express.json()); // JSON 파싱 미들웨어

app.use(expressSession(createSessionConfig()));
app.use(csrf()); // csrfToken 생성 및 유효성 검사 패키지

app.use(cartMiddleware);
app.use(addCsrfTokenMiddleware); 

app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(productsRoutes);
app.use(authRoutes);
app.use('/cart', cartRoutes);
app.use(protectRoutesMiddleware); // 관리자 페이지 보호 미들웨어
app.use('/orders', ordersRoutes);
app.use('/admin', adminRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
	.then(function() {
		app.listen(3000);
	})
	.catch(function(error) {
		console.log('데이터베이스와의 연결이 실패하였습니다!');
		console.log('error');
	});