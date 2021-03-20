import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private toastr:ToastrService,private router:Router,private logIn:LoginService){}
  
  canActivate():boolean {
    if(this.logIn.loggedIn()){
      return true;
    }else{
      this.toastr.warning("Unauthorised request. Login first!!");
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
