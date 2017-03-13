import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service';
import {User} from '../shared/user.model';
import {Observable} from 'rxjs/Observable';
import {MdSnackBar} from '@angular/material';
import {SessionService} from '../../core/firebase/session.service';
import {Registration, RegistrationService} from '../../core/firebase/registration.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {

  registration: Registration = new Registration();
  users: Observable<User[]> = null;
  loading = true;
  loggedIn: Observable<boolean> = null;

  constructor(
    private registrationService: RegistrationService,
    private userService: UserService,
    private sessionService: SessionService,
    private snackbar: MdSnackBar) { }

  ngOnInit() {
    this.loggedIn = this.sessionService.watchLoggedIn();
    this.users = this.userService.findAll()
      .do(each => this.loading = false);
    console.log(this.users);
  }

  onSubmit() {
    this.registrationService.register(this.registration).subscribe(
      result => {
        this.registration = new Registration();
      },
      error => {
        this.snackbar.open(error.message, null, {duration: 2000});
      }
    );
  }

}
