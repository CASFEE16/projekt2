import {Component, OnInit, Input} from '@angular/core';
import {Post, PostType, PostTypes} from "../shared/post.model";
import {Observable} from "rxjs";
import {MdSnackBarConfig, MdSnackBar} from "@angular/material";
import {PostService} from "../shared/post.service";
import {SessionService} from "../../core/firebase/session.service";
import {YoutubeUtils} from "../../core/youtube/YoutubeUtils";
import {SpotifyUtils} from "../../core/spotify/SpotifyUtils";
import {Show} from '../../show/shared/show.model';

@Component({
  selector: 'app-post-air',
  templateUrl: 'post-air.component.html',
  styleUrls: ['post-air.component.css']
})
export class PostAirComponent implements OnInit {

  @Input() post: any = null;
  loggedIn: Observable<boolean> = null;
  snackbarConfig: MdSnackBarConfig = new MdSnackBarConfig();
  done: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onClear() {
    console.log('Done');
    this.done = true;
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
