import { Order } from "../order/order"
import { Product } from "../product/product"

export class OrderProduct {
	orderId: number
	order?: Order
	productId: number
	product?: Product
	quantity: number
	price: number

	constructor(orderId: number, order: Order, productId: number, product: Product, quantity: number, price: number) {
		this.orderId = orderId
		this.order = order
		this.productId = productId
		this.product = product
		this.quantity = quantity
		this.price = price
	}
}
