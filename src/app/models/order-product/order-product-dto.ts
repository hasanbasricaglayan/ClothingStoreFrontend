import { ProductDTO } from "../product/product-dto"

export interface OrderProductDTO {
	orderId?: number
	productId?: number
	quantity: number
	price: number
	product: ProductDTO
}
