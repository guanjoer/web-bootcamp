const addToCartBtn = document.querySelector('#product-details button');
const cartBadge = document.querySelector('.nav-items .badge');

async function addTocart() {
	const productId = addToCartBtn.dataset.productid;
	const csrfToken = addToCartBtn.dataset.csrf;

	let response;
	try {
		response = await fetch('/cart/items', {
			method: 'POST',
			body: JSON.stringify({
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

	cartBadge.textContent = newTotalItems;
}

addToCartBtn.addEventListener('click', addTocart);