import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServiceService } from '../services/shared-service.service';
import { ToastrService } from 'ngx-toastr';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {
  isDisabled=false;
  
  constructor(private router:Router, private shared:SharedServiceService,
    private toastr:ToastrService) { }

  ngOnInit() {
    
  }

  submit(users){
    console.log(users);
  }
}
