import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ProductDTO } from '../models/product/product-dto';

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	private products: ProductDTO[] = []
	private updatedProducts$$ = new Subject<ProductDTO[]>()
	readonly updatedProducts$ = this.updatedProducts$$.asObservable()

	baseURL = "https://localhost:7108/api/Products"

	constructor(private http: HttpClient) { }

	getAllProducts(): Observable<ProductDTO[]> {
		const URL = this.baseURL

		this.http.get<ProductDTO[]>(URL).subscribe(products => {
			this.products = products
			this.updatedProducts$$.next([...this.products])
		})

		return this.updatedProducts$
	}

	getAllProductsOfCategory(categoryId: number): Observable<ProductDTO[]> {
		const URL = `https://localhost:7108/api/Categories/${categoryId}/Products`

		this.http.get<ProductDTO[]>(URL).subscribe(products => {
			this.products = products
			this.updatedProducts$$.next([...this.products])
		})

		return this.updatedProducts$
	}

	getProductById(productId: number): Observable<ProductDTO> {
		const URL = `${this.baseURL}/${productId}`

		return this.http.get<ProductDTO>(URL)
	}

	// Admin
	addProduct(product: ProductDTO) {
		const URL = this.baseURL

		const options = {
			headers: new HttpHeaders({
				'content-type': 'application/json',
				'authorization': 'Bearer ' + localStorage.getItem('token') || ''
			})
		}

		this.http.post<ProductDTO>(
			URL,
			JSON.stringify({
				CategoryId: product.categoryId,
				Brand: product.brand,
				Name: product.name,
				Color: product.color,
				Size: product.size,
				Price: product.price,
				Description: product.description,
				QuantityInStock: product.quantityInStock,
				ImageURL: product.imageURL,
			}),
			options)
			.subscribe(product => {
				this.products = [...this.products, product]
				this.updatedProducts$$.next([...this.products])
			})
	}

	// Admin
	editProduct(productId: number, product: ProductDTO): Observable<ProductDTO> {
		const URL = `${this.baseURL}/${productId}`

		const options = {
			headers: new HttpHeaders({
				'content-type': 'application/json',
				'authorization': 'Bearer ' + localStorage.getItem('token') || ''
			})
		}

		return this.http.put<ProductDTO>(
			URL,
			JSON.stringify({
				CategoryId: product.categoryId,
				Brand: product.brand,
				Name: product.name,
				Color: product.color,
				Size: product.size,
				Price: product.price,
				Description: product.description,
				QuantityInStock: product.quantityInStock,
				ImageURL: product.imageURL
			}),
			options)
	}

	// Admin
	deleteProduct(productId: number) {
		const URL = `${this.baseURL}/${productId}`

		this.http.delete(URL).subscribe(() => {
			this.products = this.products.filter(product => product.productId !== productId)
			this.updatedProducts$$.next([...this.products])
		})
	}
}
