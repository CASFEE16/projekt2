import { Component, OnInit } from '@angular/core';
import {Registration} from "./register.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registration: Registration = {
    name: '',
    email: '',
    password1: '',
    password2: ''
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

  }

}
