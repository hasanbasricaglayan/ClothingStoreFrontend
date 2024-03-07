import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../model/product/product';
import { ProductService } from '../services/product.service';
import { IProductToDisplay } from '../model/product/iproduct-to-display';
import { NgForm } from '@angular/forms';
import { Category } from '../model/category/category';
import { CategoryService } from '../services/category.service';
import { ICategoryToDisplay } from '../model/category/icategory-to-display';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products : Product[] = []
  categories : Category[] = []
  productsSubscription? : Subscription
  categoriesSubscription? : Subscription
  filteredProduct? : IProductToDisplay[];
  categoryDisplayed : ICategoryToDisplay[] = [];
  productsToDisplay : IProductToDisplay[] = [];
  
  constructor(private product_service : ProductService,
    private category_service : CategoryService,
    private router : Router){}

  filterBook(f : NgForm){
    console.log(+f.value.categoryID)
    if (f.value.categoryID == 0) {
      this.product_service.getProducts()
    }else{
    this.category_service.getProductsByCategory(+f.value.categoryID);}
    //this.router.navigate(['/books']);
  }
  
  DetailProduct(id:number){
    this.router.navigate(['/detail-product/id']);
  }
  

  transformProductToDisplay() : IProductToDisplay[]{
    return this.products.map(p=>{
      return {
        id: p.productId,
        name: p.name,
        brand: p.brand,
        category: p.categoryId,
        price: p.price
      } as IProductToDisplay
    });}
    transformCategoryToDisplay() : ICategoryToDisplay[]{
      return this.categories.map(c=>{
        return {
          id : c.categoryId,
          name : c.name,
         
        } as ICategoryToDisplay
      });}


  ngOnInit(): void {
    console.log("NG ON INIT");
    this.product_service.getProducts();
    this.category_service.getCategories();
    
    this.productsSubscription = this.product_service.productsUpdated.subscribe(
      products => {
        this.products = products;
        this.productsToDisplay = this.transformProductToDisplay();
        console.log(this.productsToDisplay);
      });

      this.categoriesSubscription = this.category_service.categoriesUpdated.subscribe(
        categories => {
          this.categories = categories;
          this.categoryDisplayed =  this.transformCategoryToDisplay();
          console.log(this.categoryDisplayed)
        });
        
        
    //throw new Error('Method not implemented.');
  }




}
