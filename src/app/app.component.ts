import {Component, OnInit} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {SessionService} from "./core/firebase/session.service";
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.sessionService.event.subscribe(
      (event) => console.log(event)
    );
    this.sessionService.loginAnonymous();
  }

  get username() {
    let user = this.sessionService.currentUser();
    if (user) {
      return user.displayName || 'anonymous';
    }
    return 'anonymous';
  }

  get loggedIn(): Observable<boolean> {
    return this.sessionService.event.map((event) => event.name === 'login' && !event.state.anonymous);
  }

}
