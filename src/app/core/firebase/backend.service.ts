import { Injectable } from '@angular/core';
import {AngularFire, AngularFireDatabase} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {ObjectRef} from './ObjectRef';
import {ListRef} from './ListRef';

@Injectable()
export class BackendService {

  constructor(private af: AngularFire) { }

  public database(): AngularFireDatabase {
    return this.af.database;
  }

  public list(resource: string, options?: any): Observable<any> {
    return this.database().list(resource, options);
  }

  public get(resource: string, id: string, options?: any): Observable<any> {
    return this.database().list(resource + '/' + id, options);
  }

  public update(resource: string, obj: any, data: any): Observable<any> {
    const objRef = new ObjectRef<any>(this.af.database);
    return objRef.getId(resource, obj['$key']).flatMap(
      (result) => {
        return objRef.update(data);
      });
  }

}
