export interface ProductToDisplay {
	productId?: number
	categoryId?: number
	category: string
	brand: string
	name: string
	color: string
	size: string
	price: number
	description?: string
	quantityInStock: number
	imageURL: string
}
