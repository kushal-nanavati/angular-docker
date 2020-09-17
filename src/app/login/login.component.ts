import { Component, OnInit } from '@angular/core';
import {Users} from '../../assets/models/users';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/assets/shared-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isDisabled=false;
  users=new Users();
  errors="";
  isError=false;
  text="";
  username="";
  loginForm=new FormGroup({
    Username:new FormControl(
      this.users.Username,[
        Validators.required,
        Validators.minLength(5)
      ]
    ),
    Password:new FormControl(
      this.users.Password,[
        Validators.required,
        Validators.minLength(5)
      ]
    )
  });
  constructor(private loginService:LoginService, private router:Router, private shared:SharedServiceService) { }

  ngOnInit() {
    
  }

  submit(users){
    this.users=users;
    console.log(this.users);
    
    this.loginService.checkExistingUsers(this.users).subscribe(res=>{
      console.log(res);
      // localStorage.setItem("token",res["token"]);
      this.username=JSON.stringify(res);
      console.log(this.username);
      this.shared.setUsername(this.username);
      this.isError=false;
      this.text = "*User validated successfully";
      console.log(this.text);
      this.router.navigate(["/shopping-cart"]);
    },err=>{
      console.log(err);
      this.errors=err;
      if(this.errors != ""){
        this.isError = true;
        this.text = "*User not found";
        console.log(this.text);
        this.router.navigate(["/login"]);
      }
    });
  }
}
