import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import {Observable} from "rxjs";

@Injectable()
export class BackendService {

  constructor(private af: AngularFire) { }

  public list(resource: string): Observable<any> {
    return this.af.database.list(resource);
  }

}
