import { Component, OnInit } from '@angular/core';
import {FirebaseListObservable, AngularFire} from 'angularfire2';
import {WelcomeService} from "./welcome.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [WelcomeService]
})
export class HomeComponent implements OnInit {

  items: Observable<string[]>;

  constructor(private welcomeService: WelcomeService) {
  }

  ngOnInit() {
    this.items = this.welcomeService.getWelcomeMessages();
  }

}
