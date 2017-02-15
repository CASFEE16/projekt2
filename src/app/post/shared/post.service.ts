import { Injectable } from '@angular/core';
import {Observable, Observer} from "rxjs";
import {Post} from "./post.model";
import {BackendService} from "../../core/firebase/backend.service";
import {FirebaseListObservable} from "angularfire2";
import {SessionService} from "../../core/firebase/session.service";

@Injectable()
export class PostService {

  constructor(private backend: BackendService<Post>, private session: SessionService) { }

  public findFront(): FirebaseListObservable<Post[]> {
    return this.backend.find('/posts', {
      query: {
        limitToLast: 10,
        orderByChild: 'sortKey'
      }});
  }

  public add(post: Post): Observable<Post> {

    post.user = this.session.currentUser().uid;
    // post.ts = this.session.serverTimestamp();
    post.dt = new Date().toISOString();
    post.sortKey = 0 - Date.now(); // AF can not sort descending, so use this workaround

    return this.backend.add(post);
  }

  public delete(post: Post): Observable<Post> {

    if (!(post.user === this.session.currentUser().uid)) {
      return Observable.of(null);
    }

    return this.backend.delete(post);
  }

}
