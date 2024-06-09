const deleteProductBtn = document.querySelectorAll('.product-item button');


async function deleteProduct(event) {
	const buttonElement = event.target;

	// 사용자가 보낸 요청을 csrf미들웨어가 검증하기 때문에, csrfToken이 필요하고, server-side에서 req.params.id받고 있고 해당 id로 DB내 물품을 찾기 때문에, productId가 필요하다.
	// 이러한 값은, ejs의 button에 "data-[identifier] = <%= value %>" 설정함으로써, client-side js에서 해당 값을 다룰 수 있다.
	const productId = buttonElement.dataset.productid;
	const csrfToken = buttonElement.dataset.csrf;

	const response = await fetch('/admin/products/' + productId + '?_csrf=' + csrfToken, {
		method: 'DELETE'
	});

	if(!response.ok) {
		alert('Something went wrong!');
		return;
	};

	// buttonElement에서 가장 가까운 list Item 찾기
	let listItem = buttonElement;
	while (listItem && listItem.tagName !== 'LI') { // li 태그를 찾을 때까지 반복
		listItem = listItem.parentElement;
	  };

	if(listItem) {
		listItem.remove();
	};

};

for(const singleDeleteProductBtn of deleteProductBtn) {
	singleDeleteProductBtn.addEventListener('click', deleteProduct);
};