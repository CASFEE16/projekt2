import {Component, OnInit, Input} from '@angular/core';
import {Post} from '../shared/post.model';
import {Observable} from 'rxjs/Observable';
import {MdSnackBarConfig, MdSnackBar, MdDialog} from '@angular/material';
import {PostListService} from '../shared/post-list.service';
import {SessionService} from '../../core/firebase/session.service';
import {Show} from '../../show/shared/show.model';
import {PostShowListEntry} from '../shared/post-show.model';
import {PostUtils} from '../shared/post-utils.service';
import {DialogService} from "../../shared/dialog.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: []
})
export class PostComponent implements OnInit {

  @Input() each: PostShowListEntry = null;
  @Input() shows: Observable<Show[]> = null;
  loggedIn: Observable<boolean> = null;
  snackbarConfig: MdSnackBarConfig = new MdSnackBarConfig();

  postContentType = 'text';
  postContent = '';

  constructor(
    public postUtils: PostUtils,
    private postService: PostListService,
    private sessionService: SessionService,
    private dialogService: DialogService,
    private snackbar: MdSnackBar) { }

  ngOnInit() {
    this.snackbarConfig.duration = 2000;
    this.loggedIn = this.sessionService.watchLoggedIn();
    if (!this.each.post.show) {
      this.each.post.show = {key: null, index: null};
    }

    this.postContentType = 'youtube';
    this.postContent = this.postUtils.youtubeURL(this.each.post);
    if (!this.postContent) {
      this.postContentType = 'spotify';
      this.postContent = this.postUtils.spotifyURL(this.each.post);
      if (!this.postContent) {
        this.postContentType = 'web';
        this.postContent = this.postUtils.webURL(this.each.post);
        if (!this.postContent) {
          this.postContentType = 'text';
          this.postContent = this.each.post.content;
        }
      }
    }
  }

  onDelete(deletePost: Post) {
    const dialogRef = this.dialogService.confirmDelete(deletePost.text).subscribe(dialogResult => {
      if (dialogResult) {
        this.postService.delete(deletePost).subscribe(
          result => this.snackbar.open('Post deleted', null, this.snackbarConfig),
          error => this.snackbar.open(error.message, null, this.snackbarConfig)
        );
      }
    });
  }

  onEdit(editPost: Post) {
    // this.router.navigate(['/post', editPost['$key']]);
  }

  onSelectShow(post: Post, showKey: string) {
    console.log(this.postService);
    this.postService.setShow(post, showKey).subscribe(
      result => {
        console.log('PostService.onSelectShow', result);
        this.snackbar.open('Post updated', null, this.snackbarConfig)
        },
        error => this.snackbar.open(error.message, null, this.snackbarConfig)
    );
  }

  onRatingClick(post: Post, rating: number) {
    this.postService.setRating(post, rating).subscribe(
      result => this.snackbar.open('Rating updated', null, this.snackbarConfig),
      error => this.snackbar.open(error.message, null, this.snackbarConfig)
    );
  }

  onRemoveFromShows(post: Post) {
    this.postService.setShow(post, null).subscribe(
      result => this.snackbar.open('Removed from show', null, this.snackbarConfig),
      error => this.snackbar.open(error.message, null, this.snackbarConfig)
    );
  }

}
