import {AngularFireDatabase} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {BackendService} from "./backend.service";

export class DatabaseRef {

  resource: string = null;
  backend: BackendService = null;

  constructor(backend: BackendService, resource: string) {
    this.backend = backend;
    this.resource = resource;
  }

}
