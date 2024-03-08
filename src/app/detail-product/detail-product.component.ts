import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/category/category';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit  {
  product? : Product
  category? : Category
  

  constructor(
    private productsService : ProductService,
    private categoryService : CategoryService,
    private activatedRoute : ActivatedRoute,
    private router : Router,
  ){}
  
 
  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      parametres => {
        const id = parametres['id'];
        this.productsService.getProductById(+id).subscribe(
          p=>{
            this.product =p
            this.categoryService.getCategories();
            this.category = this.categoryService.getCategoryById(p.categoryId)
          }
        );
       
            
      });
  }

}
