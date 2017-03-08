import {Component, OnInit, Input} from '@angular/core';
import {Post, PostType, PostTypes} from "../shared/post.model";
import {Observable} from "rxjs";
import {MdSnackBarConfig, MdSnackBar} from "@angular/material";
import {PostService} from "../shared/post.service";
import {SessionService} from "../../core/firebase/session.service";
import {YoutubeUtils} from "../../core/youtube/YoutubeUtils";
import {SpotifyUtils} from "../../core/spotify/SpotifyUtils";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() each: any = null;
  loggedIn: Observable<boolean> = null;
  snackbarConfig: MdSnackBarConfig = new MdSnackBarConfig();

  constructor(
    private postService: PostService,
    private sessionService: SessionService,
    private snackbar: MdSnackBar) { }

  ngOnInit() {
    this.snackbarConfig.duration = 5000;
    this.loggedIn = this.sessionService.watchLoggedIn();
  }

  onDelete(deletePost: Post) {
    this.postService.delete(deletePost).subscribe(
      result => this.snackbar.open('Post deleted', null, this.snackbarConfig),
      error => this.snackbar.open(error.message, null, this.snackbarConfig)
    );
  }

  onEdit(editPost: Post) {
    // this.router.navigate(['/post', editPost['$key']]);
  }

  onSelectShow(post: Post, showKey: string) {
    this.postService.setShow(post, showKey).subscribe(
      result => this.snackbar.open('Post updated', null, this.snackbarConfig),
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
