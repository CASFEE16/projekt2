import {Component, OnInit, OnDestroy} from '@angular/core';
import {Show} from "../shared/show.model";
import {ShowDetailsService} from "../show-details/show-details.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MdSnackBar} from "@angular/material";
import {Post} from "../../post/shared/post.model";
import {Observable} from "rxjs";
import {ShowPostsService} from "../shared/show-posts.service";

@Component({
  selector: 'app-show-air',
  templateUrl: './show-air.component.html',
  styleUrls: ['./show-air.component.css'],
  providers: [ShowDetailsService, ShowPostsService]
})
export class ShowAirComponent implements OnInit {


  show: Show = null;
  posts: Observable<Post[]> = null;
  onAir: boolean = false;
  currentDateTime: Date = new Date();
  routeSubscription = null;
  state = 'play_circle_outline';
  fullscreen = false;
  screenAction = 'fullscreen';

  constructor(
    private showDetailsService: ShowDetailsService,
    private showPostsService: ShowPostsService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MdSnackBar) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.showDetailsService.get(params['id']).subscribe(show => {
        this.show = show;
        this.posts = this.showPostsService.findPostsForShow(show);
      });
    });
    setInterval(() => {
      this.currentDateTime =  new Date();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  public toggleState(event: Event) {
    event.preventDefault();
    if (this.onAir) {
      this.onAir = false;
      this.state = 'play_circle_outline';
    } else {
      this.onAir = true;
      this.state = 'pause_circle_outline';
    }
  }

  public toggleMode(event: Event) {
    event.preventDefault();
    if (this.fullscreen) {
      this.fullscreen = false;
      this.screenAction = 'fullscreen';
    } else {
      this.fullscreen = true;
      this.screenAction = 'fullscreen_exit';
    }
  }

}
