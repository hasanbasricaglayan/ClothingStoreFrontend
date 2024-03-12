import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	//{ path: "", component: ListCategoriesComponent },
	//{ path: "add", component: AddCategoryComponent }
	//{ path: "edit/:categoryId", component: EditCategoryComponent },
	{ path: "", redirectTo: "categories", pathMatch: "full" }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CategoriesRoutingModule { }
