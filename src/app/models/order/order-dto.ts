import { OrderProductDTO } from "../order-product/order-product-dto"

export interface OrderDTO {
	orderId?: number
	userId: number
	orderDate: Date
	status: string
	products: OrderProductDTO[]
}
