import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../shared/auth.guard';
import { AccountComponent } from './account/account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
	{ path: "sign-up", component: SignUpComponent },
	{ path: "login", component: LoginComponent },
	{ path: "", component: AccountComponent, canActivate: [authGuard] },
	{ path: "edit", component: EditAccountComponent, canActivate: [authGuard] },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AccountManagementRoutingModule { }
