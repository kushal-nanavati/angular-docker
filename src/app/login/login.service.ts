import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
  // 'Authorization': `Bearer ${localStorage.getItem("encryptedToken")}`
});

const options = {
  headers: headers
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url="http://localhost:2500/api/login";
  constructor(private http:HttpClient) { }

  checkExistingUsers(users){
    return this.http.post(this.url, users, options);
  }
  loggedIn(){
    if(localStorage.getItem("encryptedToken")){
      return true;
    }else{
      return false;
    }
  }
}
