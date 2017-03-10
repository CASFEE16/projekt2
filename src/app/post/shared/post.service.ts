import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Post, POSTS_RESOURCE_PATH} from "./post.model";
import {BackendService} from "../../core/firebase/backend.service";
import {FirebaseListObservable} from "angularfire2";
import {SessionService} from "../../core/firebase/session.service";
import {DateUtils} from "../../shared/DateUtils";
import {ListCache} from "../../core/firebase/ListCache";
import {ContentService} from "../../core/content/content.service";
import {TraceService} from "../../core/trace/trace.service";
import {PostShowListEntry} from "./post-show.model";

@Injectable()
export class PostService {

  private listCache: ListCache<Post> = new ListCache<Post>();

  constructor(
    private trace: TraceService,
    private backend: BackendService,
    private session: SessionService,
    private content: ContentService) { }

  public findFront(): Observable<PostShowListEntry[]> {
    return this.listCache.find(this.backend.database(), POSTS_RESOURCE_PATH, {
      query: {
        limitToLast: 100,
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
    this.trace.log('PostService', 'add', post);
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

    return this.content
      .getInfo(post.text)
      .flatMap((result) => {
        post.content = result.contentUrl || post.content || '';
        post.text = (result.title || post.text || '');
        return this.listCache.add(post);
      });
  }

  public delete(post: Post): Observable<Post> {
    this.trace.log('PostService', 'delete', post);
    if (!(post.user === this.session.currentUser().uid)) {
      return Observable.of(null);
    }
    return this.listCache.delete(post);
  }

  public setShow(post: Post, showKey: string): Observable<Post> {
    this.trace.log('PostService', 'setShow', post, showKey);
    if (!post.show) {
      post.show = {key: null, index: null};
    }
    post.show.key = showKey;
    if (!post.show.index) {
      post.show.index = Date.now();
    }
    return this.listCache.update(post, {show_key: null, show: post.show});
  }

  public setRating(post: Post, rating: number): Observable<Post> {
    this.trace.log('PostService', 'setRating', post, rating);
    post.rating = rating;
    return this.listCache.update(post, {rating: rating});
  }

}
