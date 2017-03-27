import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import {RatingComponent} from './rating/rating.component';
import {CanDeactivateGuard} from './can-deactivate-guard.service';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {DialogService} from './dialog.service';
import {SafePipe} from '../core/firebase/safe.pipe';
import {NavService} from './nav.service';

export function windowFactory(): Window { return window; }

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [RatingComponent, ConfirmDialogComponent, SafePipe],
  exports: [RatingComponent, ConfirmDialogComponent, SafePipe],
  entryComponents: [ConfirmDialogComponent],
  providers: [
    CanDeactivateGuard,
    DialogService,
    NavService,
    { provide: 'Window', useFactory: windowFactory}
    ]
})
export class SharedModule { }
