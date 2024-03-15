import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { authGuard, authGuardAdmin } from './shared/auth.guard';

const routes: Routes = [
	{ path: "", component: ListProductsComponent },
	{ path: "cart", component: CartComponent },
	{
		path: "users",
		loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
		canActivate: [authGuard, authGuardAdmin]
	},
	{
		path: "categories",
		loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
		canActivate: [authGuard, authGuardAdmin]
	},
	{
		path: "products",
		loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
	},
	{
		path: "orders",
		loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule),
		canActivate: [authGuard]
	},
	{
		path: "account",
		loadChildren: () => import('./account-management/account-management.module').then(m => m.AccountManagementModule),
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
