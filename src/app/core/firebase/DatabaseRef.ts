import {AngularFireDatabase} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

export class DatabaseRef {

  resource: string = null;
  afDatabase: AngularFireDatabase = null;

  constructor(afDatabase?: AngularFireDatabase, resource?: string) {
    this.afDatabase = afDatabase;
    this.resource = resource;
  }

}
