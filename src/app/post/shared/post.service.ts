import { Injectable } from '@angular/core';
import {Observable, Observer} from "rxjs";
import {Post} from "./post.model";
import {BackendService} from "../../core/firebase/backend.service";
import {FirebaseListObservable} from "angularfire2";
import {SessionService} from "../../core/firebase/session.service";
import {DateUtils} from "../../shared/DateUtils";
import {ListCache} from "../../core/firebase/ListCache";
import {Show} from "../../show/shared/show.model";

export interface PostShowListEntry {
  post: Post;
  show: Show;
}

@Injectable()
export class PostService {

  private listCache: ListCache<Post> = new ListCache<Post>();

  constructor(private backend: BackendService, private session: SessionService) { }

  public findFront(): Observable<PostShowListEntry[]> {
    return this.listCache.find(this.backend.database(), '/posts', {
      query: {
        limitToLast: 10,
        orderByChild: 'sortKey'
      }}).map(posts => {
          return posts.map(post => {
              // TODO: Get Show from Firebase this.backend.database.object(...)
              return {post: Object.assign(new Post(), post), show: null};
            }
          );
        }
      );
  }

  public add(post: Post): Observable<Post> {

    if (!post.user) {
      post.user = this.session.currentUser().uid;
    }
    if (!post.ts) {
      post.ts = Date.now();
    }
    if (!post.date) {
      post.date = DateUtils.todayISOString();
    }

    post.sortKey = 0 - Date.now();

    return this.listCache.add(post);
  }

  public delete(post: Post): Observable<Post> {

    if (!(post.user === this.session.currentUser().uid)) {
      return Observable.of(null);
    }

    return this.listCache.delete(post);
  }

  public setShow(post: Post, show: Show): Observable<Post> {
    if (!show['$key'])
      return null;
    return this.listCache.update(post, {show_key: show['$key']});
  }

}
