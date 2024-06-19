const db = require('../data/database');

class Quote {
	static async getRandomQuote() {
		const quotes = await db.getDb().collection('quotes').find().toArray();

		const randomQuoteIndex = Math.floor(Math.random() * quotes.length); // floor는 반내림을 하고, 즉 2.2 => 2, random은 0 ~ 0.999...의 값을 생성한다. 따라서, 배열의 인덱스 범위를 초과하지 않으면서 랜덤으로 배열 내 요소를 고를 수 있게 된다.

		const randomQuote = quotes[randomQuoteIndex].text;
		return randomQuote;
	}
}


module.exports = Quote