import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ChildComponent } from '../child/child.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import {RegisterComponent} from '../register/register.component';
import {PagenotfoundComponent} from '../pagenotfound/pagenotfound.component';
import { HeaderComponent } from '../header/header.component';
import { HomepageComponent } from '../homepage/homepage.component';
import { SupportComponent } from '../support/support.component';
import {AuthGuard} from '../auth/auth.guard';
import { ContactComponent } from '../contact/contact.component';

const routes:Routes=[
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path:"home",component:HomepageComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"products",component:ChildComponent},
  {path:"support",component:SupportComponent, canActivate:[AuthGuard]},
  {path:"contact",component:ContactComponent, canActivate:[AuthGuard]},
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
export const routingComponents = [HeaderComponent,LoginComponent,RegisterComponent,ShoppingCartComponent,HomepageComponent];
// export const routing = RouterModule.forRoot(routes);
