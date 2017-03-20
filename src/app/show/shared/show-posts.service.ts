import { Injectable } from '@angular/core';
import {BackendService} from '../../core/firebase/backend.service';
import {Show} from './show.model';
import {Observable} from 'rxjs/Observable';
import {Post, POSTS_RESOURCE_PATH} from '../../post/shared/post.model';
import {ObjectRef} from '../../core/firebase/ObjectRef';

export interface ShowWithPosts {
  show: Show;
  posts: Observable<Post[]>;
}

@Injectable()
export class ShowPostsService {

  constructor(private backend: BackendService) {}

  public findPostsForShow(show: Show): Observable<Post[]> {

    if (!show['$key']) {
      return Observable.throw(new Error('Show has no key'));
    }

    return this.backend.list(POSTS_RESOURCE_PATH, {
      query: {
        limitToLast: 10,
        orderByChild: 'show/key',
        equalTo: show['$key']
      }})
      .map(posts => {
        return posts.sort((a, b) => a.show.index - b.show.index);
      });
  }

  public removeFromShow(post: Post, show: Show): Observable<any> {
    if (!show['$key']) {
      return Observable.throw(new Error('Show has no key'));
    }
    post.show = {key: null, index: null};
    return this.backend.update(POSTS_RESOURCE_PATH, post, {show_key: null, show: post.show});
  }

}
