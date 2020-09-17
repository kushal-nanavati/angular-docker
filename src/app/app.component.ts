import { Component, OnInit } from '@angular/core';
// import { ProductsService } from './child/products-service.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent implements OnInit{
//   count:Number;
//   products=[];
//   constructor(private productService:ProductsService, private router:Router){}

//   ngOnInit(){
// //    this.getData();
//   }
//   navigateToCart(){
//     this.router.navigate(["/shopping-cart"]);
//   }

//   // getData(){
//   //   this.productService.cnt$.subscribe(response=>
//   //     {
//   //       console.log(this.count=response);
//   //   });
//   // }
// }

export class AppComponent implements OnInit{
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.navLinks = [
        {
            label: 'Login',
            link: './login',
            index: 0
        }, {
            label: 'Register',
            link: './register',
            index: 1
        } 
    ];
}
ngOnInit(): void {
  this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => 
        tab.link === '.' + this.router.url
      ));
  });
}
}