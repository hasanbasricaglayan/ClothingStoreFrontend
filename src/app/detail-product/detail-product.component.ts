import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit  {
  product? : Product
  

  constructor(
    private productsService : ProductService,
    private activatedRoute : ActivatedRoute,
    private router : Router,
  ){}
  
  

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      parametres => {
        const id = parametres['id'];
        this.productsService.getProductById(+id).subscribe(
          book=>{
            //console.log(book)
            this.product =book}
        );
      });
  }

}
