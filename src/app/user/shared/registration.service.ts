import { Injectable } from '@angular/core';
import {FirebaseAuthState} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {ObjectRef} from '../../core/firebase/ObjectRef';
import {User, USERS_RESOURCE_PATH} from './user.model';
import {BackendService} from "../../core/firebase/backend.service";

export class Registration {
  name: string;
  email: string;
  password1: string;
  password2: string;
}

@Injectable()
export class RegistrationService {

  constructor(private backend: BackendService) {}

  public register(registration: Registration): Observable<any> {

    const userRef: ObjectRef<User> = new ObjectRef<User>(this.backend, USERS_RESOURCE_PATH);
    const user: User = User.newDefault();
    user.name = registration.name;
    user.email = registration.email;

    return Observable.create((observer: Observer<any>) => {

      if (registration.password1 !== registration.password2) {
        observer.error(new Error('Password does not match'));
      }

      this.backend.createUser({email: registration.email, password: registration.password1}).catch(
        (error) => {
          observer.error(error);
        }
      ).then(
        (createUserResult: FirebaseAuthState) => {
          user.uid = createUserResult.uid;
          userRef.add(createUserResult.uid, user).subscribe(
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
