import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListUsersComponent } from './list-users/list-users.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
	declarations: [
		ListUsersComponent
	],
	imports: [
		CommonModule,
		UsersRoutingModule
	]
})
export class UsersModule { }
