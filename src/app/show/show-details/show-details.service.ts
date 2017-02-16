import { Injectable } from '@angular/core';
import {BackendService} from "../../core/firebase/backend.service";
import {SessionService} from "../../core/firebase/session.service";
import {Observable} from "rxjs";
import {FirebaseListObservable} from "angularfire2";
import {DateUtils} from "../../shared/DateUtils";
import {ListCache} from "../../core/firebase/ListCache";
import {Post} from "../../post/shared/post.model";
import {ObjectCache} from "../../core/firebase/ObjectCache";
import {SHOWS_RESOURCE_PATH, Show} from "../shared/show.model";


@Injectable()
export class ShowDetailsService {

  private object: ObjectCache<Show> = new ObjectCache<Show>();

  constructor(private backend: BackendService, private session: SessionService) { }

  public get(id: string): Observable<Show> {
    return this.object.get(this.backend.database(), SHOWS_RESOURCE_PATH + '/' + id)
      .map(obj => Object.assign(new Show(), obj));
  }

  public delete(show: Show): Observable<Show> {

    if (!(show.user === this.session.currentUser().uid)) {
      return Observable.of(null);
    }

    return this.object.delete();
  }

  public save(changes: any): Observable<Show> {
    return this.object.update(changes);
  }

}
