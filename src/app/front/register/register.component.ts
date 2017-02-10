import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../core/firebase/session.service";
import {Router} from "@angular/router";
import {RegistrationService, Registration} from "../../core/firebase/registration.service";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  error: Error = null;
  registration: Registration = {
    name: '',
    email: '',
    password1: '',
    password2: ''
  };

  constructor(private registrationService: RegistrationService, private router: Router, private snackbar: MdSnackBar) { }

  ngOnInit() {
  }

  onSubmit() {
    this.error = null;

    this.registrationService.register(this.registration).subscribe(
      (result) => {
        // console.log('Loggedin');
        this.router.navigate(['/']);
      },
      (error) => {
        // console.log('Error');
        this.error = error;
        this.snackbar.open(this.error.message, '', {
          duration: 3000
        });
      });

    this.submitted = true;
  }

}
