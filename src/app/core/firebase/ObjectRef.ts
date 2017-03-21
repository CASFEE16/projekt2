import {FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {DatabaseRef} from './DatabaseRef';
import {BackendService} from "./backend.service";

/*
 * Wrapper class for FirebaseObjectObservable, which responds Observables instead of Promises for most operations.
 *
 */
export class ObjectRef<T> extends DatabaseRef {

  object: FirebaseObjectObservable<T> = null;

  constructor(backend: BackendService, resource: string) {
    super(backend, resource);
  }

  public get(options?: any): Observable<T> {
    this.object = this.backend.object(this.resource, options) as FirebaseObjectObservable<T>;
    return this.object;
  }

  public getId(id: string, options?: any): Observable<T> {
    this.resource = this.resource + '/' + id;
    return this.get(options);
  }

  public add(id: string, obj: T): Observable<T> {
    this.object = this.backend.object(`${this.resource}/${id}`)  as FirebaseObjectObservable<T>;
    return Observable.create((observer: Observer<T>) => {
      return this.object.set(obj)
        .catch(error => observer.error(error))
        .then(result => {
          observer.next(result);
          observer.complete();
        }, error => {
          observer.error(error);
        });
    });
  }

  public delete(): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      return this.object.remove()
        .catch(error => observer.error(error))
        .then(result => {
          observer.next(result);
          observer.complete();
        }, error => {
          observer.error(error);
        });
    });
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
          observer.complete();
        }, error => {
          observer.error(error);
        });
    });
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
          observer.complete();
        }, error => {
          observer.error(error);
        });
    });
  }

}
