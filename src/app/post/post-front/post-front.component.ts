import { Component, OnInit } from '@angular/core';
import {PostListService} from '../shared/post-list.service';
import {Observable} from 'rxjs/Observable';
import {Post, PostTypes, PostType, ContentDetector} from '../shared/post.model';
import {MdSnackBar, MdSnackBarConfig, MdDialog} from '@angular/material';
import {ShowListService} from '../../show/shared/show-list.service';
import {Show} from '../../show/shared/show.model';
import {SessionService} from '../../core/firebase/session.service';
import {Router} from '@angular/router';
import {PostShowListEntry} from '../shared/post-show.model';
import {DialogService} from '../../shared/dialog.service';

@Component({
  selector: 'app-post-front',
  templateUrl: './post-front.component.html',
  styleUrls: ['./post-front.component.css'],
  providers: [PostListService, ShowListService]
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
    private postService: PostListService,
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

    this.showService.findAll()
      .subscribe(result => {
        this.shows = Observable.of(result);
      });

    this.posts = this.postService.findLast()
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

  onTextChanged(event: string) {
    if (this.loading) {
      return;
    }
    this.post.type = this.contentDetector.getType(event);
  }

}
