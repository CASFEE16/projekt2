import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import {RatingComponent} from './rating/rating.component';
import {CanDeactivateGuard} from "./can-deactivate-guard.service";
import {ConfirmDialog} from "./confirm-dialog/confirm-dialog.component";
import {DialogService} from "./dialog.service";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [RatingComponent, ConfirmDialog],
  exports: [RatingComponent, ConfirmDialog],
  entryComponents: [ConfirmDialog],
  providers: [CanDeactivateGuard, DialogService]
})
export class SharedModule { }
