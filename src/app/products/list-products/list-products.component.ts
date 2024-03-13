import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, concatMap } from 'rxjs';
import { CategoryDTO } from 'src/app/models/category/category-dto';
import { ProductDTO } from 'src/app/models/product/product-dto';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
	selector: 'app-list-products',
	templateUrl: './list-products.component.html',
	styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit, OnDestroy {
	productsSubscription?: Subscription
	products: ProductDTO[] = []
	filteredProducts?: ProductDTO[]

	categoriesSubscription?: Subscription
	categories: CategoryDTO[] = []

	constructor(private productService: ProductService, private categoryService: CategoryService) { }

	filterProducts(f: number) {
		if (f == 0)
			this.productService.getProducts().subscribe(products => {
				this.products = products
			})
		else
			this.productService.getProductsOfCategory(+f).subscribe(products => {
				this.products = products
			})
	}

	ngOnInit(): void {
		this.categoriesSubscription = this.categoryService.updatedCategories$.subscribe(categories => {
			this.categories = categories
		})

		this.productsSubscription = this.productService.updatedProducts$.subscribe(products => {
			this.products = products;
		})

		this.categoryService.getAllCategoriesWithProducts().pipe(
			concatMap(() => {
				return this.productService.getProducts()
			})
		).subscribe()
	}

	ngOnDestroy(): void {
		this.categoriesSubscription?.unsubscribe()
		this.productsSubscription?.unsubscribe()
	}
}
