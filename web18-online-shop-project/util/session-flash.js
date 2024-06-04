function getSessionData(req) {
	// Load Flashed Data
	const sessionData = req.session.flashedData;

	// Flashing(i.e. Over a get request one more time, then flashed Data is null.)
	req.session.flashedData = null;

	return sessionData;
};

function flashDataToSession(req, data, action) {
	req.session.flashedData = data;
	// action is a function.
	req.session.save(action);
};





module.exports = {
	getSessionData: getSessionData,
	flashDataToSession: flashDataToSession
}