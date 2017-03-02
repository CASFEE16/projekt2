import { Component, OnInit } from '@angular/core';
import {PostService, PostShowListEntry} from "../shared/post.service";
import {Observable} from "rxjs";
import {Post, PostTypes, PostType, ContentDetector} from "../shared/post.model";
import {FirebaseListObservable} from "angularfire2";
import {MdSnackBar} from "@angular/material";
import {BackendService} from "../../core/firebase/backend.service";
import {ShowService} from "../../show/shared/show.service";
import {Show} from "../../show/shared/show.model";
import {SessionService} from "../../core/firebase/session.service";
import {YoutubeService} from "../../core/youtube/youtube.service";
import {YoutubeUtils} from "../../core/youtube/YoutubeUtils";
import {Router} from "@angular/router";

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

    this.loggedIn = this.sessionService.isLoggedIn();

    this.showService.findUpcoming()
      .subscribe(result => {
        this.shows = Observable.of(result);
      });

    this.posts = this.postService.findFront()
      .do(each => this.loading = false);

  }

  onSubmit() {
    this.postService.add(this.post).subscribe(
      result => {this.post = new Post();},
      error => this.snackbar.open(error.message)
    );
  }

  onDelete(deletePost: Post) {
    this.postService.delete(deletePost).subscribe(
        result => console.log(result),
        error => this.snackbar.open(error.message)
      );
  }

  onEdit(editPost: Post) {
    this.router.navigate(['/post', editPost['$key']]);
  }

  onSelectShow(post: Post, show: Show) {
    this.postService.setShow(post, show).subscribe(
      result => console.log(result),
      error => this.snackbar.open(error.message)
    );
  }

  onTextChanged(event: string) {
    if (ContentDetector.isMovie(event)) {
      this.post.type = PostType.Movie;
      return;
    }
    if (ContentDetector.isWeb(event)) {
      this.post.type = PostType.Web;
      return;
    }
    this.post.type = PostType.Note;
  }

  onRatingClick(post: Post, rating: number) {
    this.postService.setRating(post, rating).subscribe(
      result => console.log(result),
      error => this.snackbar.open(error.message)
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

  getIcon(obj: Post) {
    return PostTypes.icon(obj.type);
  }

}
