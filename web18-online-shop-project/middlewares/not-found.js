// 존재하지 않는 페이지로 접근할 시
function notFoundHandler(req, res, next) {
	res.render('shared/404');
}


module.exports = notFoundHandler;