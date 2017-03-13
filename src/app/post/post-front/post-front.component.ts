import { Component, OnInit } from '@angular/core';
import {PostService} from '../shared/post.service';
import {Observable} from 'rxjs/Observable';
import {Post, PostTypes, PostType, ContentDetector} from '../shared/post.model';
import {MdSnackBar, MdSnackBarConfig, MdDialog} from '@angular/material';
import {ShowListService} from '../../show/shared/show-list.service';
import {Show} from '../../show/shared/show.model';
import {SessionService} from '../../core/firebase/session.service';
import {Router} from '@angular/router';
import {PostShowListEntry} from '../shared/post-show.model';
import {SubmitDialogComponent} from "../../shared/submit-dialog/submit-dialog.component";
import {DialogService} from "../../shared/dialog.service";

@Component({
  selector: 'app-post-front',
  templateUrl: './post-front.component.html',
  styleUrls: ['./post-front.component.css'],
  providers: [PostService, ShowListService]
})
export class PostFrontComponent implements OnInit {

  post: Post = null;
  posts: Observable<PostShowListEntry[]> = null;
  shows: Observable<Show[]> = null;
  loading = true;
  typeList: any[];
  loggedIn: Observable<boolean> = null;
  contentDetector: ContentDetector = new ContentDetector();
  snackbarConfig: MdSnackBarConfig = new MdSnackBarConfig();

  constructor(
    private postService: PostService,
    private showService: ShowListService,
    private sessionService: SessionService,
    private router: Router,
    private dialogService: DialogService,
    private snackbar: MdSnackBar) { }

  ngOnInit() {
    this.post = new Post();
    this.post.type = PostType.Note;
    this.typeList = PostTypes.list();
    this.snackbarConfig.duration = 5000;
    this.loggedIn = this.sessionService.watchLoggedIn();

    this.showService.findUpcoming()
      .subscribe(result => {
        this.shows = Observable.of(result);
      });

    this.posts = this.postService.findFront()
      .do(each => this.loading = false);

  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.loading) {
      return;
    }
    this.postService.add(this.post).subscribe(
      result => {
        this.snackbar.open('Post added', null, this.snackbarConfig);
        this.post = new Post();
      },
      error => this.snackbar.open(error.message, null, this.snackbarConfig)
    );
  }

  onDelete(deletePost: Post) {
    if (this.loading) {
      return;
    }
    const dialogRef = this.dialogService.confirmDelete(deletePost.text).subscribe(dialogResult => {
      if (dialogResult) {
        this.postService.delete(deletePost).subscribe(
          result => this.snackbar.open('Post deleted', null, this.snackbarConfig),
          error => this.snackbar.open(error.message, null, this.snackbarConfig)
        );
      }});
  }

  onEdit(editPost: Post) {
    if (this.loading) {
      return;
    }
    this.router.navigate(['/post', editPost['$key']]);
  }

  onSelectShow(post: Post, showKey: string) {
    if (this.loading) {
      return;
    }
    this.postService.setShow(post, showKey).subscribe(
      result => this.snackbar.open('Post updated', null, this.snackbarConfig),
      error => this.snackbar.open(error.message, null, this.snackbarConfig)
    );
  }

  onTextChanged(event: string) {
    if (this.loading) {
      return;
    }
    this.post.type = this.contentDetector.getType(event);
  }

  onRatingClick(post: Post, rating: number) {
    if (this.loading) {
      return;
    }
    this.postService.setRating(post, rating).subscribe(
      result => this.snackbar.open('Rating updated', null, this.snackbarConfig),
      error => this.snackbar.open(error.message, null, this.snackbarConfig)
    );
  }

  onRemoveFromShows(post: Post) {
    if (this.loading) {
      return;
    }
    this.postService.setShow(post, null).subscribe(
      result => this.snackbar.open('Removed from show', null, this.snackbarConfig),
      error => this.snackbar.open(error.message, null, this.snackbarConfig)
    );
  }

}
