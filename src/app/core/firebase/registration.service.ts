import { Injectable } from '@angular/core';
import {AngularFire, FirebaseAuthState} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {ObjectCache} from './ObjectCache';
import {User, USERS_RESOURCE_PATH} from '../../user/shared/user.model';

export class Registration {
  name: string;
  email: string;
  password1: string;
  password2: string;
}

@Injectable()
export class RegistrationService {

  constructor(private af: AngularFire) {}

  public register(registration: Registration): Observable<any> {

    const userRef: ObjectCache<User> = new ObjectCache<User>(this.af.database);
    const user: User = User.newDefault();
    user.name = registration.name;
    user.email = registration.email;

    return Observable.create((observer: Observer<any>) => {

      if (registration.password1 !== registration.password2) {
        observer.error(new Error('Password does not match'));
      }

      this.af.auth.createUser({email: registration.email, password: registration.password1}).catch(
        (error) => {
          observer.error(error);
        }
      ).then(
        (createUserResult: FirebaseAuthState) => {
          user.uid = createUserResult.uid;
          userRef.add(USERS_RESOURCE_PATH, createUserResult.uid, user).subscribe(
            (userAddResult) => {
              observer.next(userAddResult);
              observer.complete();
            },
            (error) => observer.error(error)
          );
        });
    });
  }

}
