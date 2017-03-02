import { Injectable } from '@angular/core';
import {AngularFire, FirebaseAuthState} from "angularfire2";
import {Observable, Observer} from "rxjs";
import {ListCache} from "./ListCache";

export class Registration {
  name: string;
  email: string;
  password1: string;
  password2: string;
}

@Injectable()
export class RegistrationService {

  private _user: firebase.User;
  private _state: FirebaseAuthState;
  private user: ListCache<Registration> = new ListCache<Registration>();

  constructor(private af: AngularFire) {}

  public register(registration: Registration): Observable<any> {
    return Observable.create((observer: Observer<any>) => {

      if (registration.password1 !== registration.password2) {
        observer.error(new Error('Password does not match'));
      }

      this.af.auth.createUser({email: registration.email, password: registration.password1}).catch(
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

}
