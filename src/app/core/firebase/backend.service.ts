import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {Observable} from "rxjs";

@Injectable()
export class BackendService {

  constructor(private af: AngularFire) { }

  public list(resource: string): FirebaseListObservable<any[]> {
    return this.af.database.list(resource);
  }

}
