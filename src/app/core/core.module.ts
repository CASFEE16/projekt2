import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BackendService} from "./firebase/backend.service";
import {SessionService} from "./firebase/session.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    BackendService,
    SessionService
  ]
})
export class CoreModule { }
