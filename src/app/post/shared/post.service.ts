import { Injectable } from '@angular/core';
import {Observable, Observer} from "rxjs";
import {Post} from "./post.model";
import {BackendService} from "../../core/firebase/backend.service";
import {FirebaseListObservable} from "angularfire2";
import {SessionService} from "../../core/firebase/session.service";

@Injectable()
export class PostService {

  posts: FirebaseListObservable<Post[]> = null;

  constructor(private backend: BackendService, private session: SessionService) { }

  public findFront(): FirebaseListObservable<Post[]> {
    this.posts = this.backend.list('/posts', {
      query: {
        limitToLast: 10,
        orderByChild: 'sortKey'
      }});
    return this.posts;
  }

  public add(post: Post): Observable<Post> {

    post.user = this.session.currentUser().uid;
    // post.ts = this.session.serverTimestamp();
    post.dt = new Date().toISOString();

    // Can not sort descending, so use this workaround
    post.sortKey = 0 - Date.now();

    let obs: FirebaseListObservable<Post[]> = <FirebaseListObservable<Post[]>>this.posts;
    return Observable.create((observer: Observer<Post>) => {
      return obs.push(post)
        .catch(error => observer.error(error))
        .then(result => {observer.next(result); observer.complete()});
    })
  }

  public delete(post: Post): Observable<Post> {

    if (!(post.user === this.session.currentUser().uid)) {
      return Observable.of(null);
    }

    let obs: FirebaseListObservable<Post[]> = <FirebaseListObservable<Post[]>>this.posts;
    return Observable.create((observer: Observer<Post>) => {
      return obs.remove(post['$key'])
        .catch(error => observer.error(error))
        .then(result => {observer.next(result); observer.complete()});
    })
  }

}
