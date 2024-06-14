const addToCartBtn = document.querySelector('#product-details button');
const cartBadges = document.querySelectorAll('.nav-items .badge'); // 모바일 뱃지 포함

async function addTocart() {
	const productId = addToCartBtn.dataset.productid;
	const csrfToken = addToCartBtn.dataset.csrf;

	let response;
	try {
		response = await fetch('/cart/items', {
			method: 'POST',
			body: JSON.stringify({ // 서버와의 통신시, 데이터 교환은, json data format으로.
				productId: productId,
				_csrf: csrfToken
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		alert('Something went wrong!');
		return;
	}

	if(!response.ok) {
		alert('Something went wrong!');
		return;
	};

	// Decode JSON data. i.e. Convert JSON to JS Object
	const responseData = await response.json();

	const newTotalItems = responseData.newTotalItems;

	for(const cartBadge of cartBadges) {
		cartBadge.textContent = newTotalItems;
	};
}

addToCartBtn.addEventListener('click', addTocart);