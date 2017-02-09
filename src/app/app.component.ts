import {Component, OnInit} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {SessionService, ISessionEvent} from "./core/firebase/session.service";
import {Observable} from 'rxjs';
import {MdDialog, MdDialogConfig} from "@angular/material";
import {UserMenuComponent} from "./front/user-menu/user-menu.component";

export interface NavLink {
  link: string;
  label: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  navLinks: NavLink[] = [
    {
      link: '/',
      label: 'Home'
    }, {
      link: '/shows',
      label: 'Shows'
    }, {
      link: '/search',
      label: 'Search'
    }, {
      link: '/about',
      label: 'About'
    }];

  constructor(private sessionService: SessionService, private dialog: MdDialog) {}

  ngOnInit() {
    this.sessionService.event.subscribe(
      (event) => this.handleEvent(event)
    );
    // this.sessionService.loginAnonymous();
  }

  handleEvent(event: ISessionEvent) {

  }

  get username() {
    let user = this.sessionService.currentUser();
    if (user) {
      return user.displayName || user.email || 'unknown';
    }
    return 'anonymous';
  }

  get loggedIn(): Observable<boolean> {
    return this.sessionService.event.map((event) => event.name === 'login' && !event.state.anonymous);
  }

  onUserMenu() {
    let dialogRef = this.dialog.open(UserMenuComponent, {
      position: {
        top: '25px',
        right: '25px'
      }
    });
  }

}
