import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;
  greetUser="Welcome,";
  user="";
  constructor(private router: Router){ 
    this.navLinks = [
      {
          label: 'Login',
          link: '/login',
          index: 0
      }, {
          label: 'Register',
          link: '/register',
          index: 1
      } 
  ];
  }
  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => 
        tab.link === '.' + this.router.url
      ));
  });
}
  }
