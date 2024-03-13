import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
	declarations: [
		ListProductsComponent
	],
	imports: [
		CommonModule,
		ProductsRoutingModule,
		FormsModule
	]
})
export class ProductsModule { }
