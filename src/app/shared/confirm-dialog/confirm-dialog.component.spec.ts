import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule, MdDialogModule, MdDialog, MdDialogRef } from '@angular/material';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import {SharedModule} from '../shared.module';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let dialog: MdDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        SharedModule
      ],
      providers: [],
      declarations: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MdDialog);
    const dialogRef = dialog.open(ConfirmDialogComponent);
    component = dialogRef.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
