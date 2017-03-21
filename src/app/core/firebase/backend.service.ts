import { Injectable } from '@angular/core';
import {AngularFire, AngularFireDatabase, FirebaseAuthState} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {ObjectRef} from './ObjectRef';

@Injectable()
export class BackendService {

  public get events(): Observable<any> {
    return this.af.auth;
  }

  constructor(private af: AngularFire) { }

  private database(): AngularFireDatabase {
    return this.af.database;
  }

  public list(resource: string, options?: any): Observable<any> {
    return this.database().list(resource, options);
  }

  public object(resource: string, options?: any): Observable<any> {
    return this.database().object(resource, options);
  }

  public get(resource: string, id: string, options?: any): Observable<any> {
    return this.database().object(resource + '/' + id, options);
  }

  public update(resource: string, obj: any, data: any): Observable<any> {
    const objRef = new ObjectRef<any>(this, resource);
    return objRef.getId(obj['$key']).flatMap(
      (result) => {
        return objRef.update(data);
      });
  }

  public login(config?: any): firebase.Promise<FirebaseAuthState> {
    return this.af.auth.login(config);
  }

  public loginCredentials(credentials: any, options?: any): firebase.Promise<FirebaseAuthState> {
    return this.af.auth.login(credentials, options);
  }

  public logout(): Promise<void> {
    return this.af.auth.logout();
  }

  public createUser(credentials: any): firebase.Promise<FirebaseAuthState> {
    return this.af.auth.createUser(credentials);
  }

  public getKey(obj: any): string | null {
    if (!obj || typeof obj !== 'object' || !obj['$key']) {
      return null;
    }
    return obj['$key'];
  }

}
