function checkAuthStatus(req, res, next) {
	const uid = req.session.uid;
	const userName = req.session.name;
	const isAdmin = req.session.isAdmin;
	console.log(req.session);


	// i.e. User is authenticated!
	if(!uid) {
		return next();
	};

	res.locals.uid = uid;
	res.locals.name = userName;
	res.locals.isAuthenticated = true;
	res.locals.isAdmin = isAdmin;
	next();
};

module.exports = checkAuthStatus;