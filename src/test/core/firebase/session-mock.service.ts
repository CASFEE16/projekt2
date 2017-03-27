import { Injectable } from '@angular/core';
import {FirebaseAuthState, AuthProviders} from 'angularfire2';
import { EmailPasswordCredentials } from 'angularfire2/auth';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {ISessionEvent, SessionService} from '../../../app/core/firebase/session.service';

export class MockAuthState implements FirebaseAuthState {
  uid: string;
  provider: AuthProviders;
  auth: firebase.User;

  constructor() {
    this.uid = 'uid1';
    this.provider = null;
    this.auth = null;
  }
}

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
        const state = new MockAuthState();
        observer.next(state);
        this.event.next({
          name: 'login',
          state: state
        });
        observer.complete();
    });
  }

  public logout(): Observable<FirebaseAuthState> {
    return Observable.create((observer: Observer<any>) => {
        observer.next(new MockAuthState());
        this.event.next({
          name: 'logout',
          state: null
        });
        observer.complete();
    });
  }

  public get username(): string {
    return 'test';
  }

}
