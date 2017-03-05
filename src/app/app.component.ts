import {Component, OnInit, HostListener, Inject, ViewChild, ElementRef} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {SessionService, ISessionEvent} from "./core/firebase/session.service";
import {Observable} from 'rxjs';
import {MdDialog, MdDialogConfig, MdSidenav} from "@angular/material";
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

  @ViewChild('sidenav') sidenav: ElementRef;
  sn: MdSidenav = null;
  sidenavMode: string = 'over';
  sidenavOpened: boolean = false;

  constructor(private sessionService: SessionService, private dialog: MdDialog, @Inject("windowObject") private window: Window) {}

  ngOnInit() {
    // Register for all authentication events like login, logout
    this.sessionService.event.subscribe(
      (event) => this.handleEvent(event)
    );
    this.sn = <MdSidenav>this.sidenav.nativeElement;
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
      if (this.sn) {
        this.sn.open();
      }
    }
    if (width >= 475) {
      this.toolbarNavLinks = this.navLinks;
    } else {
      this.toolbarNavLinks = [];
      this.toolbarNavLinks.push(...this.navLinks);
      this.toolbarNavLinks.push(...this.userLinks);
      this.sidenavOpened = false;
      if (this.sn) {
        this.sn.close();
      }
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
