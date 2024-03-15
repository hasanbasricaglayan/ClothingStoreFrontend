import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryDTO } from 'src/app/models/category/category-dto';
import { ProductDTO } from 'src/app/models/product/product-dto';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html',
	styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
	categoriesSubscription?: Subscription
	categories: CategoryDTO[] = []

	constructor(private router: Router, private categoryService: CategoryService, private productService: ProductService) { }

	addProduct(form: NgForm) {
		let product: ProductDTO = {
			categoryId: form.value.categoryId,
			brand: form.value.brand,
			name: form.value.name,
			color: form.value.color,
			size: form.value.size,
			price: form.value.price,
			description: form.value.description,
			quantityInStock: form.value.quantityInStock,
			imageURL: form.value.imageURL
		}
		this.productService.addProduct(product)
		this.router.navigate(['/products/admin'])
	}

	ngOnInit(): void {
		this.categoriesSubscription = this.categoryService.updatedCategories$.subscribe(categories => {
			this.categories = categories
		})
		this.categoryService.getAllCategoriesWithProducts().subscribe()
	}

	ngOnDestroy(): void {
		this.categoriesSubscription?.unsubscribe()
	}

}
