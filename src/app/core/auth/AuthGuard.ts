import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {SessionService} from '../firebase/session.service';
import {TraceService} from '../trace/trace.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private sessionService: SessionService, private trace: TraceService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    if (this.sessionService.isLoggedIn()) {
      return Observable.of(true);
    }

    this.trace.log('AuthGuard', 'wait');
    return this.sessionService.event.map(
      (event) => {
        const loggedIn = this.sessionService.isStarted() && this.sessionService.isLoggedIn();
        this.trace.log('AuthGuard', 'canActivate', loggedIn);
        return loggedIn;
      });
  }

}
