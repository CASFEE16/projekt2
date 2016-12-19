import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BackendService} from "./firebase/backend.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    BackendService
  ]
})
export class CoreModule { }
