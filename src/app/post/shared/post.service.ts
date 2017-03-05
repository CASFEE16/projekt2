import { Injectable } from '@angular/core';
import {Observable, Observer} from "rxjs";
import {Post, POSTS_RESOURCE_PATH} from "./post.model";
import {BackendService} from "../../core/firebase/backend.service";
import {FirebaseListObservable} from "angularfire2";
import {SessionService} from "../../core/firebase/session.service";
import {DateUtils} from "../../shared/DateUtils";
import {ListCache} from "../../core/firebase/ListCache";
import {Show} from "../../show/shared/show.model";
import {YoutubeUtils} from "../../core/youtube/YoutubeUtils";
import {YoutubeService} from "../../core/youtube/youtube.service";

export interface PostShowListEntry {
  post: Post;
  show: Show;
}

@Injectable()
export class PostService {

  private listCache: ListCache<Post> = new ListCache<Post>();

  constructor(
    private backend: BackendService,
    private session: SessionService,
    private youtube: YoutubeService) { }

  public findFront(): Observable<PostShowListEntry[]> {
    return this.listCache.find(this.backend.database(), POSTS_RESOURCE_PATH, {
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

    let youtubeId = YoutubeUtils.getId(post.text);
    if (youtubeId) {
      return this.youtube.getVideoInfo(youtubeId)
        .flatMap(result => {
          let url = YoutubeUtils.getUrl(post.text);
          if (url) {
            post.content = url;
            post.text = result.title || post.text;
          }
          return this.listCache.add(post);
        });
    }

    return this.listCache.add(post);
  }

  public delete(post: Post): Observable<Post> {

    if (!(post.user === this.session.currentUser().uid)) {
      return Observable.of(null);
    }

    return this.listCache.delete(post);
  }

  public setShow(post: Post, show: Show): Observable<Post> {
    if (!show || !show['$key']) {
      return this.listCache.update(post, {show_key: null});
    }
    return this.listCache.update(post, {show_key: show['$key']});
  }

  public setRating(post: Post, rating: number): Observable<Post> {
    console.log(post, rating);
    post.rating = rating;
    return this.listCache.update(post, {rating: rating});
  }

}
