import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule,Router,ActivatedRoute } from '@angular/router';
import { CatalogueService } from '../services/catalogue.service'
import { Product } from '../model/product.model'
@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  currentProduct:Product;
  url:string;
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private catService:CatalogueService) { }

  ngOnInit() {
  this.url= atob(this.activatedRoute.snapshot.params.id)
  console.log(this.url)
  this.catService.getResource(this.url)
  .subscribe(data=>{
    this.currentProduct=data
  },err=>{
    console.log(err);
  })
  }
  onUpdateProduct(value:any){
    this.catService.updateResource(this.url,value)
    .subscribe(data=>{
      alert('Mise à jour effectuée avec succès');
      this.router.navigateByUrl('/produit')

    },err=>{
      console.log(err)
    })
  }

}
