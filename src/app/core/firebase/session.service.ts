import { Injectable, Inject } from '@angular/core';
import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseAuthState} from 'angularfire2';
import { EmailPasswordCredentials } from 'angularfire2/auth';
import {ReplaySubject, Observable, Observer} from 'rxjs';
import {TraceService} from "../trace/trace.service";

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

  private _user: firebase.User = null;
  private _state: FirebaseAuthState = null;
  private _started: boolean = false;

  constructor(private af: AngularFire, private trace: TraceService) {
  }

  public start(): Observable<ISessionEvent> {
    this.af.auth.subscribe((auth) =>  {
      this.trace.log('SessionService', 'Firebase Auth Event', auth);
      this._started = true;
      this._state = auth;
      if(auth == null) {
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

  public event: ReplaySubject<ISessionEvent> = new ReplaySubject();

  public loginAnonymous() {
    this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous,
    });
  }

  public loginCredentials(credentials: EmailPasswordCredentials): Observable<FirebaseAuthState> {
    return Observable.create((observer: Observer<any>) => {
      this.af.auth.login(credentials, {
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
      this.af.auth.logout().catch(
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

  public get username() {
    let user = this.currentUser();
    if (user) {
      return user.displayName || user.email || 'unknown';
    }
    return 'anonymous';
  }

  public serverTimestamp(): any {
    return firebase.database['ServerValue']['TIMESTAMP'];
  }

}
