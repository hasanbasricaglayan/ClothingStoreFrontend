export class Order {
	orderId: number
	userId: number
	orderDate: Date
	status: string

	constructor(orderId: number, userId: number, orderDate: Date, status: string) {
		this.orderId = orderId
		this.userId = userId
		this.orderDate = orderDate
		this.status = status
	}
}
