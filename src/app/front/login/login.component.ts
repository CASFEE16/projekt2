import {Component, OnInit} from '@angular/core';
import {EmailPasswordCredentials} from 'angularfire2/auth';
import {SessionService} from '../../core/firebase/session.service';
import {MdSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  credentials: EmailPasswordCredentials = {
    email: '',
    password: ''
  };
  formErrors = {
    'email': '',
    'password': ''
  };
  error: Error = null;

  constructor(private sessionService: SessionService, private snackbar: MdSnackBar, private router: Router) { }

  ngOnInit() {
    this.error = null;
  }

  onSubmit() {
    this.error = null;

    this.sessionService.loginCredentials(this.credentials).subscribe(
      (result) => {
        this.router.navigate(['/']);
      },
      (error) => {
        // console.trace('Error');
        this.error = error;
        this.snackbar.open(this.error.message, '', {
          duration: 3000
        });
      });

    this.submitted = true;
  }
}
