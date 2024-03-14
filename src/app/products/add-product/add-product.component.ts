import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductDTO } from 'src/app/models/product/product-dto';
import { ProductService } from 'src/app/services/product.service';

@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html',
	styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

	constructor(private router: Router, private productService: ProductService) { }

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
}
