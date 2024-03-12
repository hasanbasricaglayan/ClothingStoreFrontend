import { OrderProduct } from "../order-product/order-product"

export class Product {
	productId: number
	categoryId: number
	brand: string
	name: string
	color: string
	size: string
	price: number
	description: string
	quantityInStock: number
	imageURL: string
	orders?: OrderProduct[]

	constructor(
		productId: number,
		categoryId: number,
		brand: string,
		name: string,
		color: string,
		size: string,
		price: number,
		description: string,
		quantityInStock: number,
		imageURL: string,
		orders: OrderProduct[]
	) {
		this.productId = productId
		this.categoryId = categoryId
		this.brand = brand
		this.name = name
		this.color = color
		this.size = size
		this.price = price
		this.description = description
		this.quantityInStock = quantityInStock
		this.imageURL = imageURL
		this.orders = orders
	}
}
