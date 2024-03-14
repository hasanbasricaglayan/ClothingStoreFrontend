import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesRoutingModule } from './categories-routing.module';
import { ListCategoriesComponent } from './list-categories/list-categories.component';

@NgModule({
	declarations: [
		ListCategoriesComponent
	],
	imports: [
		CommonModule,
		CategoriesRoutingModule,
		FormsModule
	]
})
export class CategoriesModule { }
