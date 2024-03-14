import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, concatMap } from 'rxjs';
import { CategoryDTO } from 'src/app/models/category/category-dto';
import { OrderDTO } from 'src/app/models/order/order-dto';
import { OrderToDisplay } from 'src/app/models/order/order-to-display';
import { ProductDTO } from 'src/app/models/product/product-dto';
import { ProductToDisplay } from 'src/app/models/product/product-to-display';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
	selector: 'app-list-products-admin',
	templateUrl: './list-products-admin.component.html',
	styleUrls: ['./list-products-admin.component.css']
})
export class ListProductsAdminComponent implements OnInit, OnDestroy {
	categoriesSubscription?: Subscription
	categories: CategoryDTO[] = []

	productsSubscription?: Subscription
	products: ProductDTO[] = []
	productsToDisplay?: ProductToDisplay[]

	constructor(private categoryService: CategoryService, private productService: ProductService) { }

	deleteProduct(productId: number) {
		if (confirm("Etes-vous sûr de vouloir supprimer l'article ?"))
			this.productService.deleteProduct(productId)
	}

	productsToProductsToDisplay(): ProductToDisplay[] {
		return this.products.map(product => {
			const category = this.categories.find(category => category.categoryId === product.categoryId)
			return {
				productId: product.productId,
				category: category?.name,
				brand: product.brand,
				name: product.name,
				color: product.color,
				size: product.size,
				price: product.price,
				quantityInStock: product.quantityInStock,
				imageURL: product.imageURL
			} as ProductToDisplay
		})
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
		)
			.subscribe(() => {
				this.productsToDisplay = this.productsToProductsToDisplay()
			})
	}

	ngOnDestroy(): void {
		this.categoriesSubscription?.unsubscribe()
		this.productsSubscription?.unsubscribe()
	}
}
