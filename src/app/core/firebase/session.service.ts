import { Injectable, Inject } from '@angular/core';
import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseAuthState} from 'angularfire2';
import { EmailPasswordCredentials } from 'angularfire2/auth';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {TraceService} from '../trace/trace.service';
import {BackendService} from './backend.service';

export interface ISessionEvent {
  name: string;
  state?: FirebaseAuthState;
  error?: Error;
}

/**
 * This is a global service! It keeps the authentication state for the application.
 * Use this service to access AngularFire services.
 */
@Injectable()
export class SessionService {

  protected _user: firebase.User = null;
  protected _state: FirebaseAuthState = null;
  protected _started = false;
  public event: ReplaySubject<ISessionEvent> = new ReplaySubject();

  constructor(private backend: BackendService, private trace: TraceService) {
  }

  public start(): Observable<ISessionEvent> {
    this.backend.events.subscribe((auth) =>  {
      this.trace.log('SessionService', 'Firebase Auth Event', auth);
      this._started = true;
      this._state = auth;
      if (auth == null) {
        this._user = null;
        this.event.next({
          name: 'logout',
          state: null
        });
      } else {
        this._user = auth.auth;
        this.event.next({
          name: 'login',
          state: auth
        });
      }
    });
    return this.event;
  }

  public loginAnonymous() {
    this.backend.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous,
    });
  }

  public loginCredentials(credentials: EmailPasswordCredentials): Observable<FirebaseAuthState> {
    return Observable.create((observer: Observer<any>) => {
      this.backend.loginCredentials(credentials, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).catch(
        (error) => {
          observer.error(error);
        }
      ).then(
        (result) => {
          observer.next(result);
          observer.complete();
        });
    });
  }

  public logout(): Observable<FirebaseAuthState> {
    return Observable.create((observer: Observer<any>) => {
      this.backend.logout().catch(
        (error) => {
          observer.error(error);
        }
      ).then(
        (result) => {
          observer.next(result);
          observer.complete();
        });
    });
  }

  public currentUser(): firebase.User {
    return this._user;
  }

  public currentState(): FirebaseAuthState {
    return this._state;
  }

  public isLoggedIn(): boolean {
    return !!this.currentUser();
  }

  public isStarted(): boolean {
    return this._started;
  }

  public watchLoggedIn(): Observable<boolean> {
    const obs: Observable<ISessionEvent> = this.event;
    return obs
      .map((event) => {
        return event.state !== null;
      });
  }

  public get username() {
    const user = this.currentUser();
    if (user) {
      return user.displayName || user.email || 'unknown';
    }
    return 'anonymous';
  }

  public serverTimestamp(): any {
    return firebase.database['ServerValue']['TIMESTAMP'];
  }

}
