import { Component, OnInit } from '@angular/core';
import {FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: []
})
export class HomeComponent implements OnInit {

  items: FirebaseListObservable<string[]>;

  constructor() {
  }

  ngOnInit() {

  }

}
