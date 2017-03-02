import {Component, OnInit, HostListener, Inject} from '@angular/core';
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
      link: '/show',
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
  sidenavMode: string = 'over';
  sidenavOpened: boolean = false;

  constructor(private sessionService: SessionService, private dialog: MdDialog, @Inject("windowObject") private window: Window) {}

  ngOnInit() {
    // Register for all authentication events like login, logout
    this.sessionService.event.subscribe(
      (event) => this.handleEvent(event)
    );
    this.updateForWidth(this.window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateForWidth(event.target.innerWidth);
  }

  updateForWidth(width: number) {
    if (width >= 600) {
      this.sidenavMode = 'side';
    } else {
      this.sidenavMode = 'over';
    }
    if (width >= 1200) {
      this.sidenavOpened = true;
    }
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
