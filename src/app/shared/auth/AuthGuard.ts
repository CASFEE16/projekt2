import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {SessionService} from "../../core/firebase/session.service";

@Injectable()
export class AuthGuard implements CanActivate {

  public allowed: boolean;

  constructor(private sessionService: SessionService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.sessionService.event.map(
      (event) => { return (event.name === 'login' && event.state !== null); }
    )
  }

}
