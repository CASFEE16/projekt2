import { Injectable, Inject } from '@angular/core';
import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseAuthState} from 'angularfire2';
import { EmailPasswordCredentials } from 'angularfire2/auth';
import {ReplaySubject, Observable, Observer} from 'rxjs';

export interface ISessionEvent {
  name: string;
  state?: FirebaseAuthState;
  error?: Error;
}

@Injectable()
export class SessionService {

  private _user: firebase.User;
  private _state: FirebaseAuthState;

  constructor(private af: AngularFire) {
    af.auth.subscribe((auth) =>  {
      console.log(auth);
      if(auth == null) {
        this._user = null;
        this._state = null;
        this.event.next({
          name: 'logout',
          state: null
        });
      } else {
        this._state = auth;
        this._user = auth.auth;
        this.event.next({
          name: 'login',
          state: auth
        });
      }
    });
  }

  public event: ReplaySubject<ISessionEvent> = new ReplaySubject();

  public loginAnonymous() {
    console.log('Login anonymous');
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

  public logout(): Promise<void> {
    return this.af.auth.logout().catch(
      (error) => this.event.next({
        name: 'login-error',
        state: null,
        error: error
      })
    );
  }

  public currentUser(): firebase.User {
    return this._user;
  }

  public currentState(): FirebaseAuthState {
    return this._state;
  }

  public isLoggedIn(): boolean {
    return this.currentState() ? true : false;
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
