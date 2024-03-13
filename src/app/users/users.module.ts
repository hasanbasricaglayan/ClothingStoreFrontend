import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
	declarations: [
		ListUsersComponent,
		AddUserComponent,
		EditUserComponent
	],
	imports: [
		CommonModule,
		UsersRoutingModule,
		FormsModule
	]
})
export class UsersModule { }
