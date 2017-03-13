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
    return this.backend.database().list(POSTS_RESOURCE_PATH, {
      query: {
        limitToLast: 100,
        orderByChild: 'show/key',
        equalTo: show['$key']
      }})
      .map(posts => posts.sort((a, b) => a.show.index - b.show.index));
  }

}
