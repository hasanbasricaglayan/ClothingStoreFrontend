import { ProductDTO } from "../product/product-dto"

export interface CategoryDTO {
	categoryId?: number
	name: string
	products: ProductDTO[]
}
