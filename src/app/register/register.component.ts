import { Component, OnInit } from '@angular/core';
import {RegisteredUsers} from '../../assets/models/registered_users';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  reg_users = new RegisteredUsers();
  isError=false;
  text="";
  errors="";
  registerForm = new FormGroup({
    EmailID:new FormControl(
      this.reg_users.EmailID,[
        Validators.required,
        Validators.minLength(12),
        Validators.pattern('([a-zA-Z0-9\.]+)\@gmail([\.])com')
      ]
    ),
    Username: new FormControl(
      this.reg_users.Username,[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
        Validators.pattern('[a-zA-Z0-9]+')
      ]
    ),
    Phone_Number: new FormControl(
      this.reg_users.Phone_Number,[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[0-9]+')
      ]
    ),
    Address: new FormControl(
      this.reg_users.Address,[
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(60),
        Validators.pattern('[a-zA-Z0-9:,-/. ]+')
      ]
    ),
    Password: new FormControl(
      this.reg_users.Password,[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(11),
        Validators.pattern('[a-zA-Z0-9@!*&^%#$./,]+')
      ]
    )
  });
  constructor(private registerService:RegisterService, private router:Router, private toastr:ToastrService) { }

  ngOnInit() {
  }

  submit(users){
    this.reg_users = users;
    console.log(this.reg_users);
    this.registerService.postFormData(this.reg_users).subscribe(res=>{
      // console.log(res);
      localStorage.setItem("token",res["token"]);
      this.isError=false;
      this.toastr.success("User registered successfully");
      console.log(this.text);
      this.router.navigate(["/login"]);
    },err=>{
      console.log(err);
      this.errors=err;
      if(this.errors != ""){
        this.isError = true;
        this.toastr.error("User already exists");
        console.log(this.text);
        this.router.navigate(["/register"]);
      }
    });
  }
  }

