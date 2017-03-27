import {Component, OnInit, OnDestroy, HostListener, Inject,
  ViewChild, ElementRef, NgZone, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import {SessionService, ISessionEvent} from './core/firebase/session.service';
import {MdDialog, MdSidenav, MdSidenavToggleResult, MdSidenavContainer} from '@angular/material';
import {UserMenuComponent} from './user/user-menu/user-menu.component';
import {TraceService} from './core/trace/trace.service';
import {Router} from '@angular/router';
import {EventService, IEvent} from './core/event/event.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {NavService} from './shared/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav: MdSidenav;
  @ViewChild('sidenavcontainer') sidenavContainer: MdSidenavContainer;
  sidenavMode = 'over';
  sidenavOpened = false;
  sidenavOpenedByUser = false;
  sidenavRightShow = true;
  loggedIn: Observable<boolean> = null;
  window: Window = null;
  sessionSubscription: Subscription = null;

  get username(): string {
    return this.sessionService.username;
  }

  constructor(
    private sessionService: SessionService,
    private trace: TraceService,
    private dialog: MdDialog,
    private router: Router,
    public nav: NavService,
    @Inject('Window') window: any,
    private ngzone: NgZone,
    private cdref: ChangeDetectorRef,
    private element: ElementRef) {
    this.window = window;
  }

  ngOnInit() {
    this.loggedIn = this.sessionService.watchLoggedIn();

    this.loggedIn.subscribe(
      (loggedIn) => {
        this.nav.toggleUsers(loggedIn);
      }
    );

    if (this.window) {
      this.updateForWidth(this.window.innerWidth);
    }

    // Hack the material sidenav content element so that we can display different
    // scrollbars for posts and shows.
    if (this.element) {
      const cnt = this.element.nativeElement.getElementsByClassName('mat-sidenav-content');
      if (cnt) {
        this.ngzone.runOutsideAngular( () => cnt[0].style.overflow = 'hidden' );
      }
    }
  }

  /*
  ngAfterViewInit() {
    Observable.fromEvent(window, 'resize')
      .throttleTime(200)
      .subscribe(_ => {
        this.updateForWidth(this.window.innerWidth);
      })
  }
   */

  ngOnDestroy() {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
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

    if (width >= 400 && width < 500) {
      this.nav.toggleMedium();
    }
    if (width < 400) {
      this.nav.toggleSmall();
      this.sidenavOpened = false;
      this.sidenav.close();
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
