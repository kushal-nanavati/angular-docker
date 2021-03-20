import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthGuard } from '../auth/auth.guard';
import { RouterModule } from '@angular/router';
import { UrlService } from '../services/url.service';
import { SharedServiceService } from '../services/shared-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  support_path="/support";
  contact_path="/contact";
  comp_link="";
  _url="";
  constructor(private router:Router,private toastr:ToastrService, private auth:AuthGuard, private route:RouterModule,
    private url:UrlService, private shared:SharedServiceService) { }

  ngOnInit() {
  }
  navigateToSignup(){
    this.router.navigate(["/register"]);
  }
  checkUser(event){
    this._url=this.url.getUrl(); 
    this.comp_link=this._url+this.support_path;
    this.shared.setPath(this.comp_link);
    event.preventDefault();
    return false;
  }
  
  validateUser(event){
    this._url=this.url.getUrl(); 
    this.comp_link=this._url+this.contact_path;
    this.shared.setPath(this.comp_link);
    event.preventDefault();
    return false;
  }

}
