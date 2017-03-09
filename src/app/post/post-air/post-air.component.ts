import {Component, OnInit, Input} from '@angular/core';
import {Post, PostType, PostTypes} from "../shared/post.model";
import {Observable} from "rxjs";
import {MdSnackBarConfig, MdSnackBar} from "@angular/material";
import {PostService} from "../shared/post.service";
import {SessionService} from "../../core/firebase/session.service";
import {YoutubeUtils} from "../../core/youtube/YoutubeUtils";
import {SpotifyUtils} from "../../core/spotify/SpotifyUtils";
import {Show} from '../../show/shared/show.model';
import {PostUtils} from "../shared/post-utils.service";

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

  constructor(private postUtils: PostUtils) { }

  ngOnInit() {
  }

  onClear() {
    console.log('Done');
    this.done = true;
  }

}
