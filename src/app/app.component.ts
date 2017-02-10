import {Component, OnInit} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {SessionService, ISessionEvent} from "./core/firebase/session.service";
import {Observable} from 'rxjs';
import {MdDialog, MdDialogConfig} from "@angular/material";
import {UserMenuComponent} from "./front/user-menu/user-menu.component";

export interface NavLink {
  link: string;
  label: string;
  icon?: string;
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
      label: 'Home',
      icon: 'home'
    }, {
      link: '/shows',
      label: 'Shows',
      icon: 'radio'
    }, {
      link: '/search',
      label: 'Search',
      icon: 'search'
    }, {
      link: '/about',
      label: 'About',
      icon: 'info'
    }];

  constructor(private sessionService: SessionService, private dialog: MdDialog) {}

  ngOnInit() {

    // Register for all authentication events like login, logout
    this.sessionService.event.subscribe(
      (event) => this.handleEvent(event)
    );
  }

  // About Toolbar etc on authentication event
  handleEvent(event: ISessionEvent) {

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
