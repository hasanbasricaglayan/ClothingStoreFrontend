import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../models/product/product';
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

	getProducts() {
		const URL = this.baseURL

		this.http.get<ProductDTO[]>(URL).subscribe(products => {
			this.products = products
			this.updatedProducts$$.next([...this.products])
		})

		return this.updatedProducts$
	}

	getProductsOfCategory(categoryId: number) {
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

	editProduct(productId: number, product: ProductDTO): Observable<Product> {
		const URL = `${this.baseURL}/${productId}`

		const options = {
			headers: new HttpHeaders({
				'content-type': 'application/json'
			})
		}

		return this.http.put<Product>(
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
}
