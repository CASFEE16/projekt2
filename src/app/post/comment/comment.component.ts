import { Component, OnInit, Input } from '@angular/core';
import {CommentService} from '../shared/comment.service';
import {Observable} from 'rxjs/Observable';
import {Post, Comment} from '../shared/post.model';
import {MdSnackBar} from '@angular/material';
import {SessionService} from '../../core/firebase/session.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers: [CommentService]
})
export class CommentComponent implements OnInit {

  @Input() post: Post;
  comment: Comment = null;
  comments: Observable<Comment[]> = null;
  isLoggedIn: Observable<boolean> = null;

  constructor(
    private session: SessionService,
    private commentService: CommentService,
    private snackbar: MdSnackBar) { }

  ngOnInit() {
    this.isLoggedIn = this.session.watchLoggedIn();
    if (this.post) {
      this.comment = new Comment(this.post, '');
      this.comments = this.commentService.findForPost(this.post);
    } else {
      this.comment = new Comment(null, '');
      this.comments = null;
    }
  }

  onSubmit(event: any) {
    event.preventDefault();
    this.commentService
      .add(this.comment)
      .subscribe((comment) => this.comment = new Comment(this.post, ''));
  }

  onDelete(comment: Comment) {
    this.commentService
      .delete(comment)
      .subscribe(
        (result) => this.snackbar.open('Comment deleted', null, {duration: 2000}),
        (error) => this.snackbar.open(error.message, null, {duration: 2000})
      );
  }

}
