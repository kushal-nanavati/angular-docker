import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import { ProductsService } from './child/products-service.service';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AppRoutingModule, routingComponents} from './app-routing/app-routing.module';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';
import { LoginService } from './login/login.service';
import {RegisterService} from './register/register.service';
import {SharedServiceService} from './services/shared-service.service';
import { HeaderComponent } from './header/header.component';
import {ToastrModule} from 'ngx-toastr';
import { LoaderComponent } from './loader/loader.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SupportComponent } from './support/support.component';
import { AuthGuard } from './auth/auth.guard';
import { ContactComponent } from './contact/contact.component';
@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    LoginComponent,
    ShoppingCartComponent,
    PagenotfoundComponent,
    RegisterComponent,
    HeaderComponent,
    LoaderComponent,
    HomepageComponent,
    SupportComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,MatCardModule,MatIconModule,MatProgressSpinnerModule,MatToolbarModule,HttpClientModule,MatButtonModule,
    MatFormFieldModule,AppRoutingModule,MatInputModule,ReactiveFormsModule,MatTableModule,MatTabsModule,BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut:5000,
      positionClass:'toast-top-right',
      preventDuplicates:true,
    }),
  ],
  providers: [ProductsService,LoginService,RegisterService,SharedServiceService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
