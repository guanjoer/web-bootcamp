const Quote = require('../models/quote.model');

async function getRandomQuote(req, res, next) {
	let randomQuote;
	try {
		randomQuote = await Quote.getRandomQuote();
		
	} catch (error) {
		next(error);
	};
	
	res.json({
		quote: randomQuote
			// '만약 당신이 웹 개발에 깊이 빠져 든다면, 웹 개발 또한 당신에게 깊이 빠져들 것입니다.'
	})
}

module.exports = {
	getRandomQuote: getRandomQuote
};