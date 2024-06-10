class Cart {
	constructor(items = [], totalQuantity = 0, totalPrice = 0) {
		this.items = items;
		this.totalQuantity = totalQuantity;
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

	// 한국 화폐로 변환
	formatPrice(price) {
		return new Intl.NumberFormat('ko-KR', {
			style: 'currency',
			currency: 'KRW'
		}).format(price);
	}

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