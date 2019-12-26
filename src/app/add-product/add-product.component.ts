import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service'
import { Routes, RouterModule,Router } from '@angular/router';
import { Product } from '../model/product.model'
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public currentProduct: Product;
  public mode:number=1;
  constructor(private catService:CatalogueService,private router:Router) { }

  ngOnInit() {
  }
  onSaveProduct(data:any){
    this.catService.saveResource(this.catService.host+"/produits",data)
    .subscribe(res=>{
        //this.router.navigateByUrl("/produit")
        this.currentProduct=res;
        this.mode=2;
        console.log(res)
    },err=>{
      console.log(err);
    })
  }
  onNewProduct(){
    this.mode=1;
  }

}
