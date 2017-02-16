import { Injectable } from '@angular/core';
import {BackendService} from "../../core/firebase/backend.service";
import {SessionService} from "../../core/firebase/session.service";
import {Show} from "./show.model";
import {Observable} from "rxjs";
import {FirebaseListObservable} from "angularfire2";
import {DateUtils} from "../../shared/DateUtils";
import {ListCache} from "../../core/firebase/ListCache";


@Injectable()
export class ShowService {

  private listCache: ListCache<Show> = new ListCache<Show>();

  constructor(private backend: BackendService, private session: SessionService) { }

  public newDefault(): Show {
    let show: Show = new Show();
    show.title = 'New Show';
    show.date = DateUtils.todayISOString();
    show.user = this.session.currentUser().uid;
    show.ts = Date.now();
    return show;
  }

  public findUpcoming(): Observable<Show[]> {
    return this.listCache.find(this.backend.database(), '/shows', {
      query: {
        limitToLast: 10,
        orderByChild: 'date',
        startAt: DateUtils.todayISOString()
      }}).map(each => this.map(each));
  }

  public findFront(): Observable<Show[]> {
    return this.findUpcoming();
  }

  public findAll(): Observable<Show[]> {
    return this.listCache.find(this.backend.database(), '/shows', {
      query: {
        limitToLast: 100,
        orderByChild: 'sortKey'
      }}).map(each => this.map(each));
  }

  map(list: Show[]): Show[] {
    let newList: Show[] = list.map(each => Object.assign(new Show(), each));
    return newList;
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

    let time: number = new Date(show.date).getTime();
    show.sortKey = 0 - time;

    return this.listCache.add(show);
  }

  public delete(show: Show): Observable<Show> {

    if (!(show.user === this.session.currentUser().uid)) {
      return Observable.of(null);
    }

    return this.listCache.delete(show);
  }


}
