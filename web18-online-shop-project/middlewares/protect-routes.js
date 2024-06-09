function protectRoutes(req, res, next) {
	if(!res.locals.isAuthenticated) {
		return res.redirect('/401');
	};

	// 로그인은 하였지만, 관리자가 아닌 경우에, 관리자 페이지에 접근하려고 할 때
	if(req.path.startsWith('/admin') && !res.locals.isAdmin) {
		return res.redirect('/403');
	};

	// 로그인 되었고, 또한 관리자인 경우에, 관리자 페이지에 액세스하려고 할 때
	next(); // 다음 미들웨어로 계속 진행
};


module.exports = protectRoutes;