import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CatalogueService } from '../services/catalogue.service'
import { Routes, RouterModule,Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  {
  private appareils;
  public size:number =5;
  public currentPage:number = 0;
  public totalPages:number;
  public pages: Array<number>;
  public currentKeyword:string;
  constructor(private catService:CatalogueService,private router:Router) {
  }


  onGetProducts() {
    this.catService.getProducts(this.currentPage,this.size).subscribe(
          (response) => {

            this.totalPages=response["page"].totalPages;
            this.pages=new Array<number>(this.totalPages);
            this.appareils = Object.values(response)[0].produits;
          },
         (error) => {
             console.log('Erreur ! : ' + error);
          }
     );

  }
  onChercher(value:any){
    this.currentPage=0;
    this.currentKeyword=value.keyword;
    this.chercherProduits()
  }
  chercherProduits(){
    this.catService.getProductsByKeyword(this.currentKeyword,this.currentPage,this.size).subscribe(
              (response) => {

                this.totalPages=response["page"].totalPages;
                this.pages=new Array<number>(this.totalPages);
                this.appareils = Object.values(response)[0].produits;
              },
             (error) => {
                 console.log('Erreur ! : ' + error);
              }
         );
  }
  onPageProduct(i){
    this.currentPage=i;
    this.chercherProduits();
  }
  onDeleteProduct(p){
  let conf=confirm("Etes vous sûre ?");
  if(conf)
      this.catService.deleteResource(p._links.self.href).subscribe(
      data => {this.chercherProduits()},err=>{console.log(err)});
  }
  onEditProduct(p){
  let url=p._links.self.href
    this.router.navigateByUrl("/edit/"+btoa(url));
  }
  /*ngOnInit() {
  }*/

}
