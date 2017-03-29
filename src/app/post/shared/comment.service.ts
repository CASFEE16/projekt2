import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Comment, COMMENTS_RESOURCE_PATH, Post} from './post.model';
import {BackendService} from '../../core/firebase/backend.service';
import {SessionService} from '../../core/firebase/session.service';
import {DateUtils} from '../../shared/DateUtils';
import {ListRef} from '../../core/firebase/ListRef';
import {ContentService} from '../../core/content/content.service';
import {TraceService} from '../../core/trace/trace.service';
import {ModelFactory} from '../../core/firebase/model';
import {UserService} from '../../user/shared/user.service';

@Injectable()
export class CommentService {

  private listCache: ListRef<Comment> = null;

  constructor(
    private trace: TraceService,
    private backend: BackendService,
    private session: SessionService) {

    this.listCache = new ListRef<Comment>(this.backend, COMMENTS_RESOURCE_PATH);
  }

  public findForPost(post: Post): Observable<Comment[]> {
    return this.listCache.find({
      query: {
        limitToLast: 10,
        orderByChild: 'post_key',
        equalTo: post['$key']
      }}).map(comments => {
        return (comments.map(comment => {
            return ModelFactory.toClass(Comment, comment);
          }
        )).sort((a, b) => a.sortKey < b.sortKey);
      }
    );
  }

  public add(comment: Comment): Observable<Comment> {
    this.trace.log('CommentService', 'add', comment);
    if (!comment.user) {
      comment.user = this.session.currentUser().uid;
      comment.username = this.session.username;
    }
    if (!comment.ts) {
      comment.ts = Date.now();
    }
    if (!comment.date) {
      comment.date = DateUtils.todayISOString();
    }

    comment.sortKey = 0 - Date.now();

    return this.listCache.add(comment);
  }

  public delete(comment: Comment): Observable<Comment> {
    this.trace.log('CommentService', 'delete', comment);
    if (!(comment.user === this.session.currentUser().uid)) {
      return Observable.throw(new Error('Can not delete'));
    }
    return this.listCache.delete(comment);
  }

}
