import {Component, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MdSnackBarConfig} from '@angular/material';
import {PostUtils} from '../shared/post-utils.service';
import {CommentService} from '../shared/comment.service';
import {Comment} from '../shared/post.model';

@Component({
  selector: 'app-post-air',
  templateUrl: 'post-air.component.html',
  styleUrls: ['post-air.component.css'],
  providers: [CommentService]
})
export class PostAirComponent implements OnInit {

  @Input() post: any = null;
  loggedIn: Observable<boolean> = null;
  done = false;
  action = 'check';
  comments: Comment[] = null;

  constructor(public postUtils: PostUtils, private commentService: CommentService) { }

  ngOnInit() {
    if (this.post) {
      this.commentService
        .findForPost(this.post)
        .first()
        .subscribe((result) => this.comments = result);
    }
  }

  onClear() {
    if (this.done) {
      this.done = false;
      this.action = 'check';
    } else {
      this.done = true;
      this.action = 'expand_more';
    }
  }

}
