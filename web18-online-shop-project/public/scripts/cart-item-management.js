const cartItemUpdateForm = document.querySelectorAll('.cart-item-management');


async function updateCartItem(event) {
	event.preventDefault();

	const form = event.target;
	const productId = form.dataset.productid;
	const csrfToken = form.dataset.csrf;
	const quantity = form.firstElementChild.value;

	let response;
	try {
		response = await fetch('/cart/items', {
			method: 'PATCH',
			body: JSON.stringify({
				productId: productId,
				quantity: quantity,
				_csrf: csrfToken
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		alert('Something went wrong!');
		return;
	};

	if(!response.ok) {
		alert('Something went wrong!');
		return;
	};

	// 업데이트 후 디스플레이 변경 로직
	const responseData = response.json();
	
};

for(const formElemnt of cartItemUpdateForm) {
	formElemnt.addEventListener('submit', updateCartItem);
};