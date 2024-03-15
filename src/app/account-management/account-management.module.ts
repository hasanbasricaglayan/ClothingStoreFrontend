import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountManagementRoutingModule } from './account-management-routing.module';
import { AccountComponent } from './account/account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
	declarations: [
		AccountComponent,
		EditAccountComponent,
		SignUpComponent,
		LoginComponent
	],
	imports: [
		CommonModule,
		AccountManagementRoutingModule,
		FormsModule
	]
})
export class AccountManagementModule { }
