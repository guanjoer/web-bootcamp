const Product = require('./product.model');

class Cart {
	constructor(items = [], totalQuantity = 0, totalPrice = 0) {
		this.items = items;
		this.totalQuantity = +totalQuantity;
		this.totalPrice = +totalPrice;
	}

	async updatePrices() {
		const productIds = this.items.map(function (item) {
		  return item.product.id;
		}); // [item.product.id1, item.product.id2, ...]
		// console.log(this.items);
	
		const products = await Product.findMultiple(productIds); // 장바구니의 제품 id를 기반으로, DB 내, products에 일치하는 제품 document 값들 // Product 인스턴스, 즉 프로미스 반환
	
		const deletableCartItemProductIds = []; // 현재 더 이상 판매되지 않는 상품이 장바구니에 존재할 때, 삭제하기 위한 것
	
		for (const cartItem of this.items) {
		  const product = products.find(function (prod) {
			return prod.id === cartItem.product.id; // 업데이트 된 제품 정보의 id값과 현재 장바구니의 존재하는 id 값이 일치할 때의, 제품 정보. 즉 제품이 삭제되지 않았을 경우.
		  });
	
		  if (!product) { // product = undefined인 경우. 즉 판매 중인 제품 중 삭제 된 제품이 존재할 때.
			// product was deleted!
			// "schedule" for removal from cart
			deletableCartItemProductIds.push(cartItem.product.id);
			continue; // 다음 반복으로
		  }
	
		  // product was not deleted
		  // set product data and total price to latest price from database
		  cartItem.product = product; // 새로운 제품 정보로 업데이트
		  cartItem.totalPrice = cartItem.quantity * cartItem.product.price; // 물품에 새로 반영된 가격 적용
		} // for문 종료
	
		if (deletableCartItemProductIds.length > 0) {
		  this.items = this.items.filter(function (item) {
			return deletableCartItemProductIds.indexOf(item.product.id) < 0; 
		  }); // 값이 -1이면, 해당 요소는 유지. 그겋지 않고, deletable~ 배열에 값이 존재하는 경우는, 해당 item 삭제 // 즉 deletable~ 배열에 값이 존재하지 않는 요소에 대해서만 true를 반환하여, 해당 요소만 this.items에 할당
		}
	
		// re-calculate cart totals // 즉 장바구니의 총 수량과 총 가격을 다시 계산하기 위해 초기화 진행
		this.totalQuantity = 0;
		this.totalPrice = 0;
	
		for (const item of this.items) { // 모든 item을 순차적으로 돌면서, 총 수량과 총 가격을 계산
		  this.totalQuantity = this.totalQuantity + item.quantity;
		  this.totalPrice = this.totalPrice + item.totalPrice;
		}
	  }

	addItem(product) {
		// 이미 장바구니에 동일한 항목이 존재할 때
		for(let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			if(item.product.id === product.id) {
				item.quantity = +item.quantity;
				item.quantity++;
				item.totalPrice += product.price;
				this.totalQuantity += 1;
				this.totalPrice += product.price;
				return;
			}
		};

		// 장바구니에 존재하지 않는 물품일 때
		const cartItem = {
			product: product,
			quantity: +1,
			totalPrice: product.price
		};

		this.items.push(cartItem);
		this.totalQuantity += 1;
		this.totalPrice += product.price;
	};

	updateItem(productId, newQuantity) {
		for(let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			if(item.product.id === productId && newQuantity > 0) {
				const cartItem = {...item};
				const quantityChange = newQuantity - item.quantity;
				cartItem.quantity = newQuantity;
				cartItem.totalPrice = newQuantity * item.product.price;
				this.items[i] = cartItem;

				this.totalQuantity += quantityChange;
				this.totalPrice += quantityChange * item.product.price;

				return {updatedItemPrice: this.formatPrice(cartItem.totalPrice)};
			} else if(item.product.id === productId && newQuantity <= 0) {
				this.items.splice(i, 1);
				this.totalQuantity -= item.quantity;
				this.totalPrice -= item.totalPrice;

				return {updatedItemPrice: 0};
			}
		};
	};

	// 물품 삭제
	removeItem(productId) {
		for(let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			if(item.product.id === productId) {
				this.items.splice(i, 1);
				this.totalQuantity -= item.quantity; // 장바구니 뱃지 업데이트 용
				this.totalPrice -= item.totalPrice; // 전체 물품 가격 표시 용

				// return;
				// return {removedItemPrice: item.totalPrice};
			}
		}
	}

	// 한국 화폐로 변환
	formatPrice(price) {
		return new Intl.NumberFormat('ko-KR', {
			style: 'currency',
			currency: 'KRW'
		}).format(price);
	}

	// items 배열 내, 각 item이라는 객체에 저장된 price의 값을 한국 화폐로 변환
	getFormattedItems() {
		return this.items.map(item => ({
			...item,
			formattedTotalPrice: this.formatPrice(item.totalPrice),
			product: {
				...item.product,
				formattedPrice: this.formatPrice(item.product.price)
			}
		}));
	}

	getFormattedTotalPrice() {
		return this.formatPrice(this.totalPrice);
	}
};

module.exports = Cart;