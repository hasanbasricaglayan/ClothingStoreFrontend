import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CategoryDTO } from '../models/category/category-dto';
import { ProductDTO } from '../models/product/product-dto';
import { ProductService } from './product.service';

@Injectable({
	providedIn: 'root'
})
export class CategoryService {
	private categories: CategoryDTO[] = []
	private updatedCategories$$ = new Subject<CategoryDTO[]>()
	readonly updatedCategories$ = this.updatedCategories$$.asObservable()

	private products: ProductDTO[] = []
	private updatedProducts$$ = new Subject<ProductDTO[]>()
	readonly updatedProducts$ = this.updatedProducts$$.asObservable()

	baseURL = "https://localhost:7108/api/Categories"

	constructor(private http: HttpClient, private productService: ProductService) { }

	getCategories() {
		const URL = `${this.baseURL}/`

		this.http.get<CategoryDTO[]>(URL).subscribe(categories => {
			this.categories = categories
			this.updatedCategories$$.next([...this.categories])
		})

		return this.updatedCategories$
	}

	getProductsOfCategory(categoryId: number) {
		const URL = `${this.baseURL}/${categoryId}/Products`

		this.http.get<ProductDTO[]>(URL).subscribe(products => {
			this.products = products
			this.updatedProducts$$.next([...this.products])
		})

		return this.updatedProducts$
	}

	getCategoryByIdWithProducts(categoryId: number): Observable<CategoryDTO> {
		const URL = `${this.baseURL}/${categoryId}`

		return this.http.get<CategoryDTO>(URL)
	}

	getProductById(productId: number): Observable<ProductDTO> {
		const URL = `${this.baseURL}/${productId}`

		return this.http.get<ProductDTO>(URL)
	}

	getCategoryById(categoryId: number) {
		const URL = `${this.baseURL}/${categoryId}`

		return this.http.get<CategoryDTO>(URL)
	}
}
