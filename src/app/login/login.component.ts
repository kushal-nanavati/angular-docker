import { Component, OnInit } from '@angular/core';
import {Users} from '../../assets/models/users';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { ToastrService } from 'ngx-toastr';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {SupportComponent} from '../support/support.component';

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
  arr=new Array<string>();
  url="";
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
  constructor(private loginService:LoginService, private router:Router, private shared:SharedServiceService,
    private toastr:ToastrService) { }

  ngOnInit() {
    
  }

  submit(users){
    this.users=users;
    console.log(localStorage.getItem("encryptedToken"));
    console.log(localStorage.getItem("encryptedToken")!=undefined);
    if(localStorage.getItem("encryptedToken")!=undefined){
      //check
      this.users.Token=localStorage.getItem("encryptedToken");
      console.log(this.users.Token);
      console.log(this.users);
      
    }else{
      this.users.Token=undefined;
      console.log(this.users);
    }
    
    this.loginService.checkExistingUsers(this.users).subscribe(res=>{
      console.log(res);
      const val = {
        value:res["encryptedToken"],
        expiry:new Date().getTime() + 10000
      };
      localStorage.setItem("encryptedToken",val.value);            
      this.username=JSON.stringify(this.users.Username);
      console.log(this.username);
      this.shared.setUsername(this.username);
      this.isError=false;
      this.toastr.success("User validated successfully");
      console.log(this.text);
      // if(new Date().getTime() > val.expiry){
      //     this.supComponent.logout();
      // }
    },err=>{
      console.log(err.status);
      if(err.status == 404){
        localStorage.removeItem("encryptedToken");
      }
      this.errors=err;
      if(this.errors != ""){
        this.isError = true;
        this.toastr.error("Invalid user");
        console.log(this.text);
        this.router.navigate(["/login"]);
      }
    });
  }
}
