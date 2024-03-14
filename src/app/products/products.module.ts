import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ListProductsAdminComponent } from './list-products-admin/list-products-admin.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
	declarations: [
		ListProductsComponent,
		ListProductsAdminComponent,
		AddProductComponent,
		ProductDetailsComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ProductsRoutingModule,

	]
})
export class ProductsModule { }
