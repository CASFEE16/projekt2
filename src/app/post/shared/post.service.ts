import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "./post.model";
import {BackendService} from "../../core/firebase/backend.service";
import {FirebaseListObservable} from "angularfire2";

@Injectable()
export class PostService {

  constructor(private backend: BackendService) { }

  public findFront(): FirebaseListObservable<Post[]> {
    return this.backend.list('/posts', {
      query: {
        limitToLast: 10,
        orderByKey: true
      }});
  }

}
