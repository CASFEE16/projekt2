import { Injectable, Inject } from '@angular/core';
import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseAuthState, FirebaseAuth} from 'angularfire2';
import { EmailPasswordCredentials } from 'angularfire2/auth';
import { ReplaySubject } from 'rxjs';

export interface ISessionEvent {
  name: string;
  state: FirebaseAuthState;
}

@Injectable()
export class SessionService {

  private _user: firebase.User;
  private _state: FirebaseAuthState;

  constructor(private af: AngularFire) {
    af.auth.subscribe((auth) =>  {
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
    this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous,
    });
  }

  public loginCredentials(credentials: EmailPasswordCredentials) {
    this.af.auth.login(credentials);
  }

  public logout(): void {
    this.af.auth.logout();
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

}
