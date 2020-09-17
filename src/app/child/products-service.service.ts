import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject, Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private subject=new Subject<any>();
  api_url="http://localhost:3000/products";
  prod=[];
  constructor(private httpClient:HttpClient) { }

  public get(){
    return this.httpClient.get(this.api_url);
  }

  sendData(product){
    this.prod.push(product);
    // console.log('send-data' + product);
    // this.subject.next(product);
  }

  // getData():Observable<any> {
  //   console.log("got data");
  //   return this.subject.asObservable();
  // }
  getData():Array<Object>{
    return this.prod;
  }

}
