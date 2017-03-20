import {BackendService} from "../../../core/firebase/backend.service";
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {FirebaseAuthState} from 'angularfire2';

export class BackendMockService extends BackendService {

  private _events: ReplaySubject<any> = new ReplaySubject<any>();

  public get events(): Observable<any> {
    return this._events;
  }

  public constructor() {
    super(null);
  }

  public list(resource: string, options?: any): Observable<any> {
    return Observable.of(null);
  }

  public object(resource: string, options?: any): Observable<any> {
    return Observable.of(null);
  }

  public get(resource: string, id: string, options?: any): Observable<any> {
    return Observable.of(null);
  }

  public login(config?: any): firebase.Promise<FirebaseAuthState> {
    return null;
  }

  public loginCredentials(credentials: any, options?: any): firebase.Promise<FirebaseAuthState> {
    return null;
  }

  public logout(): Promise<void> {
    return null;
  }
  public createUser(credentials: any): firebase.Promise<FirebaseAuthState> {
    return null;
  }

}
