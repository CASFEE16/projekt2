import { Injectable } from '@angular/core';
import {BackendService} from '../../core/firebase/backend.service';
import {SessionService} from '../../core/firebase/session.service';
import {Show, SHOWS_RESOURCE_PATH} from './show.model';
import {ObjectRef} from '../../core/firebase/ObjectRef';
import {ShowPostsService} from './show-posts.service';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class ShowService {

  private objectRef: ObjectRef<Show>;

  constructor(
      private backend: BackendService,
      private session: SessionService,
      private showPostsService: ShowPostsService) {
    this.objectRef = new ObjectRef<Show>(backend);
  }

  public delete(show: Show): Observable<Show> {
    if (!(show.user === this.session.currentUser().uid)) {
      return Observable.throw(new Error('Can only delete your own shows'));
    }
    return this.objectRef.getId(SHOWS_RESOURCE_PATH, show['$key']).flatMap(
      result => this.objectRef.delete()
    );
  }

}
