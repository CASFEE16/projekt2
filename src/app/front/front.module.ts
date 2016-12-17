import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home/home.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    HomeComponent,
    AboutComponent
  ],
  exports: [
    HomeComponent,
    AboutComponent
  ]
})
export class FrontModule { }
