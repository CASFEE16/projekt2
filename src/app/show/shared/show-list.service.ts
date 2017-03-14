import { Injectable } from '@angular/core';
import {BackendService} from '../../core/firebase/backend.service';
import {SessionService} from '../../core/firebase/session.service';
import {Show, SHOWS_RESOURCE_PATH} from './show.model';
import {Observable} from 'rxjs/Observable';
import {DateUtils} from '../../shared/DateUtils';
import {ListRef} from '../../core/firebase/ListRef';
import {Post} from '../../post/shared/post.model';
import {ShowPostsService} from './show-posts.service';
import {ModelFactory} from '../../core/firebase/model';

export interface ShowWithPosts {
  show: Show;
  posts: Observable<Post[]>;
}

@Injectable()
export class ShowListService {

  private listCache: ListRef<Show> = null;

  constructor(private backend: BackendService, private session: SessionService) {
    this.listCache = new ListRef<Show>(this.backend.database(), SHOWS_RESOURCE_PATH);
  }

  public newDefault(): Show {
    const show: Show = Show.newDefault();
    show.title = 'New Show';
    if (this.session && this.session.currentUser()) {
      show.user = this.session.currentUser().uid;
    }
    return show;
  }

  public findUpcoming(): Observable<Show[]> {
    return this.listCache.find({
      query: {
        limitToLast: 10,
        orderByChild: 'date',
        startAt: DateUtils.todayISOString()
      }}).map(each => this.map(each));
  }

  public findAll(): Observable<Show[]> {
    return this.listCache.find({
      query: {
        limitToLast: 100,
        orderByChild: 'sortKey'
      }}).map(each => this.map(each));
  }

  map(list: Show[]): Show[] {
    return list.map(each => ModelFactory.toClass(Show, each));
  }

  public add(show: Show): Observable<Show> {

    if (!show.user) {
      show.user = this.session.currentUser().uid;
    }
    if (!show.ts) {
      show.ts = Date.now();
    }
    if (!show.date) {
      show.date = DateUtils.todayISOString();
    }

    const time: number = new Date(show.date).getTime();
    show.sortKey = 0 - time;

    return this.listCache.add(show);
  }

  public delete(show: Show): Observable<Show> {
    if (!(show.user === this.session.currentUser().uid)) {
      return Observable.throw(new Error('Can only delete your own shows'));
    }
    return this.listCache.delete(show);
  }

}
