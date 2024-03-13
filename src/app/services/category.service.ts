import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CategoryDTO } from '../models/category/category-dto';
import { ProductDTO } from '../models/product/product-dto';

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

	constructor(private http: HttpClient) { }

	getAllCategoriesWithProducts(): Observable<CategoryDTO[]> {
		const URL = `${this.baseURL}/`

		this.http.get<CategoryDTO[]>(URL).subscribe(categories => {
			this.categories = categories
			this.updatedCategories$$.next([...this.categories])
		})

		return this.updatedCategories$
	}

	getCategoryByIdWithProducts(categoryId: number): Observable<CategoryDTO> {
		const URL = `${this.baseURL}/${categoryId}`

		return this.http.get<CategoryDTO>(URL)
	}

	// Admin
	addCategory(category: CategoryDTO) {
		const URL = this.baseURL

		const options = {
			headers: new HttpHeaders({
				'content-type': 'application/json',
				'authorization': 'Bearer ' + localStorage.getItem('token') || ''
			})
		}

		this.http.post<CategoryDTO>(
			URL,
			JSON.stringify({
				Name: category.name
			}),
			options)
			.subscribe(category => {
				this.categories = [...this.categories, category]
				this.updatedCategories$$.next([...this.categories])
			})
	}

	// Admin
	editCategory(categoryId: number, category: CategoryDTO): Observable<CategoryDTO> {
		const URL = `${this.baseURL}/${categoryId}`

		const options = {
			headers: new HttpHeaders({
				'content-type': 'application/json',
				'authorization': 'Bearer ' + localStorage.getItem('token') || ''
			})
		}

		return this.http.put<CategoryDTO>(
			URL,
			JSON.stringify({
				Name: category.name
			}),
			options)
	}

	// Admin
	deleteCategory(categoryId: number) {
		const URL = `${this.baseURL}/${categoryId}`

		const options = {
			headers: new HttpHeaders({
				'content-type': 'application/json',
				'authorization': 'Bearer ' + localStorage.getItem('token') || ''
			})
		}

		this.http.delete(URL, options)
			.subscribe(() => {
				this.categories = this.categories.filter(category => category.categoryId !== categoryId)
				this.updatedCategories$$.next([...this.categories])
			})
	}
}
