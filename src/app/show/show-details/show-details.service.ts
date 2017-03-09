import { Injectable } from '@angular/core';
import {BackendService} from "../../core/firebase/backend.service";
import {SessionService} from "../../core/firebase/session.service";
import {Observable} from "rxjs";
import {ObjectCache} from "../../core/firebase/ObjectCache";
import {SHOWS_RESOURCE_PATH, Show} from "../shared/show.model";
import {Post, POSTS_RESOURCE_PATH} from "../../post/shared/post.model";


@Injectable()
export class ShowDetailsService {

  private object: ObjectCache<Show> = null;

  constructor(private backend: BackendService, private session: SessionService) {
    this.object = new ObjectCache<Show>(backend.database());
  }

  public get(id: string): Observable<Show> {
    return this.object.getId(SHOWS_RESOURCE_PATH, id)
      .map(obj => Object.assign(new Show(), obj));
  }

  public delete(show: Show): Observable<Show> {
    if (!(show.user === this.session.currentUser().uid)) {
      return Observable.of(null);
    }
    return this.object.delete();
  }

  public save(changes: any): Observable<Show> {
    return this.object.update(changes);
  }

  public removePost(post: Post): Observable<Post> {
    let obj: ObjectCache<Post> = new ObjectCache<Post>(this.backend.database());
    return obj.getId(POSTS_RESOURCE_PATH, post['$key']).flatMap(
      result => obj.update({show: {key: null, index: null}})
    );
  }

  // TODO: Find out how to do multiple or batch updates within one observable
  public updatePosts(posts: Post[]): void {

    let idx = 0;
    posts.forEach(each => each.show.index = idx++);

    let obj: ObjectCache<Post> = new ObjectCache<Post>(this.backend.database());
    posts.forEach(each => {
      console.log(each.show);
      obj.getId(POSTS_RESOURCE_PATH, each['$key']).subscribe(
        result => {
          obj.update({show: each.show}).subscribe(
            result => {},
            error => console.log(error)
          );
        },
         error => console.log(error)
      );
    });
  }

}
