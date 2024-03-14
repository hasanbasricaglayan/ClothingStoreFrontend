import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryDTO } from 'src/app/models/category/category-dto';
import { CategoryService } from 'src/app/services/category.service';

@Component({
	selector: 'app-list-categories',
	templateUrl: './list-categories.component.html',
	styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit, OnDestroy {
	categoriesSubscription?: Subscription
	categories: CategoryDTO[] = []
	currentCategory?: CategoryDTO

	constructor(private categoryService: CategoryService) { }

	showEditCategory(category: CategoryDTO) {
		this.currentCategory = category
	}

	hideEditCategory() {
		this.currentCategory = undefined
	}

	addCategory(form: NgForm) {
		let category: CategoryDTO = {
			name: form.value.addCategoryName
		}
		this.categoryService.addCategory(category)
	}

	editCategory(form: NgForm) {
		let category: CategoryDTO = {
			name: form.value.editCategoryName
		}
		this.categoryService.editCategory(this.currentCategory!.categoryId!, category).subscribe(() => {
			this.hideEditCategory()
			this.ngOnInit()
		})
	}

	deleteCategory(categoryId: number) {
		if (confirm("Etes-vous sûr de vouloir supprimer la catégorie ?"))
			this.categoryService.deleteCategory(categoryId)
	}

	ngOnInit(): void {
		this.categoriesSubscription = this.categoryService.updatedCategories$.subscribe(categories => {
			this.categories = categories
		})
		this.categoryService.getAllCategoriesWithProducts().subscribe()
	}

	ngOnDestroy(): void {
		this.categoriesSubscription?.unsubscribe()
	}
}
