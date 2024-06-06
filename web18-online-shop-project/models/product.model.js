const db = require('../data/database');

class Product {
	// Input is a object.
	constructor(productData) {
		this.title = productData.title;
		this.summary = productData.summary;
		this.price = +productData.price; // Transform to number
		this.description = productData.description;
		this.image = productData.image; // the image name
		this.imagePath = `product-data/images/${productData.image}`;
		this.imageUrl = `/products/assets/images/${productData.image}`;
	}

	async save() {
		const productData = {
			title: this.title,
			summary: this.summary,
			price: this.price,
			description: this.description,
			image: this.image
		};

		await db.getDb().collection('products').insertOne(productData);
	}
}

module.exports = Product;