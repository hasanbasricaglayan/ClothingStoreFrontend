import { Product } from "../product/product"

export class Category {
	categoryId: number
	name: string
	products: Product[]

	constructor(categoryId: number, name: string, products: Product[]) {
		this.categoryId = categoryId
		this.name = name
		this.products = products
	}
}
