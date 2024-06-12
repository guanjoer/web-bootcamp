class Cart {
	constructor(items = [], totalQuantity = 0, totalPrice = 0) {
		this.items = items;
		this.totalQuantity = +totalQuantity;
		this.totalPrice = totalPrice;
	}

	addItem(product) {
		
		// 이미 장바구니에 동일한 항목이 존재할 때
		for(let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			if(item.product._id.toString() === product._id.toString()) {
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
			quantity: 1,
			totalPrice: product.price
		};

		this.items.push(cartItem);
		this.totalQuantity += 1;
		this.totalPrice += product.price;
	};

	updateItem(productId, newQuantity) {
		for(let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			if(item.product._id.toString() === productId && newQuantity > 0) {
				const cartItem = {...item};
				const quantityDelta = newQuantity - item.quantity;
				cartItem.quantity = newQuantity;
				cartItem.totalPrice = newQuantity * item.product.price;
				this.items[i] = cartItem;

				this.totalQuantity += quantityDelta;
				this.totalPrice += quantityDelta * item.product.price;

				return {updatedItemPrice: this.formatPrice(cartItem.totalPrice)};
			} else if(item.product._id.toString() === productId && newQuantity <= 0) {
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
			if(item.product._id.toString() === productId) {
				this.items.splice(i, 1);
				this.totalQuantity -= item.quantity; // 장바구니 뱃지 업데이트 용
				this.totalPrice -= item.totalPrice; // 전체 물품 가격 표시 용

				return;
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