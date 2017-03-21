import { Injectable } from '@angular/core';
import {FirebaseAuthState} from 'angularfire2';
import { EmailPasswordCredentials } from 'angularfire2/auth';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {ISessionEvent, SessionService} from "../../../app/core/firebase/session.service";

/**
 * This is a global service! It keeps the authentication state for the application.
 * Use this service to access AngularFire services.
 */
@Injectable()
export class SessionMockService extends SessionService {

  constructor() {
    super(null, null);
    console.log('SessionMockService>>constructor');
  }

  public start(): Observable<ISessionEvent> {
      this._started = true;
      this._state = null;
      this.event.next({
        name: 'logout',
        state: null
      });
    return this.event;
  }

  public loginAnonymous() {
  }

  public loginCredentials(credentials: EmailPasswordCredentials): Observable<FirebaseAuthState> {
    return Observable.create((observer: Observer<any>) => {
        observer.next(null);
        observer.complete();
    });
  }

  public logout(): Observable<FirebaseAuthState> {
    return Observable.create((observer: Observer<any>) => {
        observer.next(null);
        observer.complete();
    });
  }

}
