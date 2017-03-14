import {Component, OnInit, HostListener, Inject, ViewChild, ElementRef} from '@angular/core';
import {SessionService, ISessionEvent} from './core/firebase/session.service';
import {MdDialog, MdSidenav, MdSidenavToggleResult, MdSidenavContainer} from '@angular/material';
import {UserMenuComponent} from './user/user-menu/user-menu.component';
import {TraceService} from './core/trace/trace.service';
import {Router} from '@angular/router';
import {EventService, IEvent} from './core/event/event.service';
import {Observable} from 'rxjs/Observable';

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
      label: 'Posts',
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
  @ViewChild('sidenavcontainer') sidenavContainer: MdSidenavContainer;
  sidenavMode = 'over';
  sidenavOpened = false;
  sidenavOpenedByUser = false;
  sidenavRightShow = true;
  loggedIn: Observable<boolean> = null;
  window: Window = null;

  get username(): string {
    return this.sessionService.username;
  }

  constructor(
    private sessionService: SessionService,
    private eventService: EventService,
    private trace: TraceService,
    private dialog: MdDialog,
    private router: Router,
    @Inject('Window') window: any,
    private element: ElementRef) {
    this.window = window;
  }

  ngOnInit() {
    // Register for all authentication events like login, logout
    this.sessionService.event.subscribe(
      (event) => this.handleSessionEvent(event)
    );
    this.eventService.event.subscribe(
      (event) => this.handleAppEvent(event)
    );
    this.loggedIn = this.sessionService.watchLoggedIn();
    this.updateForWidth(this.window.innerWidth);

    if (this.element) {
      const cnt = this.element.nativeElement.getElementsByClassName('mat-sidenav-content');
      if (cnt) {
        console.log(cnt);
        cnt[0].style.overflow = 'hidden';
      }
    }

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

  handleAppEvent(event: IEvent) {
    if (event.name === 'SidenavRight') {
      if (event.data === true) {
        this.sidenavRightShow = (event.data === true);
      }
    }
  }

  // About Toolbar etc on authentication event
  handleSessionEvent(event: ISessionEvent) {
    this.trace.log('AppComponent', 'Session event', event);
    if (event.name === 'login') {
      const link = this.navLinks.find(each => each.link === '/users');
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
    const dialogRef = this.dialog.open(UserMenuComponent, {
      position: {
        top: '25px',
        right: '25px'
      }
    });
  }

  onSidenavToggle() {
    this.sidenav.toggle().then((result: MdSidenavToggleResult) => {
      this.sidenavOpenedByUser = (result.type === 'open');
    });
  }

}
