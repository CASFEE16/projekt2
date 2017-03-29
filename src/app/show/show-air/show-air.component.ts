import {Component, OnInit, OnDestroy} from '@angular/core';
import {Show} from '../shared/show.model';
import {ShowDetailsService} from '../show-details/show-details.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import {Post} from '../../post/shared/post.model';
import {Observable} from 'rxjs/Observable';
import {ShowPostsService} from '../shared/show-posts.service';

@Component({
  selector: 'app-show-air',
  templateUrl: './show-air.component.html',
  styleUrls: ['./show-air.component.css'],
  providers: [ShowDetailsService, ShowPostsService]
})
export class ShowAirComponent implements OnInit, OnDestroy {

  show: Show = null;
  posts: Observable<Post[]> = null;
  onAir = false;
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
      if (params['id']) {
        this.showDetailsService.get(params['id']).first().subscribe(show => {
          this.show = show;
          this.setOnAir(!!show.air);
          this.posts = this.showPostsService.findPostsForShow(show).first();
        });
      }
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
    this.setOnAir(!this.onAir);
    if (this.onAir) {
      this.showDetailsService.save({air: true}).subscribe();
    } else {
      this.showDetailsService.save({air: false}).subscribe();
    }
  }

  setOnAir(val: boolean) {
    console.log('ONAIR', val);
    if (val) {
      this.onAir = true;
      this.state = 'pause_circle_outline';
    } else {
      this.onAir = false;
      this.state = 'play_circle_outline';
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
