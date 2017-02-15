import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {Observable, Observer} from "rxjs";
import {SessionService} from "./session.service";

/**
 * This is NOT A GLOBAL SINGLETON service!
 * Create an individual provider for each module or component.
 * Use this service to abstract from the AngularFire backend.
 */
@Injectable()
export class BackendService<T> {

  list: FirebaseListObservable<T[]> = null;

  constructor(private af: AngularFire) { }

  public find(resource: string, options?: any): FirebaseListObservable<T[]> {
    this.list = this.af.database.list(resource, options);
    return this.list;
  }

  public add(obj: T): Observable<T> {
    let obs: FirebaseListObservable<T[]> = <FirebaseListObservable<T[]>>this.list;
    return Observable.create((observer: Observer<T>) => {
      return obs.push(obj)
        .catch(error => observer.error(error))
        .then(result => {observer.next(result); observer.complete()});
    })
  }

  public delete(obj: T): Observable<T> {
    let obs: FirebaseListObservable<T[]> = <FirebaseListObservable<T[]>>this.list;
    return Observable.create((observer: Observer<T>) => {
      return obs.remove(obj['$key'])
        .catch(error => observer.error(error))
        .then(result => {observer.next(result); observer.complete()});
    })
  }

}
