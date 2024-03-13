import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { EditUserComponent } from './account/edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';
import { authGuardGuard } from './shared/auth.guard';

const routes: Routes = [
	{
		path: "users",
		loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
	},
	{
		path: "products",
		loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
	},
	{
		path: "orders",
		loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule),
		canActivate: [authGuardGuard]
	},
	{ path: "login", component: LoginComponent },
	{ path: "account", component: AccountComponent, canActivate: [authGuardGuard] },
	{ path: "edit-user", component: EditUserComponent, canActivate: [authGuardGuard] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
