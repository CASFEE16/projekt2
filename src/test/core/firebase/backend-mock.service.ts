import {BackendService} from "../../../app/core/firebase/backend.service";
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {FirebaseAuthState} from 'angularfire2';

import '../../../rx';

export class BackendMockService extends BackendService {

  private _events: ReplaySubject<any> = new ReplaySubject<any>();
  private _resources = {};

  public get events(): Observable<any> {
    return this._events;
  }

  public testResource(resource: string, value: any) {
    this._resources[resource] = value;
  }

  public constructor() {
    super(null);

    // Initialize default test data, can be changed by every test

    this.testResource('/shows', [
      {
        title: 'Show',
        ['$key']: 's1'
      }
    ]);
    this.testResource('/posts', [
      {
        title: 'Post',
        ['$key']: 'p1',
        show: {
          key: 's1'
        }
      }
    ]);
    this.testResource('/users', [
      {
        name: 'test',
        ['$key']: 'u1'
      }
    ]);

  }

  public list(resource: string, options?: any): Observable<any> {
    if (!this._resources[resource]) {
      return Observable.throw(new Error('BackendService>>list not mocked: ' + resource));
    }
    return Observable.of(this._resources[resource]).delay(1000);
  }

  public object(resource: string, options?: any): Observable<any> {
    if (!this._resources[resource]) {
      return Observable.throw(new Error('BackendService>>object not mocked: ' + resource));
    }
    return Observable.of(this._resources[resource]).delay(1000);
  }

  public get(resource: string, id: string, options?: any): Observable<any> {
    if (!this._resources[resource]) {
      return Observable.throw(new Error('BackendService>>get not mocked: ' + resource));
    }
    return Observable.of(this._resources[resource]).delay(1000);
  }

  public login(config?: any): firebase.Promise<FirebaseAuthState> {
    throw (new Error('BackendService>>login not mocked'));
  }

  public loginCredentials(credentials: any, options?: any): firebase.Promise<FirebaseAuthState> {
    throw (new Error('BackendService>>loginCredentials not mocked'));
  }

  public logout(): Promise<void> {
    throw (new Error('BackendService>>logout not mocked'));
  }

  public createUser(credentials: any): firebase.Promise<FirebaseAuthState> {
    throw (new Error('BackendService>>createUser not mocked'));
  }

}
