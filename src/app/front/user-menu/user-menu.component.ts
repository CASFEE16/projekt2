import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {SessionService} from "../../core/firebase/session.service";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  constructor(private dialogRef: MdDialogRef<UserMenuComponent>, private sessionService: SessionService) { }

  ngOnInit() {
  }

  onLogout() {
    this.sessionService.logout();
    this.dialogRef.close();
  }

}
