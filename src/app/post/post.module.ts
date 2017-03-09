import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFrontComponent } from './post-front/post-front.component';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";
import {CoreModule} from "../core/core.module";
import {SafePipe} from "../shared/safe.pipe";
import {SharedModule} from "../shared/shared.module";
import { PostComponent } from './post/post.component';
import { PostAirComponent } from './post-air/post-air.component';
import {PostUtils} from "./shared/post-utils.service";

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
    PostComponent,
    PostAirComponent
  ],
  exports: [PostFrontComponent, PostAirComponent],
  providers: [PostUtils]
})
export class PostModule { }
