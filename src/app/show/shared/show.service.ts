import { Injectable } from '@angular/core';
import {BackendService} from "../../core/firebase/backend.service";
import {SessionService} from "../../core/firebase/session.service";
import {Show} from "./show.model";
import {Observable} from "rxjs";
import {FirebaseListObservable} from "angularfire2";


@Injectable()
export class ShowService {

  constructor(private backend: BackendService<Show>, private session: SessionService) { }

  public findFront(): Observable<Show[]> {
    return this.backend.find('/shows', {
      query: {
        limitToLast: 10,
        orderByChild: 'sortKey'
      }}).map(each => this.map(each));
  }

  public findAll(): Observable<Show[]> {
    return this.backend.find('/shows', {
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

    show.user = this.session.currentUser().uid;
    show.sortKey = 0 - Date.now(); // AF can not sort descending, so use this workaround

    return this.backend.add(show);
  }

  public delete(show: Show): Observable<Show> {

    if (!(show.user === this.session.currentUser().uid)) {
      return Observable.of(null);
    }

    return this.backend.delete(show);
  }


}
