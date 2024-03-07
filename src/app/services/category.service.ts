import { Injectable } from '@angular/core';
import { Product } from '../model/product/product';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../model/category/category';
import { ProductService } from './product.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private categories :Category[] = [];
    private products : Product[] = [];
    categoriesUpdated = new Subject<Category[]>();
    
    constructor(private http : HttpClient,private productService : ProductService) { }
    CategoryURl = "https://localhost:7108/api/Categories";

    getCategories(){
        this.http.get<Category[]>(this.CategoryURl).subscribe(c =>
            {
                this.categories = c;
                console.log(this.categories);
                this.categoriesUpdated.next([...this.categories])
            }
            )

    }

    getCategoryName(id : number){
        const cat = this.categories.find(c => c.categoryId == id )
        return cat?.categoryId
    }


    getProductsByCategory(idCategory: number) {
        console.log("GET");
        this.http.get<Product[]>(this.CategoryURl + "/" + idCategory).subscribe(
            ps => {
                this.products = ps;
                console.log(this.products);
                this.productService.productsUpdated.next([...this.products]);
            }
        );
    } 

}