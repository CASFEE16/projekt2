import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, AngularFireDatabase} from "angularfire2";
import {Observable, Observer} from "rxjs";
import {SessionService} from "./session.service";

@Injectable()
export class BackendService {

  constructor(private af: AngularFire) { }

  public database(): AngularFireDatabase {
    return this.af.database;
  }

}
