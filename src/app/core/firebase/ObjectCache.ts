import {FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

/*
 * Wrapper class for FirebaseObjectObservable, which responds Observables instead of Promises for most operations.
 *
 */
export class ObjectCache<T> {

  object: FirebaseObjectObservable<T> = null;
  afDatabase: AngularFireDatabase = null;

  constructor(afDatabase?: AngularFireDatabase) {
    this.afDatabase = afDatabase;
  }

  public get(resource: string, options?: any): Observable<T> {
    this.object = this.afDatabase.object(resource, options);
    return this.object;
  }

  public getId(resource: string, id: string, options?: any): Observable<T> {
    this.object = this.afDatabase.object(resource + '/' + id, options);
    return this.object;
  }

  public add(resource: string, id: string, obj: T): Observable<T> {
    this.object = this.afDatabase.object(`${resource}/${id}`);
    return Observable.create((observer: Observer<T>) => {
      return this.object.set(obj)
        .catch(error => observer.error(error))
        .then(result => {
          observer.next(result);
          observer.complete();
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
        });
    });
  }

}
