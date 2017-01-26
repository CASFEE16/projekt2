import {NgModule} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    HomeComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent
  ],
  exports: [
    HomeComponent,
    AboutComponent
  ]
})
export class FrontModule { }
