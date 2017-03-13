import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RatingComponent} from './rating/rating.component';
import { SubmitDialogComponent } from './submit-dialog/submit-dialog.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RatingComponent, SubmitDialogComponent],
  exports: [RatingComponent, SubmitDialogComponent],
  entryComponents: [SubmitDialogComponent]
})
export class SharedModule { }
