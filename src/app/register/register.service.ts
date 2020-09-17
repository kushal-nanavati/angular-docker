import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';

const headers= new HttpHeaders({
  'Content-Type':'application/json',
  'Access-Control-Allow-Origin':"*"
});
const options={
  headers:headers
}
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url="http://localhost:2500/api/register";
  constructor(private http:HttpClient) { }

  postFormData(reg_users){
    return this.http.post(this.url, reg_users, options);
  }
}
