import {FirebaseListObservable, AngularFireDatabase} from "angularfire2";
import {Observable, Observer} from "rxjs";

export class ListCache<T> {

  list: FirebaseListObservable<T[]> = null;

  constructor() {
  }

  public find(afDatabase: AngularFireDatabase, resource: string, options?: any): FirebaseListObservable<T[]> {
    this.list = afDatabase.list(resource, options);
    return this.list;
  }

  public add(obj: T): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      return this.list.push(obj)
        .catch(error => observer.error(error))
        .then(result => {
          observer.next(result);
          observer.complete()
        });
    })
  }

  public delete(obj: T): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      return this.list.remove(obj['$key'])
        .catch(error => observer.error(error))
        .then(result => {
          observer.next(result);
          observer.complete()
        });
    })
  }

  public update(obj: T, changes: any): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      return this.list.update(obj['$key'], changes)
        .catch(error => observer.error(error))
        .then(result => {
          observer.next(result);
          observer.complete()
        });
    })
  }

}
