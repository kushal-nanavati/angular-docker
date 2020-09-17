import { Component, OnInit, Output } from '@angular/core';
import { ProductsService } from './products-service.service';
import { EventEmitter } from 'events';
import { Router } from '@angular/router';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  products=[];
  count=0;
  constructor(private productsService:ProductsService,private router:Router) { }

  ngOnInit() {
    this.productsService.get().subscribe((data:any[])=>{
        this.products=data;
    });
  }
  updateCart(product){
    this.productsService.sendData(product);
  }
}
