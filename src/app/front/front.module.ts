import {NgModule} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {AboutComponent} from './about/about.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {RegisterComponent} from './register/register.component';
import {UserMenuComponent} from './user-menu/user-menu.component';
import {PostModule} from "../post/post.module";
import {ShowModule} from "../show/show.module";
import {SearchComponent} from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    PostModule,
    ShowModule
  ],
  declarations: [
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    UserMenuComponent,
    SearchComponent
  ],
  exports: [
    AboutComponent,
    UserMenuComponent
  ],
  entryComponents: [UserMenuComponent]
})
export class FrontModule { }
