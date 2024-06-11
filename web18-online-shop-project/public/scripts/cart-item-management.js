const cartItemUpdateForm = document.querySelectorAll('.cart-item-management');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartBadge = document.querySelector('.nav-items .badge'); // 클래스 임으로 모바일 뱃지에서도 표시하기 위해, 반복문 사용(querySelectorAll)


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
	const responseData = await response.json();

	if(responseData.updatedCartData.updatedItemPrice === 0) {
		form.parentElement.parentElement.remove(); // li Element
	};

	// 특정 항목에 대한 총 금액
	const cartItemTotalPrice = form.parentElement.querySelector('.cart-item-total-price');
	cartItemTotalPrice.textContent = responseData.updatedCartData.updatedItemPrice;

	// 전체 물품 총 금액
	cartTotalPrice.textContent = responseData.updatedCartData.newTotalPrice;

	// 장바구니 뱃지 업데이트
	cartBadge.textContent = responseData.updatedCartData.newTotalQuantity;

};

for(const formElemnt of cartItemUpdateForm) {
	formElemnt.addEventListener('submit', updateCartItem);
};