import { Injectable } from '@angular/core';
import { Product } from '../model/product/product';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products : Product[] = [];
  constructor(private http : HttpClient) { }
  productsUpdated = new Subject<Product[]>();
  baseUrl = "https://localhost:7108/api/"
  ProductURl = "https://localhost:7108/api/Products";


  getProducts(){
    console.log("GET");
    this.http.get<Product[]>(this.ProductURl).subscribe(
      ps => {
        this.products = ps;
        console.log(this.products);
        this.productsUpdated.next([...this.products]);
      }
    );
  }

  getProductById(id : number):Observable<Product>
  
  { 
    return this.http.get<Product>(this.ProductURl+"/"+id)
    
  }

 

  

}