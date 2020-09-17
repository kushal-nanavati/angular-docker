import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../child/products-service.service';
import { SharedServiceService } from 'src/assets/shared-service.service';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  products=[];
  product={};
  user="";
  columnsToDisplay:String[]=["ID","Name","Description","Price","Image"];
  constructor(private productsService:ProductsService, private shared:SharedServiceService) {}
  
  ngOnInit() {
    this.getData();
    this.shared.getUsername().subscribe((user)=>{
      console.log(user);
      this.user=user;
    });
  }
  getData(){
    this.products=this.productsService.getData();
}


}
