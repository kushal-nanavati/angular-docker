import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ChildComponent } from '../child/child.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import {RegisterComponent} from '../register/register.component';
import {PagenotfoundComponent} from '../pagenotfound/pagenotfound.component';
const routes:Routes=[
  {path:"",redirectTo:"/login",pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"products",component:ChildComponent},
  {path:"shopping-cart",component:ShoppingCartComponent},
  {path:"**",component:PagenotfoundComponent}
];
@NgModule({
  imports: [
    CommonModule,RouterModule,RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
