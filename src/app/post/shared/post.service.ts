import { Injectable } from '@angular/core';
import {Observable, Observer} from "rxjs";
import {Post} from "./post.model";
import {BackendService} from "../../core/firebase/backend.service";
import {FirebaseListObservable} from "angularfire2";
import {SessionService} from "../../core/firebase/session.service";
import {DateUtils} from "../../shared/DateUtils";
import {ListCache} from "../../core/firebase/ListCache";

@Injectable()
export class PostService {

  private listCache: ListCache<Post> = new ListCache<Post>();

  constructor(private backend: BackendService, private session: SessionService) { }

  public findFront(): Observable<Post[]> {
    return this.listCache.find(this.backend.database(), '/posts', {
      query: {
        limitToLast: 10,
        orderByChild: 'sortKey'
      }}).map(result => this.map(result));
  }

  map(list: Post[]): Post[] {
    let newList: Post[] = list.map(each => Object.assign(new Post(), each));
    return newList;
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

    post.sortKey = 0 - post.ts;

    return this.listCache.add(post);
  }

  public delete(post: Post): Observable<Post> {

    if (!(post.user === this.session.currentUser().uid)) {
      return Observable.of(null);
    }

    return this.listCache.delete(post);
  }

}
