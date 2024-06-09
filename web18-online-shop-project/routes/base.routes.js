const express = require('express');


const router = express.Router();


router.get('/', function(req, res) {
	res.redirect('/products');
});

// 로그인 되지 않았을 때, 관리자 페이지로 접근 시
router.get('/401', function(req, res) {
	res.status(401).render('shared/401');
});

// 로그인 되었지만, 관리자가 아닐 때
router.get('/403', function(req, res) {
	res.status(403).render('shared/403');
});


module.exports = router;