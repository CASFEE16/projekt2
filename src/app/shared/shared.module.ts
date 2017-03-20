import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import {RatingComponent} from './rating/rating.component';
import {CanDeactivateGuard} from './can-deactivate-guard.service';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {DialogService} from './dialog.service';

export function windowFactory(): Window { return window; }

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [RatingComponent, ConfirmDialogComponent],
  exports: [RatingComponent, ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent],
  providers: [
    CanDeactivateGuard,
    DialogService,
    { provide: 'Window', useFactory: windowFactory}
    ]
})
export class SharedModule { }
