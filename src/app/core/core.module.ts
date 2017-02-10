import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BackendService} from "./firebase/backend.service";
import {SessionService} from "./firebase/session.service";
import {RegistrationService} from "./firebase/registration.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    SessionService,
    RegistrationService,
    BackendService
  ]
})
export class CoreModule { }
