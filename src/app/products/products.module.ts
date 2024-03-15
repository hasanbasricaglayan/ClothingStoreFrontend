import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';
import { ListProductsAdminComponent } from './list-products-admin/list-products-admin.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsRoutingModule } from './products-routing.module';

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
