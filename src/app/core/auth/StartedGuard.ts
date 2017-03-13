import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {SessionService} from '../firebase/session.service';
import {TraceService} from '../trace/trace.service';

@Injectable()
export class StartedGuard implements CanActivate {

  constructor(private sessionService: SessionService, private trace: TraceService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    if (this.sessionService.isStarted()) {
      this.trace.log('StartedGuard', 'canActivate', true);
      return Observable.of(true);
    }

    this.trace.log('StartedGuard', 'start');
    if (!this.sessionService.isStarted()) {
      this.sessionService.start();
    }

    return this.sessionService.event.map(
      (event) => {
        const started = this.sessionService.isStarted();
        this.trace.log('StartedGuard', 'canActivate', started);
        return started;
      });
  }

}
