const db = require('../data/database');
const mongodb = require('mongodb');

class Order {
	// Status: pending, fulfilled, cancelled
	constructor(cart, userData, status = 'pending', date, orderId) {
		this.productData = cart;
		this.userData = userData;
		this.status = status;
		this.date = new Date(date);
		if(this.date) {
			this.formattedDate = this.date.toLocaleDateString('ko-KR', { // 2024. 01. 01
				year: 'numeric',
				month: '2-digit',
				day: '2-digit'
			});
		};
		this.id = orderId;
	};

	static transformOrderDocument(orderDoc) { // 데이터 베이스의 내용을 인스턴스화
		return new Order(
		  orderDoc.productData,
		  orderDoc.userData,
		  orderDoc.status,
		  orderDoc.date,
		  orderDoc._id // orders 컬렉션 내 document들의 각 고유 id
		);
	  }

	static transformOrderDocuments(orderDocs) {
		return orderDocs.map(this.transformOrderDocument);
	  };

	  static async findAll() { // 유저에 상관없이 orders 컬렉션 내 모든 문서.
		const orders = await db
		  .getDb()
		  .collection('orders')
		  .find()
		  .sort({ _id: -1 }) // 최신순 정렬
		  .toArray();
	
		return this.transformOrderDocuments(orders);
	  }

	static async findAllForUser(userId) { // UserId로 필터링 한 documents만. 즉 특정 유저가 주문한 물품에 대해서만.
		const uid = new mongodb.ObjectId(userId);
	
		const orders = await db
		  .getDb()
		  .collection('orders')
		  .find({ 'userData._id': uid })
		  .sort({ _id: -1 })
		  .toArray();

		return this.transformOrderDocuments(orders);
	  };

	  static async findById(orderId) {
		const order = await db
		  .getDb()
		  .collection('orders')
		  .findOne({ _id: new mongodb.ObjectId(orderId) });
	
		return this.transformOrderDocument(order); // Order class를 이용하여 인스턴스화 진행
	  };

	async save() {
		if(this.id) {
			const orderId = new mongodb.ObjectId(this.id);
			return db
			  .getDb()
			  .collection('orders')
			  .updateOne({ _id: orderId }, { $set: { status: this.status } });
		} else {
			const orderDocument = { // orders 컬렉션의 id가 존재하지 않을 때.
				userData: this.userData,
				productData: this.productData,
				date: new Date(),
				status: this.status
			};

			return await db.getDb().collection('orders').insertOne(orderDocument);
		}
	}
}


module.exports = Order;