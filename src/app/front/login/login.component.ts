import {Component, OnInit, OnDestroy} from '@angular/core';
import {EmailPasswordCredentials} from "angularfire2/auth";
import {SessionService, ISessionEvent} from "../../core/firebase/session.service";
import {Subscription} from "rxjs";
import {MdSnackBar} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  submitted = false;
  credentials: EmailPasswordCredentials = {
    email: '',
    password: ''
  };
  subscription: Subscription;
  formErrors = {
    'email': '',
    'password': ''
  };
  error: Error = null;

  constructor(private sessionService: SessionService, private snackbar: MdSnackBar, private router: Router) { }

  ngOnInit() {
    this.error = null;
    //this.subscription = this.sessionService.event.subscribe(
    //  (event) => this.handleEvent(event)
    //)
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit() {
    console.log("Submit", this.credentials);
    this.error = null;

    this.sessionService.loginCredentials(this.credentials).subscribe(
      (result) => {
        // console.log('Loggedin');
        this.router.navigate(['/']);
      },
      (error) => {
        // console.log('Error');
        this.error = error.message;
        this.snackbar.open(this.error.message, '', {
          duration: 3000
        });
      });

    this.submitted = true;
  }
}
