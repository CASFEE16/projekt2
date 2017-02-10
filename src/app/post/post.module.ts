import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFrontComponent } from './post-front/post-front.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";
import {CoreModule} from "../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    CoreModule
  ],
  declarations: [PostFrontComponent],
  exports: [PostFrontComponent]
})
export class PostModule { }
