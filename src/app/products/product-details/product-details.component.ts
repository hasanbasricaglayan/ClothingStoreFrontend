import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { CategoryDTO } from '../../models/category/category-dto';
import { ProductDTO } from '../../models/product/product-dto';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
	selector: 'app-product-details',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
	product?: ProductDTO
	category?: CategoryDTO

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private productsService: ProductService,
		private categoryService: CategoryService
	) { }

	ngOnInit(): void {
		this.activatedRoute.params.pipe(
			concatMap(params => {
				const productId = params['productId']
				return this.productsService.getProductById(productId)
			}),
			concatMap(product => {
				this.product = product
				return this.categoryService.getCategoryById(product.categoryId)
			})
		)
			.subscribe({
				next: category => {
					this.category = category
				},
				error: () => {
					this.router.navigate(['/products'])
				}
			})
	}
}
