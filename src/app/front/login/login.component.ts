import { Component, OnInit } from '@angular/core';
import {EmailPasswordCredentials} from "angularfire2/auth";

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

  constructor() { }

  ngOnInit() {
  }

  onSubmit() { this.submitted = true; }
}
