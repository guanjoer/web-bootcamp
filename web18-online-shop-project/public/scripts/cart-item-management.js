const cartItemUpdateForm = document.querySelectorAll('.cart-item-management');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartBadges = document.querySelectorAll('.nav-items .badge'); // 모바일 뱃지 포함

const deleteItemButtons = document.querySelectorAll('#delete-item-btn');
const buyButton = document.querySelector('#cart-total button');


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
		form.closest('li').remove(); // li Element
	} else {
		// 특정 항목에 대한 총 금액
		const cartItemTotalPrice = form.closest('.cart-item').querySelector('.cart-item-total-price');
		cartItemTotalPrice.textContent = responseData.updatedCartData.updatedItemPrice;
	};


	// 전체 물품 총 금액
	cartTotalPrice.textContent = responseData.updatedCartData.formattedTotalPrice;

	// 장바구니 뱃지 업데이트
	for(const cartBadge of cartBadges) {
		cartBadge.textContent = responseData.updatedCartData.newTotalQuantity;
	}

};


// 카트 물품 삭제 진행(Ajax)
async function deleteCartItem(event) {
	const button = event.target; // Delete 버튼
	const cartItem = button.closest('.cart-item'); // Cart Item 요소 // aticle 태그
	const form = cartItem.querySelector('form'); // 같은 Cart Item 안의 form 태그
	const productId = form.dataset.productid;
	const csrfToken = form.dataset.csrf;

	let response;
	try {
		response = await fetch('/cart/items', {
			method: 'DELETE',
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
	}

	const responseData = await response.json();

	// UI 업데이트: 해당 아이템을 삭제
	event.target.closest('li').remove();

	// 전체 물품 총 금액
	cartTotalPrice.textContent = responseData.updatedCartData.formattedTotalPrice;

	// 장바구니 뱃지 업데이트
	for(const cartBadge of cartBadges) {
		cartBadge.textContent = responseData.updatedCartData.newTotalQuantity;
	}

	if (responseData.updatedCartData.isEmpty) {
		buyButton.style.display = 'none';
		const fallbackElement = document.getElementById('cart-fallback-after-delete');
		fallbackElement.textContent = 'Please add items to your cart before proceeding to buy.';
	}
};

// V2 Logic
async function handlePayment() {
	const PortOne = window.PortOne;
	const response = await PortOne.requestPayment({
		// Store ID 설정
		storeId: "store-4f904854-4a91-4eeb-a14c-3266c9e0c3a7",
		// 채널 키 설정
		channelKey: "channel-key-53a845d1-4048-4fb5-ae2f-46e676266598",
		paymentId: 'payment_' + new Date().getTime(),
		orderName: "나이키 와플 트레이너 2 SD",
		totalAmount: 1000,
		currency: "CURRENCY_KRW",
		payMethod: "CARD",
		isTestChannel: true,
		redirectUrl: 'http://localhost:3000/orders',
		customer: {
			fullName: '홍길동',
			phoneNumber: '010-1234-5678',
			email: 'user@test.com',
			address: {
					country: 'KR',
					addressLine1: '서울특별시 강남구 압구정동',
					addressLine2: '현대아파트 707호'}
		}
	  });

	  if (response.code != null) {
		// 오류 발생
		return alert(response.message);
	  }
	
	  // 고객사 서버에서 /payment/complete 엔드포인트를 구현해야 합니다.
	  // (다음 목차에서 설명합니다)
	  const notified = await fetch(`/orders`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		// paymentId와 주문 정보를 서버에 전달합니다
		body: JSON.stringify({
		  paymentId: paymentId,
		  totalAmount: totalAmount
		  // 주문 정보...
		}),
	  });
};

// V1 Logic
// function handlePayment() {
//     const IMP = window.IMP; // 생략해도 괜찮습니다.
//     IMP.init('imp06230627'); // 'iamport' 대신 자신이 발급받은 가맹점 식별코드를 사용합니다.

//     const totalAmount = document.getElementById('cart-total-price').textContent.replace(' KRW', '').replace(',', '').replace('₩', '');


//     IMP.request_pay({
//         pg: 'html5_inicis', // 사용할 PG사를 입력합니다.
//         pay_method: 'card',
//         merchant_uid: 'merchant_' + new Date().getTime(),
//         name: '주문명: 결제 테스트',
//         amount: totalAmount,
//         buyer_email: 'buyer@example.com',
//         buyer_name: '구매자 이름',
//         buyer_tel: '010-1234-5678',
//         buyer_addr: '서울특별시 강남구 삼성동',
//         buyer_postcode: '123-456',

//         // m_redirect_url: 'http:localhost:3000/orders' // 모바일에서 결제 완료 후 리디렉션될 URL
//     }, function (rsp) {
//         if (rsp.success) {
//             // 결제 성공 시 서버로 결제 정보 전송
//             fetch('/orders', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'CSRF-Token': document.querySelector('input[name="_csrf"]').value
//                 },
//                 body: JSON.stringify({
//                     imp_uid: rsp.imp_uid,
//                     merchant_uid: rsp.merchant_uid,
//                 })
//             }).then(function (response) {
//                 return response.json();
//             }).then(function (data) {
//                 if (data.success) {
//                     alert('결제가 완료되었습니다.');
//                     window.location.href = '/orders';
//                 } else {
//                     alert('결제 처리 중 오류가 발생했습니다.');
//                 }
//             });
//         } else {
//             alert('결제에 실패하였습니다. 에러 내용: ' + rsp.error_msg);
//         }
//     });
// }

for(const formElement of cartItemUpdateForm) {
	formElement.addEventListener('submit', updateCartItem);
};

for(const deleteBtn of deleteItemButtons) {
	deleteBtn.addEventListener('click', deleteCartItem);
};

buyButton.addEventListener('click', handlePayment);