import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
	declarations: [
		ListProductsComponent,
		ProductDetailsComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ProductsRoutingModule,
		
	]
})
export class ProductsModule { }
