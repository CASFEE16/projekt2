import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFrontComponent } from './post-front/post-front.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";
import {CoreModule} from "../core/core.module";
import {SafePipe} from "../shared/safe.pipe";
import {SharedModule} from "../shared/shared.module";
import { PostComponent } from './post/post.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    CoreModule,
    SharedModule
  ],
  declarations: [
    PostFrontComponent,
    SafePipe,
    PostComponent
  ],
  exports: [PostFrontComponent]
})
export class PostModule { }
