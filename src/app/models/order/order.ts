import { OrderProduct } from "../order-product/order-product"

export class Order {
	orderId: number
	userId: number
	orderDate: Date
	status: string
	products: OrderProduct[]

	constructor(orderId: number, userId: number, orderDate: Date, status: string, products: OrderProduct[]) {
		this.orderId = orderId
		this.userId = userId
		this.orderDate = orderDate
		this.status = status
		this.products = products
	}
}
