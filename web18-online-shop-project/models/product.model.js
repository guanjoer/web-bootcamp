const mongodb = require('mongodb');

const db = require('../data/database');

const fs = require('fs');
const path = require('path');


class Product {
	// Input is a object.
	constructor(productData) {
		this.title = productData.title;
		this.summary = productData.summary;
		this.price = +productData.price; // Transform to number
		this.description = productData.description;
		this.image = productData.image; // the image name
		this.updateImage()
		if(productData._id) {
			this.id = productData._id.toString();
		};
	};

	static async findById(productId) {
		// productId는 16진수 문자열이므로, DB에 실제적으로 저장된 id의 값인 12바이트의 이진 데이터로 변환하기 위해서는,
		// mongodb의 ObjectId라는 클래스를 인스턴스화 하여 적용시킬 필요가 있다.
		let prodId;
		try {
			prodId = new mongodb.ObjectId(productId);
		} catch (error) {
			error.code = 404;
			throw error;
		};

		const product = await db.getDb().collection('products').findOne({_id: prodId});

		if(!product) {
			const error = new Error('제공한 ID에 해당하는 제품을 찾지 못하였습니다.');
			error.code = 404;

			throw error;
		}
		return new Product(product);
	};

	// static 사용시, 인스턴스화를 커지지 않고, 클래스에 바로 접근이 가능함.
	static async findAll() {
		const products = await db.getDb().collection('products').find().toArray();

		// 배열 내에 존재하는 각각의 객체 정보를 Product 클래스의 파라미터로 넣어, 인스턴스화 시키는 것. 즉 Product 객체 생성. 
		// 이렇게 하는 이유는, save()를 보면, img에 대한 url, path가 존재하지 않는데, 모든 product 항목을 페이지에 표시하기 위해서는, img path or url이 필요한데, db의 image에 대한 값을 Product 클래스의 파라미터로 넣음으로 인해, path 및 url을 생성하기 위함.
		return products.map(function(productDocument) {
			return new Product(productDocument);
		});
	};

	static async findMultiple(ids) {
		const productIds = ids.map(function(id) {
		  return new mongodb.ObjectId(id);
		})
		
		const products = await db
		  .getDb()
		  .collection('products')
		  .find({ _id: { $in: productIds } }) // 배열 내에 존재하는 product id와 일치하는 모든 products 내 문서들
		  .toArray(); // [{_id: ..., title: ..., summary: ..., ...}, {_id: ..., title: ..., summary: ..., ...}, ...]
	
		return products.map(function (productDocument) { // 배열 내, 각각의 요소에 대해서, 새로운 배열 반환(기존 배열 유지)
		  return new Product(productDocument); // Product 클래스를 이용하여 인스턴스화
		});
	  };

	updateImage() {
		this.imagePath = `product-data/images/${this.image}`; // 실제 파일 시스템 내 image들의 경로
		this.imageUrl = `/products/assets/images/${this.image}`; // 클라이언트가 요청하는 경로
	};

	formatPrice() {
		return new Intl.NumberFormat('ko-KR', {
			style: 'currency',
			currency: 'KRW'
		}).format(this.price);
	};

	async save() {

		const productData = {
			title: this.title,
			summary: this.summary,
			price: this.price,
			description: this.description,
			image: this.image
		};

		if(this.id) {
			const productId = new mongodb.ObjectId(this.id)

			if(!this.image) {
				delete productData.image;
			}
			
			await db.getDb().collection('products').updateOne({_id: productId}, {$set: productData})
		} else {
			await db.getDb().collection('products').insertOne(productData);
		}

	};

	replaceImage(newImage) {
		this.image = newImage;
		this.updateImage();
	};

	// 단일 제품 삭제
	async remove() {
		const productId = new mongodb.ObjectId(this.id);
		
		const product = await Product.findById(this.id);
		
		// 이미지 파일 절대 경로
		const imagePath = path.join(__dirname,'..', product.imagePath);
	
		await db.getDb().collection('products').deleteOne({ _id: productId });
	
		// 파일 시스템에서 이미지 파일 삭제
		fs.unlink(imagePath, (err) => {
		  if (err) {
			console.error('이미지 파일을 삭제하는 중에 오류가 발생했습니다:', err);
		  } else {
			console.log('이미지 파일이 성공적으로 삭제되었습니다:', imagePath);
		  }
		});
	  }

// 	async remove() {
// 		const productId = new mongodb.ObjectId(this.id);
// 		await db.getDb().collection('products').deleteOne({_id: productId});
// 	};
}

module.exports = Product;