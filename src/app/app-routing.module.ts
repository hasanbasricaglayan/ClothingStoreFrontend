import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { authGuardGuard } from './shared/auth-guard.guard';
import { EditUserComponent } from './account/edit-user/edit-user.component';

const routes: Routes = [
	{
		path: "orders",
		loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule),
		canActivate : [authGuardGuard]
	},
	{path : "product-list", component : ProductListComponent},
	{path : "detail-product/:id", component : DetailProductComponent},
	{path: "login", component: LoginComponent },
	{path: "account",component : AccountComponent , canActivate : [authGuardGuard]},
	{path: "edit-user",component : EditUserComponent,canActivate:[authGuardGuard]}
	
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
