import {Component, OnInit, HostListener, Inject, ViewChild, ElementRef} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {SessionService, ISessionEvent} from "./core/firebase/session.service";
import {Observable} from 'rxjs';
import {MdDialog, MdDialogConfig, MdSidenav, MdSidenavToggleResult} from "@angular/material";
import {UserMenuComponent} from "./front/user-menu/user-menu.component";
import {TraceService} from "./core/trace/trace.service";
import {Router} from "@angular/router";

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
  userLinks: NavLink[] = [ {
      link: '/login',
      label: 'Login',
      icon: 'login'
    }, {
      link: '/register',
      label: 'Register',
      icon: 'register'
    }];
  toolbarNavLinks: NavLink[] = [];

  @ViewChild('sidenav') sidenav: MdSidenav;
  sidenavMode: string = 'over';
  sidenavOpened: boolean = false;
  sidenavOpenedByUser: boolean = false;

  loggedIn: Observable<boolean> = null;

  constructor(
    private sessionService: SessionService,
    private trace: TraceService,
    private dialog: MdDialog,
    private router: Router,
    @Inject("windowObject") private window: Window) {}

  ngOnInit() {
    // Register for all authentication events like login, logout
    this.sessionService.event.subscribe(
      (event) => this.handleSessionEvent(event)
    );
    this.loggedIn = this.sessionService.watchLoggedIn();
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
      this.sidenav.open();
    } else {
      if (!this.sidenavOpenedByUser) {
        this.sidenav.close();
      }
    }
    this.toolbarNavLinks = [];
    if (width >= 400 && width < 500) {
      if (!this.sessionService.isLoggedIn()) {
        this.toolbarNavLinks = this.userLinks;
      }
    }
    if (width < 400) {
      this.toolbarNavLinks.push(...this.navLinks);
      if (!this.sessionService.isLoggedIn()) {
        this.toolbarNavLinks.push(...this.userLinks);
      }
      this.sidenavOpened = false;
      this.sidenav.close();
    }

  }

  // About Toolbar etc on authentication event
  handleSessionEvent(event: ISessionEvent) {
    this.trace.log('AppComponent', 'Session event', event);
    if (event.name === 'login') {
      let link = this.navLinks.find(each => each.link == '/users');
      if (!link) {
        this.navLinks.push({
          link: '/users',
          label: 'Users',
          icon: 'supervisor_account'
        });
      }
    } else {
      this.navLinks = this.navLinks.filter(each => each.link !== '/users');
    }
  }

  onUserMenu() {
    let dialogRef = this.dialog.open(UserMenuComponent, {
      position: {
        top: '25px',
        right: '25px'
      }
    });
  }

  onSidenavToggle() {
    this.sidenav.toggle().then((result: MdSidenavToggleResult) => {
      this.sidenavOpenedByUser = (result.type == 'open');
    });
  }

}
