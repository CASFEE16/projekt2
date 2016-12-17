import { Component, OnInit } from '@angular/core';
import {FirebaseListObservable, AngularFire} from 'angularfire2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) {
  }

  ngOnInit() {
    this.items = this.af.database.list('/items');
  }

}
