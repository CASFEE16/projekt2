import { Injectable } from '@angular/core';
import {BackendService} from '../../core/firebase/backend.service';
import {Show} from './show.model';
import {Observable} from 'rxjs/Observable';
import {Post, POSTS_RESOURCE_PATH} from '../../post/shared/post.model';

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

    return this.backend.database().list(POSTS_RESOURCE_PATH, {
      query: {
        limitToLast: 10,
        orderByChild: 'show/key',
        equalTo: show['$key']
      }})
      .map(posts => {
        console.log('POSTS', posts, show);
        return posts.sort((a, b) => a.show.index - b.show.index);
      });
  }

}
