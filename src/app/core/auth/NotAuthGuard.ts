import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {SessionService} from "../firebase/session.service";

@Injectable()
export class NotAuthGuard implements CanActivate {

  constructor(private sessionService: SessionService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!this.sessionService.isLoggedIn()) {
      return Observable.of(true);
    }
    return this.sessionService.event.map(
      (event) => { return (event.name === 'logout' && event.state !== null); }
    )
  }

}
