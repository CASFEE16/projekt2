import {FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable} from "angularfire2";
import {Observable, Observer} from "rxjs";

/*
 * Wrapper class for FirebaseObjectObservable, which responds Observables instead of Promises for most operations.
 *
 */
export class ObjectCache<T> {

  object: FirebaseObjectObservable<T> = null;

  constructor() {
  }

  public get(afDatabase: AngularFireDatabase, resource: string, options?: any): FirebaseObjectObservable<T> {
    this.object = afDatabase.object(resource, options);
    return this.object;
  }

  public add(afDatabase: AngularFireDatabase, resource: string, id: string, obj: T): Observable<T> {
    this.object = afDatabase.object(`${resource}/${id}`);
    return Observable.create((observer: Observer<T>) => {
      return this.object.set(obj)
        .catch(error => observer.error(error))
        .then(result => {
          observer.next(result);
          observer.complete()
        });
    });
  }

  public delete(): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      return this.object.remove()
        .catch(error => observer.error(error))
        .then(result => {
          observer.next(result);
          observer.complete()
        });
    })
  }

  public update(changes: any): Observable<T> {
    let newObj = changes;
    if (newObj['$key']) {
      newObj = Object.assign({}, changes);
      delete newObj['$key'];
    }
    return Observable.create((observer: Observer<T>) => {
      return this.object.update(newObj)
        .catch(error => observer.error(error))
        .then(result => {
          observer.next(result);
          observer.complete()
        });
    })
  }

  public set(obj: any): Observable<T> {
    let newObj = obj;
    if (newObj['$key']) {
      newObj = Object.assign({}, obj);
      delete newObj['$key'];
    }
    return Observable.create((observer: Observer<T>) => {
      return this.object.set(newObj)
        .catch(error => observer.error(error))
        .then(result => {
          observer.next(result);
          observer.complete()
        });
    })
  }

}
