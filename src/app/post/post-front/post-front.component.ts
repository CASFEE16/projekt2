import { Component, OnInit } from '@angular/core';
import {PostService, PostShowListEntry} from "../shared/post.service";
import {Observable} from "rxjs";
import {Post, PostTypes, PostType, ContentDetector} from "../shared/post.model";
import {FirebaseListObservable} from "angularfire2";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {BackendService} from "../../core/firebase/backend.service";
import {ShowService} from "../../show/shared/show.service";
import {Show} from "../../show/shared/show.model";
import {SessionService} from "../../core/firebase/session.service";
import {YoutubeService} from "../../core/youtube/youtube.service";
import {YoutubeUtils} from "../../core/youtube/YoutubeUtils";
import {Router} from "@angular/router";
import {SpotifyUtils} from "../../core/spotify/SpotifyUtils";

@Component({
  selector: 'app-post-front',
  templateUrl: './post-front.component.html',
  styleUrls: ['./post-front.component.css'],
  providers: [PostService, ShowService]
})
export class PostFrontComponent implements OnInit {

  post: Post = null;
  posts: Observable<PostShowListEntry[]> = null;
  shows: Observable<Show[]> = null;
  loading: boolean = true;
  typeList: any[];
  loggedIn: boolean = false;
  contentDetector: ContentDetector = new ContentDetector();
  snackbarConfig: MdSnackBarConfig = new MdSnackBarConfig();

  constructor(
    private postService: PostService,
    private showService: ShowService,
    private sessionService: SessionService,
    private router: Router,
    private snackbar: MdSnackBar) { }

  ngOnInit() {
    this.post = new Post();
    this.post.type = PostType.Note;
    this.typeList = PostTypes.list();

    this.snackbarConfig.duration = 5000;

    this.loggedIn = this.sessionService.isLoggedIn();

    this.showService.findUpcoming()
      .subscribe(result => {
        this.shows = Observable.of(result);
      });

    this.posts = this.postService.findFront()
      .do(each => this.loading = false);

  }

  onSubmit() {
    if (this.loading) return;
    this.postService.add(this.post).subscribe(
      result => {
        this.snackbar.open('Post added', null, this.snackbarConfig);
        this.post = new Post();
      },
      error => this.snackbar.open(error.message, null, this.snackbarConfig)
    );
  }

  onDelete(deletePost: Post) {
    if (this.loading) return;
    this.postService.delete(deletePost).subscribe(
        result => this.snackbar.open('Post deleted', null, this.snackbarConfig),
        error => this.snackbar.open(error.message, null, this.snackbarConfig)
      );
  }

  onEdit(editPost: Post) {
    if (this.loading) return;
    this.router.navigate(['/post', editPost['$key']]);
  }

  onSelectShow(post: Post, show: Show) {
    if (this.loading) return;
    this.postService.setShow(post, show).subscribe(
      result => this.snackbar.open('Post updated', null, this.snackbarConfig),
      error => this.snackbar.open(error.message, null, this.snackbarConfig)
    );
  }

  onTextChanged(event: string) {
    if (this.loading) return;
    this.post.type = this.contentDetector.getType(event);
  }

  onRatingClick(post: Post, rating: number) {
    if (this.loading) return;
    this.postService.setRating(post, rating).subscribe(
      result => this.snackbar.open('Rating updated', null, this.snackbarConfig),
      error => this.snackbar.open(error.message, null, this.snackbarConfig)
    );
  }

  onRemoveFromShows(post: Post) {
    if (this.loading) return;
    this.postService.setShow(post, null).subscribe(
      result => this.snackbar.open('Removed from show', null, this.snackbarConfig),
      error => this.snackbar.open(error.message, null, this.snackbarConfig)
    );
  }

  youtubeURL(post: Post) {
    let url = YoutubeUtils.getEmbedUrl(YoutubeUtils.getId(post.text));
    if (url) {
      return url;
    }
    url = YoutubeUtils.getEmbedUrl(YoutubeUtils.getId(post.content));
    return url;
  }

  spotifyURL(post: Post) {
    let url = SpotifyUtils.getEmbedUrl(SpotifyUtils.getId(post.content));
    if (url) {
      url = url + '&theme=white&view=coverart';
    }
    return url;
  }

  webURL(post: Post) {
    if (post.type == PostType.Web) {
      return post.text;
    }
    return null;
  }

  getIcon(obj: Post) {
    return PostTypes.icon(obj.type);
  }

}
