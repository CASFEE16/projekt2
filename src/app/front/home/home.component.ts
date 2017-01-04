import { Component, OnInit } from '@angular/core';
import {WelcomeService} from "./welcome.service";
import {Observable} from "rxjs";
import {FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [WelcomeService]
})
export class HomeComponent implements OnInit {

  items: FirebaseListObservable<string[]>;

  constructor(private welcomeService: WelcomeService) {
  }

  ngOnInit() {
    this.items = this.welcomeService.getWelcomeMessages();
  }

}
