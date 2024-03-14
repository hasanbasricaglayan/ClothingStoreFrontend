import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ListProductsAdminComponent } from './list-products-admin/list-products-admin.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
	{ path: "", component: ListProductsComponent },
	{ path: "admin", component: ListProductsAdminComponent },
	{ path: "add", component: AddProductComponent },
	{ path: ":productId", component: ProductDetailsComponent },
	{ path: "", redirectTo: "products", pathMatch: "full" }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProductsRoutingModule { }
