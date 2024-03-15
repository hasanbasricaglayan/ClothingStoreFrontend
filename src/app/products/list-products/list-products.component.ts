import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, concatMap } from 'rxjs';
import { CategoryDTO } from 'src/app/models/category/category-dto';
import { ProductDTO } from 'src/app/models/product/product-dto';
import { ResearchService } from 'src/app/services/research.service';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
	selector: 'app-list-products',
	templateUrl: './list-products.component.html',
	styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit, OnDestroy {
	categoriesSubscription?: Subscription
	categories: CategoryDTO[] = []

	productsSubscription?: Subscription
	products: ProductDTO[] = []
	filteredProducts?: ProductDTO[]

	constructor(private productService: ProductService, private categoryService: CategoryService, private researchService: ResearchService) { }

	filterProducts(categoryFilter: number) {
		if (categoryFilter == 0)
			this.productService.getAllProducts().subscribe(products => {
				this.products = products
			})
		else
			this.productService.getAllProductsOfCategory(+categoryFilter).subscribe(products => {
				this.products = products
			})
	}

	reset() {
		this.ngOnInit()
	}

	receivedMessage?: string;
	searchProduct(r: string) {

		this.products = this.products.filter(p => p.name.toLowerCase().includes(r.toLowerCase()))
	}

	ngOnInit(): void {
		this.categoriesSubscription = this.categoryService.updatedCategories$.subscribe(categories => {
			this.categories = categories
		})

		this.productsSubscription = this.productService.updatedProducts$.subscribe(products => {
			this.products = products
		})

		this.categoryService.getAllCategoriesWithProducts().pipe(
			concatMap(() => {
				return this.productService.getAllProducts()
			})
		).subscribe()
		this.researchService.data$.subscribe(data => {
			this.receivedMessage = data ? data.message : '';
			console.log(this.receivedMessage)
			this.searchProduct(this.receivedMessage!)
		});
	}

	ngOnDestroy(): void {
		this.categoriesSubscription?.unsubscribe()
		this.productsSubscription?.unsubscribe()


	}
}
