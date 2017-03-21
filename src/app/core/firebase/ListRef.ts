import {FirebaseListObservable} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {DatabaseRef} from './DatabaseRef';
import {BackendService} from "./backend.service";

/*
 * Wrapper class for FirebaseListObservable, which responds Observables instead of Promises for most operations.
 *
 */
export class ListRef<T> extends DatabaseRef {

  list: FirebaseListObservable<T[]> = null;

  constructor(backend: BackendService, resource: string) {
    super(backend, resource);
  }

  public find(options?: any): FirebaseListObservable<T[]> {
    this.list = this.backend.list(this.resource, options) as FirebaseListObservable<T[]>;
    return this.list;
  }

  public add(obj: T): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      return this.list.push(obj)
        .catch(error => observer.error(error))
        .then(result => {
          observer.next(result);
          observer.complete();
        }, error => {
          observer.error(error);
        });
    });
  }

  public delete(obj: T): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      return this.list.remove(obj['$key'])
        .catch(error => observer.error(error))
        .then(result => {
          observer.next(result);
          observer.complete();
        }, error => {
          observer.error(error);
        });
    });
  }

  public update(obj: T, changes: any): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      return this.list.update(obj['$key'], changes)
        .catch(error => observer.error(error))
        .then(result => {
          observer.next(result);
          observer.complete();
        }, error => {
          observer.error(error);
        });
    });
  }

}
