import {NgModule} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {AboutComponent} from './about/about.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {PostModule} from '../post/post.module';
import {ShowModule} from '../show/show.module';

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
    LoginComponent
  ],
  exports: [
    AboutComponent
    ]
})
export class FrontModule { }
