import { Injectable } from '@angular/core';
import {BackendService} from "../../core/firebase/backend.service";
import {SessionService} from "../../core/firebase/session.service";
import {Observable} from "rxjs";
import {ObjectCache} from "../../core/firebase/ObjectCache";
import {SHOWS_RESOURCE_PATH, Show} from "../shared/show.model";
import {Post, POSTS_RESOURCE_PATH} from "../../post/shared/post.model";


@Injectable()
export class ShowDetailsService {

  private object: ObjectCache<Show> = null;

  constructor(private backend: BackendService, private session: SessionService) {
    this.object = new ObjectCache<Show>(backend.database());
  }

  public get(id: string): Observable<Show> {
    return this.object.getId(SHOWS_RESOURCE_PATH, id)
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

  public findPostsForShow(show: Show): Observable<Post[]> {
    return this.backend.list(POSTS_RESOURCE_PATH, {
      query: {
        limitToLast: 100,
        orderByChild: 'show_key',
        equalTo: show['$key']
      }});
  }

  public removePost(post: Post): Observable<Post> {
    let obj: ObjectCache<Post> = new ObjectCache<Post>(this.backend.database());
    return obj.getId(POSTS_RESOURCE_PATH, post['$key']).flatMap(
      result => obj.update({show_key: null})
    );
  }

}
