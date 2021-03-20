import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../child/products-service.service';
import { SharedServiceService } from '../services/shared-service.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  products=[];
  user="";
  greetUser="Welcome,";
  isLoading=false;
  columnsToDisplay:String[]=["ID","Name","Price","Image"];
  constructor(private productsService:ProductsService, private shared:SharedServiceService, private router:Router) {}
  
  ngOnInit() {
    this.getData();
    this.shared.getUsername().subscribe((user)=>{
      console.log(user);
      this.user=user.replace(/['"]+/g,'');
    });
  }
  getData(){
    this.isLoading=true;
    this.products=this.productsService.getData();
    this.isLoading=false;
}
logout(){
      this.isLoading=true;
      localStorage.removeItem("token");
      this.router.navigate(["/login"]);
      this.isLoading=false;
}
}
