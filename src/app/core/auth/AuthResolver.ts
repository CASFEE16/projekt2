import {Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {SessionService, ISessionEvent} from "../firebase/session.service";
import {Observable} from "rxjs";

export class AuthResolver implements Resolve<ISessionEvent> {
  constructor(private sessionService: SessionService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISessionEvent> {
    return this.sessionService.start();
  }
}
