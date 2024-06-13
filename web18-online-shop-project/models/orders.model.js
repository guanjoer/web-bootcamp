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
			this.formattedDate = this.date.toLocaleDateString('ko-KR', { // 2024-01-01
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

	static async findAllForUser(userId) {
		const uid = new mongodb.ObjectId(userId);
	
		const orders = await db
		  .getDb()
		  .collection('orders')
		  .find({ 'userData._id': uid })
		  .sort({ _id: -1 })
		  .toArray();

		return this.transformOrderDocuments(orders);
	  }

	async save() {
		if(this.id) {
			// Update orders
		} else {
			const orderDocument = {
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