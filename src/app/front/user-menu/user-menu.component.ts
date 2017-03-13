import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import {SessionService} from '../../core/firebase/session.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  get username(): string {
    return this.sessionService.username;
  }

  constructor(
    private dialogRef: MdDialogRef<UserMenuComponent>,
    private sessionService: SessionService,
    private snackbar: MdSnackBar) { }

  ngOnInit() {
  }

  onLogout() {
    this.sessionService.logout().subscribe(
      (result) => this.snackbar.open('Logged out', null, {duration: 5000}),
      (error: Error) => this.snackbar.open(error.message, null, {duration: 5000}),
    );
    this.dialogRef.close();
  }

}
